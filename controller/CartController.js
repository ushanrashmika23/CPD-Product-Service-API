const CartSchema=require("../model/CartSchema");

const createCart=async (request,response)=>{
    try{
        const {userId,productId,qty} = request.body;
        if (!userId||!productId||!qty) {
            return response.status(400).json({code:400, message:'some fields are missing!..', data:null});
        }
        const cartData = await CartSchema.create({
            userId:userId,
            productId:productId,
            qty:qty,
            createdDate:new Date()
        });
        return response.status(201).json({code:201, message:'cart has been created...', data:cartData});
    }catch (e) {
        response.status(500).json({code:500, message:'something went wrong...', error:e});
    }
}
const updateCart=async (request,response)=>{
     try{
            const {userId,productId,qty} = request.body;
            if (!userId||!productId||!qty) {
                return response.status(400).json({code:400, message:'some fields are missing!..', data:null});
            }
            const updateData = await CartSchema.findOneAndUpdate({'_id':request.params.id},{
                $set:{
                    userId:userId,
                    productId:productId,
                    qty:qty,
                    createdDate:new Date()
                }
            },{new:true});
            return response.status(200).json({code:200, message:'customer has been updated...', data:updateData});
        }catch (e) {
            response.status(500).json({code:500, message:'something went wrong...', error:e});
        }
}
const deleteCart=async (request,response)=>{
    try {
            if (!request.params.id) {
                return response.status(400).json({code: 400, message: 'some fields are missing!..', data: null});
            }
            const deleteData = await CartSchema.findOneAndDelete({_id : request.params.id});
            return response.status(200).json({code: 204, message: 'customer has been deleted...', data: null});
        } catch (e) {
            response.status(500).json({code: 500, message: 'something went wrong...', error: e});
        }
}
const findByIdCart=async (request,response)=>{
    try{
            if (!request.params.id) {
                return response.status(400).json({code:400, message:'some fields are missing!..', data:null});
            }
            const data=await CartSchema.findById(_id=request.params.id);
            if(data) {
                return response.status(200).json({code: 200, message: 'customer has been found...', data: data});
            }else{
                return response.status(404).json({code: 404, message: 'customer not found...', data: null});
            }
        }catch (e) {
            response.status(500).json({code:500, message:'something went wrong...', error:e});
        }
}
const findAllCart=async (request,response)=>{
    try{
        const {searchText, page=1, size=10}=request.query;
        const pageIndex = parseInt(page);
        const pageSize = parseInt(size);

        const query={};
        if(searchText){
            query.$text={$search:searchText}
        }
        const skip = (pageIndex-1)*pageSize;
        const cartList = await CartSchema.find(query)
            .limit(pageSize)
            .skip(skip);
        const cartListCount = await CartSchema.countDocuments(query);
        return response.status(200).json({code: 200, message: 'category data data...', data:{list: cartList, dataCount:cartListCount}});
    }catch (e) {
        response.status(500).json({code: 500, message: 'something went wrong...', error: e});
    }
}

module.exports={
    createCart,
    updateCart,
    deleteCart,
    findByIdCart,
    findAllCart
}