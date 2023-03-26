const { Router, request, response } = require('express')
const router = Router();
const products = require('../products.json')


router.get('/', (request, response)=>{
    response.json(products)
})

module.exports = router;