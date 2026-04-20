require('dotenv').config();
const express = require('express')
const router = require('./router/api');
const { globalErrorHandler } = require('./helper/globalErrorHandler');
const db = require('./config/db.config');
const port = process.env.PORT || 8000
const app = express()
app.use(express.json())
db()



app.use(process.env.API_BASE_PATH, router)

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.use(globalErrorHandler)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})