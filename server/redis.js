import redis from 'redis'
import { promisify } from 'util'

const client = redis.createClient()

/*
    The storeCallback takes in the Session, and sets a stringified version of it on the redis store
    This callback is used for BOTH saving new Sessions and updating existing Sessions.
    If the session can be stored, return true
    Otherwise, return false
*/

export async function storeCallback(session) {
    try {
        const setAsync = promisify(client.set).bind(client)

        // Inside our try, we use the `setAsync` method to save our session.
        // This method returns a boolean (true if successful, false if not)
        return await setAsync(session.id, JSON.stringify(session))
    } catch (err) {
        // throw errors, and handle them gracefully in your application
        throw new Error(err)
    }
}

/*
    The loadCallback takes in the id, and uses the getAsync method to access the session data
     If a stored session exists, it's parsed and returned
     Otherwise, return undefined
*/
export async function loadCallback(id) {
    try {
        const getAsync = promisify(client.get).bind(client)

        // Inside our try, we use `getAsync` to access the method by id
        // If we receive data back, we parse and return it
        // If not, we return `undefined`
        let reply = await getAsync(id)
        if (reply) {
            return JSON.parse(reply)
        } else {
            return undefined
        }
    } catch (err) {
        throw new Error(err)
    }
}

/*
    The deleteCallback takes in the id, and uses the redis `del` method to delete it from the store
    If the session can be deleted, return true
    Otherwise, return false
  */
export async function deleteCallback(id) {
    try {
        const delAsync = promisify(client.del).bind(client)

        // Inside our try, we use the `delAsync` method to delete our session.
        // This method returns a boolean (true if successful, false if not)
        return await delAsync(id)
    } catch (err) {
        throw new Error(err)
    }
}
