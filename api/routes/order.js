const express=require("express");
const router=express.Router();
const checkAuth=require("../middleware/check-auth");

const OrderController=require("../controllers/orders");

router.get("/",OrderController.orders_get_all);

router.get("/:orderID",OrderController.ordersGetByID);

router.post("/",/*checkAuth,*/OrderController.ordersCreate);

router.delete("/:orderID",/*checkAuth,*/OrderController.OrdersDelete);

module.exports=router;