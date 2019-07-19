

exports.orders_get_all=(req,res,next)=>{
    res.status(200).json({
        message:"Handling GET request for /api/orders"
    })
}

exports.ordersGetByID=(req,res,next)=>{
    res.status(200).json({
        message:`Handling GET requests for /api/orders where param is ${req.params.orderID}`,
        orderID:req.params.orderID
    })
}

exports.ordersCreate=(req,res,next)=>{
    res.status(201).json({
        message:"Handling GET requests for /api/orders"
    })
}

exports.OrdersDelete=(req,res,next)=>{
    res.status(202).json({
        message:`Handling GET requests for /api/orders where param is ${req.params.orderID}`,
        orderID:req.params.orderID
    })
}