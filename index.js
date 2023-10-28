const express = require("express");
const { FBCoffee, FBImgProduct, FBCart, FBTypeProduct, FBProductShop } = require("./firebaseFun");
const {BigNumber} = require("bignumber.js");
const { processQuery } = require("./function");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send({
    message:'hello'
  });
})

app.get("/menu-category",async (req, res) => { 

    let data=await FBTypeProduct.getAllData()
    data = data.map(item=>{
      return {
        key:item.key,
        name:item.name
      }
    })

     res.send({
        data,
        status:200
    });
})


app.get("/all-coffee",async (req, res) => { 

    const data=await FBCoffee.getAllData()

   const dataProcess=processQuery(data,req.query)
    res.send({
       ...dataProcess,
        status:200
    });
})

app.get("/all-product",async (req, res) => { 
    console.log({req:req.query});
    if(Object.keys(req.query).length>0){
        const arrQuery=Object.entries(req.query).map(([key,value])=>{
            if(key==='largerPrice'){
                return {
                    key:'price',
                    match:'>=',
                    value
                }
            }
            if(key==='smallerPrice'){
                return {
                    key:'price',
                    match:'<=',
                    value
    
                }
            }
            return {
                key,
                match:'in',
                value:value?.split(',')
            }
            
        })
        const data=await FBProductShop.getDataByListQuery(arrQuery)

        const dataProcess=processQuery(data,req.query)
         res.send({
            ...dataProcess,
             status:200
         });
    }else{
        const data=await FBProductShop.getAllData()

        const dataProcess=processQuery(data,req.query)
         res.send({
            ...dataProcess,
             status:200
         });
    }
   
})

app.get("/coffee/list-imgs",async (req, res) => {
    const data=await FBImgProduct.getAllData()
    res.send({
        data,
        status:200
    });
})

app.get("/coffee/list-img/:idProduct",async (req, res) => {
    const data=await FBImgProduct.getDataByQuery('idProduct','==',req.params?.idProduct||'oVS9HTgrvQe1St2nPm4Y')    
    res.send({
        data,
        status:200
    });
})

app.get("/cart/list-img",async (req, res) => {
    const data=await FBCoffee.getAllData()
    res.send({
        data,
        status:200
    });
})

app.post("/cart-user",async (req, res) => {
    console.log({req:req.body});
    console.log({query:req.query});
    const data=await FBCart.getAllData()
    // console.log({data});
    res.send({
        data,
        status:200
    })
})
 

app.listen(process.env.PORT || 3002, () => {
  // app.listen(3002, () => {
  console.log("listening on port", process.env.PORT || 3002);
});
