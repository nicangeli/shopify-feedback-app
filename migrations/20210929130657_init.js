exports.up = function (knex) {
    return knex.schema.createTable('shop', (table) => {
        table.increments('id').primary()

        table.string('domain')

        table.string('question')
        table.string('answerA')
        table.string('answerB')
        table.string('answerC')

        table.string('buttonColor')

        table.boolean('enabled')
    })
}

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('shop')
}
