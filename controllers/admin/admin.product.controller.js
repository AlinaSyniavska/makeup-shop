const {adminProductService} = require("../../services");

module.exports = {
    getAllProducts: async (req, res, next) => {
        try {
            const paginationResponse = await adminProductService.findAllWithPagination(req.query);

            const {page, perPage, data, count} = paginationResponse;

            res.json({
                page,
                perPage,
                data,
                count,
            });
        } catch (e) {
            next(e);
        }
    },

    createProduct: async (req, res, next) => {
        try {
            const newProduct = await adminProductService.createOne({...req.body});
            res.status(201).json(newProduct);
        } catch (e) {
            next(e);
        }
    },
    getProductById: async (req, res, next) => {
        try {
            const {item} = req;
            res.json(item);
        } catch (e) {
            next(e);
        }
    },

    updateProduct: async (req, res, next) => {
        try {
            const {id} = req.params;
            const updatedProduct = await adminProductService.updateOne({_id: id}, req.body);
            res.status(201).json(updatedProduct);
        } catch (e) {
            next(e);
        }
    },

    deleteProduct: async (req, res, next) => {
        try {
            const {id} = req.params;
            await adminProductService.deleteOne({_id: id});
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
}

