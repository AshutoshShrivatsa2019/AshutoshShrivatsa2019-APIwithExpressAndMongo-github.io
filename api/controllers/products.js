const Product=require("../models/product");
const mongoose = require("mongoose");

exports.productsGetAll=async(req,res,next)=>{
    // res.status(200).json({
    //     message:"Handling GET requests at /api/products"
    // });

    // let productsList=readWriteObj(null,0);
    // productsList.then((response)=>{
    //     res.status(200).json(response);
    // })

    Product.find()
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err=>{console.log(err)
        res.status(404).json({error:err});
    })

    /*let productsList=await readWriteObj(null,0);
        res.status(200).json(productsList);*/


    //res.status(200).json(productsList);
}

exports.productsGetByID=async(req,res,next)=>{
    // res.status(200).json({
    //     message:`Handling GET requests at /api/products where param is ${req.params.id}`
    // })

    /*let productsList=await readWriteObj(null,0);

    let product=productsList.find(p=> p.id===parseInt(req.params.id));
    
    if(!product) //404
    res.status(404).json(
        {
            message:`Product not found at id:${req.params.id}!!!`  
        });
    else
    res.status(200).json(product);*/

    const id=req.params.id;
    Product.findById(id)
    .exec()
    .then(doc=>{
        console.log(doc);
        if(doc)
        res.status(200).json(doc);
        else
        res.status(404).json({
            message:"ID Not Found"
        })
    })
    .catch(err=>{
        console.log(err);
        res.send(404).json({error:err});
    })


    // let product=productsList.find(p=> p.id===parseInt(req.params.id));
    
    // if(!product) //404
    // res.status(404).json(
    //     {
    //         message:`Product not found at id:${req.params.id}!!!`  
    //     });
    // else
    // res.status(200).json(product);
}

exports.productsCreate=(req,res,next)=>{
    // res.status(200).json({
    //     message:"Handling POST requests at /api/products"
    // })

    // if(typeof products == "undefined" || products == null && products.length == null
    // || products.length <= 0)
    // {
    //     products=readWriteObj(null,0);
    // }
    
    /*let prodList={};
    prodList=req.body;
    prodList.id=products.length+1;

    products.push(prodList);*/

    const product=new Product({
       // _id:products.length+1,
       _id:new mongoose.Types.ObjectId(),
        sku:req.body.sku,
        name:req.body.name,
        SOH:req.body.SOH,
        price:req.body.price
    });

    const validate=product.joiValidate(req.body);
    console.log(validate);
    if(validate.error)
    {
        res.status(401).json({message:validate.error.details[0].message});
        return;
    }

    product.save()
    .then(result=>{
        console.log(result)
        res.status(201).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({error:err});
    });
        
    // readWriteObj(products,1);
    // res.status(201).json(prodList);

    /*readWriteObj(products,1)
    .then((response)=>{
        res.status(201).json(prodList);
    })*/

}


exports.productsPutUpdate=(req,res,next)=>{
    // res.status(200).json({
    //     message:`Handling PUT requests at /api/products where param is ${req.params.id}`
    // })
    
    // if(typeof products == "undefined" || products == null && products.length == null
    // || products.length <= 0)
    // {
    //     products=readWriteObj(null,0);
    // }
    /*let product=products.find(p=>p.id===parseInt(req.params.id));

    if(!product) //404
    res.status(404).json(
        {
            message:`Product not found at id:${req.params.id}!!!`  
        });

    let index=products.indexOf(product);
    product=req.body;
    product.id=parseInt(req.params.id);
    products.splice(index,1,product);*/

    // readWriteObj(products,1);
    //  res.status(202).json(product);

     /*readWriteObj(products,1)
     .then((response)=>{
         res.status(201).json(product);
     })*/

     const id=req.params.id;

     let validate=new Product().joiValidate(req.body);
     if(validate.error)
     {
         return res.status(401).json({message:validate.error.details[0].message});
     }

     Product.update({_id:id},req.body)
     .exec()
     .then(result=>{
         res.status(201).json(result);
     })
     .catch(err=>{
         res.status(401).json({error:err});
     })
}


exports.productsPatchUpdate=(req,res,next)=>{
    // res.status(200).json({
    //     message:`Handling PUT requests at /api/products where param is ${req.params.id}`
    // })
    
    // if(typeof products == "undefined" || products == null && products.length == null
    // || products.length <= 0)
    // {
    //     products=readWriteObj(null,0);
    // }

    /*let product=products.find(p=>p.id===parseInt(req.params.id));

    if(!product) //404
    res.status(404).json(
        {
            message:`Product not found at id:${req.params.id}!!!`  
        });

    let index=products.indexOf(product);
    product=req.body;
    product.id=parseInt(req.params.id);
    products.splice(index,1,product);*/

    const id=req.params.id;

    const validate=new Product().joiValidate(req.body);
    console.log(validate);
    if(validate.error)
    {
        res.status(401).json({message:validate.error.details[0].message});
        return;
    }

    
     Product.update({_id:id},{$set : req.body})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(201).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({error:err});
    });

    // readWriteObj(products,1);
    //  res.status(202).json(product);

    /*readWriteObj(products,1)
    .then((response)=>{
        res.status(202).json(product);
    })*/

}

exports.productsDelete=(req,res,next)=>{
    // res.status(200).json({
    //     message:`Handling DELETE requests at /api/products where param is ${req.params.id}`
    // })

    // if(typeof products == "undefined" || products == null && products.length == null
    // || products.length <= 0)
    // {
    //     products=readWriteObj(null,0);
    // }

    /*let product=products.find(p=>p.id===parseInt(req.params.id));
    if(!product) //404
    res.status(404).json(
        {
            message:`Product not found at id:${req.params.id}!!!`  
        });

    let index=products.indexOf(product);
        products.splice(index,1);*/

        const id =req.params.id;
        Product.remove({_id:id})
        .exec()
        .then(result=>{
            console.log(result);
            res.status(203).json(result);
        })
        .catch(err=>{
            console.log(err);
            res.status(404).json({error:err});
        });

        //console.log(products);
//    products=products.filter((p,index)=> index!==products.indexOf(product));
        // readWriteObj(products,1);
        // res.status(203).json(product);

       /* readWriteObj(products,1)
        .then((response)=>{
            res.status(203).json(product);
        })*/
}