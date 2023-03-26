const { request, response } = require("express")
const express = require("express")
const app = express()
const PORT = 8000
const carRouter = require('./routers/carRouter')
const sinusRouter = require('./routers/sinusRouter.js')

app.use(express.json())

app.use('/api/productslist', sinusRouter)
app.use('/api/cart', carRouter)


app.listen(PORT, ()=>{
    console.log(`Server on port ${PORT} started`)
})