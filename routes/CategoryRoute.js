const express=require('express');
const CategoryController=require('../controller/CategotyController');
const {models} = require("mongoose");

const router=express.Router();

router.post('/create-category',CategoryController.createCategory);
router.put('/update-category/:id',CategoryController.updateCategory);
router.delete('/delete-category/:id',CategoryController.deleteCategory);
router.get('/find-category/:id',CategoryController.findByIdCategory);
router.get('/all-category',CategoryController.findAllCategory);

module.exports=router;