import * as userAPI from './user-api';

export async function getUserById(id) {
    try {
        const data = await userAPI.getUserById(id)
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
