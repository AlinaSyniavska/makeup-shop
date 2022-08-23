const {Product} = require("../../dataBase");
const {ratingEnum} = require("../../constants");

module.exports = {
    findAll: (params = {}) => {
        return Product.find(params);
    },

    findAllWithPagination: async (query = {}) => {
        const {page = 1, perPage = 10, sortOrder, ...otherFilters} = query;
        const skip = (page - 1) * perPage;
        let products;

        console.log(otherFilters);  // search, top, ...

        const queryFilters = _getUserFilterQuery(otherFilters);

        if (sortOrder === ratingEnum.HIGH) {
            products = await Product.find(queryFilters).sort({rating:-1}).skip(skip).limit(perPage);
        } else if (sortOrder === ratingEnum.LOW) {
            products = await Product.find(queryFilters).sort({rating:1}).skip(skip).limit(perPage)
        } else {
            products = await Product.find(queryFilters).skip(skip).limit(perPage);
        }
        const productsCount = await Product.countDocuments(queryFilters);

        return {
            page,
            perPage,
            data: products,
            count: productsCount,
        }
    },

    findOne: (params = {}) => {
        return Product.findOne(params);
    },

    createOne: (product) => {
        return Product.create(product);
    },

    updateOne: (params = {}, productData, options = {new: true}) => {
        return Product.findOneAndUpdate(params, productData, options);
    },

    deleteOne: (params = {}) => {
        return Product.deleteOne(params);
    },
}

function _getUserFilterQuery(filters) {
    const searchObject = {};    // prepared mongo queries

    if (filters.sortOrder) {
        /* Object.assign(searchObject, {
             rating: {$eq: filters.sortOrder}
         })*/
    }


    if (filters.search) {
        Object.assign(searchObject, {
            $or: [
                {name: {$regex: filters.search, $options: 'i'}},
                {email: {$regex: filters.search, $options: 'i'}}
            ]
        })
    }

    if (filters.ageGte) {
        Object.assign(searchObject, {
            age: {$gte: filters.ageGte}
        })
    }

    if (filters.ageLte) {
        Object.assign(searchObject, {
            age: {
                ...searchObject.age || {},
                $lte: filters.ageLte
            }
        })
    }

    console.log(JSON.stringify(searchObject, null, 2));

    return searchObject;
}
