const ReviewSchema = require('../model/ReviewSchema');
const ReviewController = require('../model/ReviewSchema')

const createReview = async (request, response) => {
    try {

        const { orderId, message, createdDate, userId, displayName, productId, Ratings } = request.body;

        if (!orderId || !message || !createdDate || !userId || !displayName || !productId || !Ratings) {
            return response.status(400).json({ code: 400, message: 'please provide all the required fields...' });
        }

        const review = new ReviewSchema({
            orderId: orderId,
            message: message,
            createdDate: createdDate,
            userId: userId,
            displayName: displayName,
            productId: productId,
            Ratings: Ratings
        });
        const saveData = await review.save()
        return response.status(201).json({ code: 201, message: 'category created successfully...', data: saveData });
    } catch (e) {
        response.status(500).json({ code: 500, message: 'something went wrong...', error: err });
    }
}


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


const updateReview = async (request, response) => {
    try {
        const { orderId, message, createdDate, userId, displayName, productId, Ratings } = request.body;

        if (!orderId || !message || !createdDate || !userId || !displayName || !productId || !Ratings) {
            return response.status(400).json({ code: 400, message: 'some fields are missing!..', data: null });
        }
        const updateData = await ReviewSchema.findOneAndUpdate({ '_id': request.params.id }, {
            $set: {
                orderId: orderId,
                message: message,
                createdDate: createdDate,
                userId: userId,
                displayName: displayName,
                productId: productId,
                Ratings: Ratings
            }
        }, { new: true });
        return response.status(200).json({ code: 200, message: 'customer has been updated...', data: updateData });
    } catch (e) {
        response.status(500).json({ code: 500, message: 'something went wrong...', error: e });
    }
}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


const deleteReview = async (request, response) => {
    try {
        if (!request.params.id) {
            return response.status(400).json({ code: 400, message: 'some fields are missing!..', data: null });
        }
        const deleteData = await ReviewSchema.findOneAndDelete({ _id: request.params.id });
        return response.status(200).json({ code: 204, message: 'customer has been deleted...', data: null });
    } catch (e) {
        response.status(500).json({ code: 500, message: 'something went wrong...', error: e });
    }
}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


const findByIdReview = async (request, response) => {
    try {
        if (!request.params.id) {
            return response.status(400).json({ code: 400, message: 'some fields are missing!..', data: null });
        }
        const data = await ReviewSchema.findById(_id = request.params.id);
        if (data) {
            return response.status(200).json({ code: 200, message: 'customer has been found...', data: data });
        } else {
            return response.status(404).json({ code: 404, message: 'customer not found...', data: null });
        }
    } catch (e) {
        response.status(500).json({ code: 500, message: 'something went wrong...', error: e });
    }
}
const findAllReview= async (request, response) => {
    try {
        const { searchText, page = 1, size = 10 } = request.query;
        const pageIndex = parseInt(page);
        const pageSize = parseInt(size);

        const query = {};
        if (searchText) {
            query.$text = { $search: searchText }
        }
        const skip = (pageIndex - 1) * pageSize;
        const reviewList = await ReviewSchema.find(query)
            .limit(pageSize)
            .skip(skip);
        const reviewListCount = await ReviewSchema.countDocuments(query);
        return response.status(200).json({ code: 200, message: 'category data data...', data: { list: reviewList, dataCount: reviewListCount } });
    } catch (e) {
        response.status(500).json({ code: 500, message: 'something went wrong...', error: e });
    }
}

module.exports = {
    createReview,
    updateReview,
    deleteReview,
    findByIdReview,
    findAllReview
}