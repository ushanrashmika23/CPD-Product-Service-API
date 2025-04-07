const CountrySchema = require('../model/CountrySchema')

const createCountry = async (request, response) => {
    try {

        const {countryName, countryCode, flag} = request.body;

        if (!countryName || !countryCode || !flag) {
            return response.status(400).json({code: 400, message: 'please provide all the required fields...'});
        }

        const country = new CountrySchema({
            // client side must send the file resource
            // you must upload the icon into the S3 bucket and then you can get the response body.

            // the client send the ids of all the available countries, and the system must find all the countries for the request and save.

            countryName: request.body.countryName,
            flag: {
                hash: 'Temp Hash',
                resourceUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr1TiZMtNq_El78BMq7-uS7g01qtuiAAVNj6tLspl1bAMw_t9AgZsxNlkrEzXrrYMGcz_S_pKEDq4FU-A_vW875CtAp1DHRfKZAt7xoww',
                fileName: 'Temp File Name',
                directory: 'Temp Directory'
            }, // assume that you have send the image to the s3
            countryCode: request.body.countryCode,
        });
        const saveData = await CountrySchema.save()
        return response.status(201).json({code: 201, message: 'category created successfully...', data: saveData});
    } catch (e) {
        response.status(500).json({code: 500, message: 'something went wrong...', error: err});
    }
}


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


const updateCountry = async (request, response) => {
    try {
        const {countryName, countryCode} = request.body;
        if (!countryName || !countryCode) {
            return response.status(400).json({code: 400, message: 'some fields are missing!..', data: null});
        }
        const updateData = await CountrySchema.findOneAndUpdate({'_id': request.params.id}, {
            $set: {
                countryName: countryName,
                countyCode: countryCode,
            }
        }, {new: true});
        return response.status(200).json({code: 200, message: 'customer has been updated...', data: updateData});
    } catch (e) {
        response.status(500).json({code: 500, message: 'something went wrong...', error: e});
    }
}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


const deleteCountry = async (request, response) => {
    let _id;
    try {
        if (!request.params.id) {
            return response.status(400).json({code: 400, message: 'some fields are missing!..', data: null});
        }
        const deleteData = await CountrySchema.findOneAndDelete(_id = request.params.id);
        return response.status(200).json({code: 204, message: 'customer has been deleted...', data: null});
    } catch (e) {
        response.status(500).json({code: 500, message: 'something went wrong...', error: e});
    }
}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


const findByIdCountry = async (request, response) => {
    try {
        if (!request.params.id) {
            return response.status(400).json({code: 400, message: 'some fields are missing!..', data: null});
        }
        const data = await CountrySchema.findById(_id = request.params.id);
        if (data) {
            return response.status(200).json({code: 200, message: 'customer has been found...', data: data});
        } else {
            return response.status(404).json({code: 404, message: 'customer not found...', data: null});
        }
    } catch (e) {
        response.status(500).json({code: 500, message: 'something went wrong...', error: e});
    }
}
const findAllCountry = async (request, response) => {
    try {
        const {searchText, page = 1, size = 10} = request.query;
        const pageIndex = parseInt(page);
        const pageSize = parseInt(size);

        const query = {};
        if (searchText) {
            query.$text = {$search: searchText}
        }
        const skip = (pageIndex - 1) * pageSize;
        const countryList = await CountrySchema.find(query)
            .limit(pageSize)
            .skip(skip);
        const countryListCount = await CountrySchema.countDocuments(query);
        return response.status(200).json({
            code: 200,
            message: 'category data data...',
            data: {list: countryList, dataCount: countryListCount}
        });
    } catch (e) {
        response.status(500).json({code: 500, message: 'something went wrong...', error: e});
    }
}

module.exports = {
    createCountry,
    updateCountry,
    deleteCountry,
    findByIdCountry,
    findAllCountry
}