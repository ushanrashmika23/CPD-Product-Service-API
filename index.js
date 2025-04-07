const express=require('express');
const mongoose=require('mongoose');
require('dotenv').config();
const bodyParser=require('body-parser'); //to access the body of the request otherwise it will be undefined

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const serverPort=process.env.SERVER_PORT || 3000;

//========================================================================
const CategoryRoute=require('./routes/CategoryRoute')
const CountryRoute=require('./routes/CountryRoute')
const DiscountRoute=require('./routes/DiscountRoute')
const CartRoute=require('./routes/CartRout')
const BookmarkRoute=require('./routes/BookmarkRoute')
//========================================================================
try{
    mongoose.connect(`${process.env.DATABASE_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
    app.listen(serverPort,()=>{
        console.log('### Server up & running on port 3000 ###');
    })
}catch (e) {
    console.log(e);
}


//-----------------------------------------------------------------------
app.get('/',(request,response)=>{
    return response.json({
        success: true,
        message: 'api is working'
    })
});

app.use('/api/v1/categories',CategoryRoute);
app.use('/api/v1/countries',CountryRoute);
app.use('/api/v1/discounts',DiscountRoute);
app.use('/api/v1/carts',CartRoute);
app.use('/api/v1/bookmarks',BookmarkRoute);