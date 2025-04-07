const DiscountSchema = require("../model/DiscountSchema")

const createDiscount = async (request, response) => {
    try {
        const { discountName, persontage, startDate, EndDate, lastUpdate } = request.body;
        if (!discountName || !persontage || !startDate || !EndDate || !lastUpdate) {
            return response.status(400).json({ code: 400, message: "some fields are missing", data: null })
        }

        const discount = new DiscountSchema({
            discountName: discountName,
            persontage: persontage,
            startDate: startDate,
            EndDate: EndDate,
            lastUpdate: lastUpdate
        });

        const saveData = await discount.save()

        return response.status(201).json({ code: 201, message: "discount created successfully", data: saveData });

    } catch (e) {
        response.status(500).json({ code: 500, message: "something went wrong", error: e })
    }
}

const updateDiscount = async (request, response) => {
    try {
        const { discountName, persontage, startDate, EndDate, lastUpdate } = request.body;
        if (!discountName || !persontage || !startDate || !EndDate || !lastUpdate) {
            return response.status(400).json({ code: 400, message: "some fields are missing", data: null })
        }

        const updateData = await DiscountSchema.findOneAndUpdate(
            { '-id': request.params.id },
            {
                $set: {
                    discountName: discountName,
                    persontage: persontage,
                    startDate: startDate,
                    EndDate: EndDate,
                    lastUpdate: lastUpdate
                }
            },
            { new: true }
        );
        return response.status(200).json({ code: 200, message: "discount has been updated", data: updateData })

    } catch (e) {
        return response.status(500).json({ code: 500, message: "something went wrong", error: e })
    }
}
const deleteDiscount = async (request, response) => {

    try {
        if (!request.params.id) {
            return response.status(400).json({ code: 400, message: "some fields are missing", data: null })
        }
        const deleteData = await DiscountSchema.findOneAndDelete({ _id: request.params.id })
        return response.status(200).json({ code: 204, message: "discount has been deleted", data: null })
    } catch (e) {
        return response.status(500).json({ code: 500, message: "something went wrong", error: e })
    }
}
const findByIdDiscount = async (request, response) => {
    try {
        if (!request.params.id) {
            return response.status(400).json({ code: 400, message: "some fields are missing", data: null })
        }
        const data = await DiscountSchema.findById(_id = request.params.id)
        if (data) {
            return response.status(200).json({ code: 200, message: "discount has been found", data: data })
        } else {
            return response.status(404).json({ code: 404, message: "discount not found", data: null })
        }
    } catch (e) {
        return response.status(500).json({ code: 500, message: "something went wrong", error: e })
    }
}
const findAllDiscount = async (request, response) => { 

    try{
        const {searchText,page,size}=request.query;
        const pageIndex=parseInt(page);
        const pageSize=parseInt(size);

        const query={}
        if(searchText){
            query.$text={$search:searchText}
        }

        const skip=(pageIndex-1)*pageSize;
        const discountList=await DiscountSchema.find(query).skip(skip).limit(pageSize);
        const discountListCount=await DiscountSchema.countDocuments(query);
        return response.status(200).json({
            code:200,
            message:"discount list found",
            data:{
                list:discountList,
                dataCount:discountListCount
            }
        });

    }catch(e){
        return response.status(500).json({ code: 500, message: "something went wrong", error: e })
    }

}


module.exports = {
    createDiscount,
    updateDiscount,
    deleteDiscount,
    findByIdDiscount,
    findAllDiscount
}