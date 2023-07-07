const express = require('express')
const crudModel = require('../models/crud')
const crudRoute = express.Router()
// crudRoute.use(express.json());
const mongoose =require("mongoose")

// ---------------------ADD USER API-----------------------//
crudRoute.post('/crudadd', async(req, res) => {
    const {name, email, phone, password} = req.body
    // let userdata = {
    //     name: req.body.name,
    //     email: req.body.email,
    //     phone: req.body.phone,
    //     password: req.body.password
    //     }
    try {

        const data = new crudModel(req.body)
        await data.save()
        console.log(data)
        return res.status(200).json({   success: true, message: "Data Added Successfully", data})
    } catch (error) {
        console.log(error)
        if (error.keyPattern){
            return res.json({success: false, message: "User Exists Already"})
        }
        return res.status(500).json({success: false, message: 'Internal Server Error', error: error.message })
    }
})


// ---------------------GET USER API-----------------------//
crudRoute.get('/cruddata', async(req, res) => {
    try {
        const data = await crudModel.find()
        return res.status(200).json({success: true, message: "User Data Got Sucecssfully", data})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: error})
    }
})

// ---------------------DELETE USER API-----------------------//
crudRoute.delete('/deleteuser/:id', async(req, res) => {
    const id = new mongoose.Types.ObjectId(req.params);
    // const id = req.params
    // console.log(id);
    // console.log(req.params)

    try {
        const user = await crudModel.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).json({success: false, message: 'User not found', user });
          }
        return res.status(200).json({ success: true, message: 'User Deleted Successfully', user });

    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: error})
    }
})


// ---------------------UPDATE USER API-----------------------//
crudRoute.put('/updateuser', async(req, res) => {
    const userdata = req.body
    const id = req.body._id
    console.log(id);
    // console.log(userdata)
    // console.log(req.body)
    try {
        const data = await crudModel.findByIdAndUpdate(id, userdata, {new: true})
        console.log(data);
        return res.json({ success: true, message: 'User Updated Successfully', userdata });
    } catch (error) {
        console.log(error)
        if(error.codeName === "DuplicateKey"){
            return res.json({success: false, message: "User Already Exists", error: error.message})
        }
        return res.status(500).json({success: false, message: "An error occurred", error: error.message})
    }
})





module.exports = crudRoute;