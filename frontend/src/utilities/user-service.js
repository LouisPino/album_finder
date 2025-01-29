import * as userAPI from './user-api';

export async function getUserByEmail(email) {
    try {
        const data = await userAPI.getUserByEmail(email)
        return data
    } catch (err) {
        return err
    }
}

export async function updateUser(user) {
    try {
        const data = await userAPI.updateUser(user)
        return data
    } catch (err) {
        return err
    }
}
