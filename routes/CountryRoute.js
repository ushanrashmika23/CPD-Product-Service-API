const express=require('express');
const CategoryController=require('../controller/CountryController');
const {models} = require("mongoose");

const router=express.Router();

router.post('/create-country',CategoryController.createCountry);
router.put('/update-country/:id',CategoryController.updateCountry);
router.delete('/delete-country/:id',CategoryController.deleteCountry);
router.get('/find-country/:id',CategoryController.findByIdCountry);
router.get('/all-country',CategoryController.findAllCountry);

module.exports=router;