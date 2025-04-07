const express=require('express');
const DiscountController=require('../controller/DiscountController');
const {models} = require("mongoose");

const router=express.Router();

router.post('/create-discount',DiscountController.createDiscount);
router.put('/update-discount/:id',DiscountController.updateDiscount);
router.delete('/delete-discount/:id',DiscountController.deleteDiscount);
router.get('/find-discount/:id',DiscountController.findByIdDiscount);
router.get('/all-discount',DiscountController.findAllDiscount);

module.exports=router;