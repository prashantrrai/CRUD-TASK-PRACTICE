const express = require('express')
const app = express()

require('dotenv').config();
const PORT = process.env.PORT || 8080;

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:4200' }));

const crudRoute = require('./routes/crud')
app.use(crudRoute)


app.get('/', async(req, res) => {
    res.json({success: true, message: "API is Working"})
})


app.listen(PORT, () => {
    console.log(`Server Connected Successfully on port http://localhost:${PORT}`);
    require('./connection/db')
})