import * as userAPI from './user-api';

export async function getUsers() {
    try {
        const data = await artistAPI.index()
        return data
    } catch (err) {
        return err
    }
}

export async function createUser(userData) {
    try {
        const data = await userApi.create(userData)
        return data
    } catch (err) {
        return err
    }
}