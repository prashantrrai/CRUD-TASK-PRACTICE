const express = require('express')
const app = express()
require('dotenv').config();
const PORT = process.env.PORT || 8080;
require('./connection/db')
const crudRoute = require('./routes/crud')
app.use(crudRoute)
// app.use(express.json())

app.get('/', async(req, res) => {
    res.json({success: true, message: "API is Working"})
})


app.listen(PORT, () => {
    console.log(`Server Connected Successfully on port http://localhost:${PORT}`);
})