const express = require('express')
const crudModel = require('../models/crud')
const crudRoute = express.Router()
crudRoute.use(express.json());

// ---------------------ADD USER API-----------------------//
crudRoute.post('/crudadd', async(req, res) => {
    // const {name, email, phone, password} = req.body
    let userdata = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
        }

    // console.log(userdata)
    try {
        const data = new crudModel(userdata)
        await data.save()
        console.log(data)
        res.status(200).json({   success: true, message: "Data Added Successfully", data})
    } catch (error) {
        console.log(error)
        if (error.keyPattern){
            res.json({success: false, message: "User Exists Already"})
        }
        res.json({success: false, message: error})
    }
})


// ---------------------GET USER API-----------------------//
crudRoute.get('/cruddata', async(req, res) => {
    try {
        const data = await crudModel.find()
        res.status(200).json({success: true, message: "User Data Got Sucecssfully", data})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: error})
    }
})

// ---------------------DELETE USER API-----------------------//
crudRoute.delete('/cruddata/:id', async(req, res) => {
    const id = req.params.id
    // console.log(id)

    try {
        const deletedUser = await crudModel.findByIdAndDelete(id)
        if (!deletedUser) {
            return res.status(404).json({success: false, message: 'User not found' });
          }
        return res.json({ success: true, message: 'User Deleted Successfully' });

    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: error})
    }
})


// ---------------------UPDATE USER API-----------------------//


module.exports = crudRoute;