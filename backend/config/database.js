const mongoose = require('mongoose');
const { DATABASE_URI } = process.env
console.log("YOU HAVE HIT ME")


mongoose.set('strictQuery', true);
mongoose.connect(DATABASE_URI)
    .then(() => console.log("You are connected to mongoose"))
    .catch((error) => console.log("Error connecting to mongoose:", error));


// Connection Events
mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error));
