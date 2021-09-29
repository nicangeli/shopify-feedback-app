exports.up = function (knex) {
    return knex.schema.createTable('shop', (table) => {
        table.increments('id').primary()

        table.string('domain')

        table.string('question')
        table.string('answerLabel1')
        table.string('answerLabel2')
        table.string('answerLabel3')

        table.string('buttonColor')

        table.boolean('enabled')
    })
}

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('shop')
}
