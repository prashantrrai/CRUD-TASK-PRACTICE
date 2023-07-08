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
        return res.status(200).json({   success: true, message: "User Added Successfully", data})
    } catch (error) {
        console.log(error)
        if (error.keyPattern){
            return res.json({success: false, message: "User Exists Already", error: error.message})
        }
        return res.status(500).json({success: false, message: 'Internal Server Error', error: error.message })
    }
})


// ---------------------GET USER API-----------------------//
// crudRoute.get('/cruddata', async(req, res) => {
//     try {
//         const data = await crudModel.find()
//         return res.status(200).json({success: true, message: "User Data Got Sucecssfully", data})
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({success: false, message: error})
//     }
// })

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

// --------------------------------GET USER DATA WITH SEARCH, PAGINATION, SORT-------------------------------//
crudRoute.get('/cruddata', async(req, res) => {

    // const { search, page, limit, sortBy, sortOrder } = req.query;
    // console.log(req.query);
    let page = +req.query.page || 1;
    let limit = +req.query.limit || 5;
    let search = req.query.search;
    let sortBy = req.query.sortBy || "name";
    let sortOrder = req.query.sortOrder || "asc";
    let skip = (page - 1) * limit;
    // console.log("sortBy", sortBy, "sortOrder", sortOrder)

    try {

        let query = {};

        if (search) {
          query = 
          {$or: [
              { name: { $regex: search, $options: "i" } },
              { email: { $regex: search, $options: "i" } },
              { phone: { $regex: search, $options: "i" } },
            ],
          };
        }

        const count = await crudModel.find(query).count()
        let totalPage = Math.ceil(count/limit)

        if(page > totalPage){
            page = totalPage;
            skip = (page-1) * limit;
        }

        let sortCriteria = {}

        if (sortBy === "name") {
          sortCriteria = { name: sortOrder === "asc" ? 1 : -1 };
        } else if (sortBy === "email") {
          sortCriteria = { email: sortOrder === "asc" ? 1 : -1 };
        } else if (sortBy === "phone") {
          sortCriteria = { phone: sortOrder === "asc" ? 1 : -1 };
        } else {
          sortCriteria = { name: sortOrder === "asc" ? 1 : -1 };
        }

        const data = await crudModel
        .find(query)
        .sort(sortCriteria)
        .skip(skip)
        .limit(limit);

        console.log(data);

        return res.status(200).json({success: true, message: "User Data Got Sucecssfully", data, page, limit, totalPage, count})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: error, error: error.message})
    }
})




module.exports = crudRoute;