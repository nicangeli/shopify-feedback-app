import knex from 'knex'
import knexfile from '../knexfile'

const db = knex(knexfile)

export const insertShop = (domain) => {
    return db('shop').insert({ domain })
}

export const getShop = (domain) => {
    return db('shop').where({ domain }).first()
}
