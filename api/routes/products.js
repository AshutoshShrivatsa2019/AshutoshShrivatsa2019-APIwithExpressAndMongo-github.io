const express=require("express");
const readWriteObj=require("../../read-write-obj");
const mongoose = require("mongoose");
const Product=require("../models/product");
const checkAuth=require("../middleware/check-auth");
const router=express.Router();

const ProductsController=require("../controllers/products");

var products=[];
var prod=require("../../startup");
prod.then((response)=>{
    products=response;
})
//var products=[];

console.log(products);

router.get("/",ProductsController.productsGetAll);

router.get("/:id",ProductsController.productsGetByID);

router.post("/"/*,checkAuth*/,ProductsController.productsCreate);

router.put("/:id"/*,checkAuth*/,ProductsController.productsPutUpdate);


router.patch("/:id"/*,checkAuth*/,ProductsController.productsPatchUpdate);

router.delete("/:id"/*,checkAuth*/,ProductsController.productsDelete);


module.exports=router;