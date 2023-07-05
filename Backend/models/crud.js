const mongoose = require('mongoose')

const crudSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:  true,
        unique: true
    },
    phone: {
        type: String,
        required:  true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})


const crudModel = mongoose.model('crudModel', crudSchema)

module.exports = crudModel;