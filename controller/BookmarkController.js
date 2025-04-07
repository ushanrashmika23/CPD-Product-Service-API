const BookmarkSchema=require('../model/BookmarkSchema')

const createBookmark= async (request,response)=>{
    try{

        const {userId,productId,createdDate}=request.body;

        if(!userId || !productId || !createdDate){
            return response.status(400).json({code:400, message:'please provide all the required fields...'});
        }

        const bookMark = new BookmarkSchema({
            userId:userId,
            productId:productId,
            createdDate:createdDate
        });
        const saveData = await bookMark.save()
        return response.status(201).json({code:201, message:'category created successfully...', data:saveData});
    }catch (e) {
        response.status(500).json({code:500, message:'something went wrong...', error:err});
    }
}


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


const updateBookmark= async (request,response)=>{
    try{
        const {userId,productId,createdDate}=request.body;

        if(!userId || !productId || !createdDate){
            return response.status(400).json({code:400, message:'some fields are missing!..', data:null});
        }
        const updateData = await BookmarkSchema.findOneAndUpdate({'_id':request.params.id},{
            $set:{
                userId:userId,
                productId:productId,
                createdDate:createdDate
            }
        },{new:true});
        return response.status(200).json({code:200, message:'customer has been updated...', data:updateData});
    }catch (e) {
        response.status(500).json({code:500, message:'something went wrong...', error:e});
    }
}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


const deleteBookmark= async (request,response)=>{
    try {
        if (!request.params.id) {
            return response.status(400).json({code: 400, message: 'some fields are missing!..', data: null});
        }
        const deleteData = await BookmarkSchema.findOneAndDelete({_id : request.params.id});
        return response.status(200).json({code: 204, message: 'customer has been deleted...', data: null});
    } catch (e) {
        response.status(500).json({code: 500, message: 'something went wrong...', error: e});
    }
}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


const findByIdBookmark= async (request, response) => {
    try{
        if (!request.params.id) {
            return response.status(400).json({code:400, message:'some fields are missing!..', data:null});
        }
        const data=await BookmarkSchema.findById(_id=request.params.id);
        if(data) {
            return response.status(200).json({code: 200, message: 'customer has been found...', data: data});
        }else{
            return response.status(404).json({code: 404, message: 'customer not found...', data: null});
        }
    }catch (e) {
        response.status(500).json({code:500, message:'something went wrong...', error:e});
    }
}
const findAllBookmark = async (request, response) => {
    try{
        const {searchText, page=1, size=10}=request.query;
        const pageIndex = parseInt(page);
        const pageSize = parseInt(size);

        const query={};
        if(searchText){
            query.$text={$search:searchText}
        }
        const skip = (pageIndex-1)*pageSize;
        const bookamrkList = await BookmarkSchema.find(query)
            .limit(pageSize)
            .skip(skip);
        const bookmarkListCount = await BookmarkSchema.countDocuments(query);
        return response.status(200).json({code: 200, message: 'category data data...', data:{list: bookamrkList, dataCount:bookmarkListCount}});
    }catch (e) {
        response.status(500).json({code: 500, message: 'something went wrong...', error: e});
    }
}

module.exports={
    createBookmark,
    updateBookmark,
    deleteBookmark,
    findByIdBookmark,
    findAllBookmark
}