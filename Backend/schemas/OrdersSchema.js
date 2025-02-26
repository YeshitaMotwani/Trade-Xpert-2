const {Schema}=require("mongoose"); //watchList name in data.js

const OrdersSchema=new Schema({
    name: String,
    qty: Number,
    price: Number,
    mode:String
});

module.exports={OrdersSchema};