import knex from 'knex'
import knexfile from '../knexfile'

const db = knex(knexfile)

export const insertShop = (domain) => {
    const defaultButtonColor = {
        hue: 120,
        brightness: 1,
        saturation: 1,
    }

    return db('shop').insert({
        domain,
        buttonColor: JSON.stringify(defaultButtonColor),
    })
}

export const getShop = async (domain) => {
    const shop = await db('shop').where({ domain }).first()

    return {
        ...shop,
        buttonColor: JSON.parse(shop.buttonColor),
    }
}

export const updateShop = (domain, body) => {
    return db('shop')
        .where({ domain })
        .update({
            question: body.question,
            enabled: body.enabled,
            buttonColor: JSON.stringify(body.buttonColor),
            answerA: body.answerA,
            answerB: body.answerB,
            answerC: body.answerC,
        })
}
