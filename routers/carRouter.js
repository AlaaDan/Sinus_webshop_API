const { Router, request, response } = require('express')
const router = Router();
const products = require('../products.json')
const cartItems = []
const Joi = require('joi')

router.get('/', (request, response)=>{
    response.json(cartItems)
})

router.post('/', (req, res)=>{
    const { error } = itemCheck(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const item = {
        title: req.body.title,
        price: req.body.price,
        shortDesc: req.body.shortDesc,
        category: req.body.category,
        longDesc: req.body.longDesc,
        imgFile: req.body.imgFile,
        serial: req.body.serial
    }
    cartItems.push(item)
    res.send(cartItems)
})

router.delete('/', (req, res)=>{
    const serial = cartItems.find(c => c.serial === req.body);
    if (!serial) return res.status(404).send("The course with the given ID was not found")

    const index = cartItems.indexOf(serial)
    cartItems.splice(index, 1)

    res.send(cartItems)

})

function itemCheck(item){
    const schema = Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required(),
        shortDesc: Joi.string().required(),
        category: Joi.string().required(),
        longDesc: Joi.string().required(),
        imgFile: Joi.string().required(),
        serial: Joi.string().required(),
    })
    return schema.validate(item)
}

module.exports = router;