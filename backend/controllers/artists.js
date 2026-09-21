const { Album } = require("../models");

// Public site, used to build a link back to an artist's page.
const SITE_URL = "https://listentoronto.com";

// Cap per request so one caller can't ask for the whole catalogue in one URL.
const MAX_ARTISTS = 25;

module.exports = {
    index,
    findByArtist,
    findByArtists
};

async function index(req, res) {
    try {
        res.status(200).json(await Album.distinct("artist"));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function findByArtist(req, res) {
    try {
        res.status(200).json(await Album.find({ artist: req.params.artist }).populate('comments'));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * GET /artists/albums?artist=Name+One&artist=Name+Two
 *
 * Bulk lookup for other sites (earlobe.ca). Repeated `artist` params rather
 * than a comma-separated list, since artist names can contain commas.
 * Matching is case-insensitive and whitespace-tolerant; names that match
 * nothing come back in `notFound` instead of being silently dropped.
 */
async function findByArtists(req, res) {
    try {
        // Express gives a string for one ?artist=, an array for several.
        const raw = req.query.artist;
        const names = (Array.isArray(raw) ? raw : raw ? [raw] : [])
            .map(normalize)
            .filter(Boolean);

        if (!names.length) {
            return res.status(400).json({ error: "Pass at least one artist, e.g. ?artist=Name" });
        }

        if (names.length > MAX_ARTISTS) {
            return res.status(400).json({ error: `Too many artists — ${MAX_ARTISTS} per request max.` });
        }

        // artist is [String], so $in against a list of patterns matches an
        // album if any of its artists matches any of the requested names.
        const patterns = names.map(name => new RegExp(`^${escapeRegex(name)}$`, "i"));
        const albums = await Album.find({ artist: { $in: patterns } });

        const results = [];
        const notFound = [];

        names.forEach((name, i) => {
            const pattern = patterns[i];
            const matches = albums.filter(album =>
                album.artist.some(entry => pattern.test(normalize(entry)))
            );

            if (!matches.length) {
                notFound.push(name);
                return;
            }

            // Hand back the spelling this catalogue uses, so the caller can
            // store it and stop guessing at names on later requests.
            const artist = matches[0].artist.find(entry => pattern.test(normalize(entry)));

            results.push({
                query: name,
                artist,
                url: `${SITE_URL}/artists/${encodeURIComponent(artist)}`,
                albums: matches.map(toAlbumJSON)
            });
        });

        res.status(200).json({ results, notFound });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

function normalize(name) {
    return String(name || "").trim().replace(/\s+/g, " ");
}

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function toAlbumJSON(album) {
    return {
        id: album._id,
        title: album.title,
        artist: album.artist,
        release_year: album.release_year,
        image: album.image,
        link: album.link,
        categories: album.categories
    };
}
