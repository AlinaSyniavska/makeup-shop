module.exports = {
    getTypeAndCategory: (path) => {
        const productTypeAndCategory = path.split('/');
        const indexEmpty = productTypeAndCategory.findIndex(item => item === '');
        if (indexEmpty !== -1) {
            productTypeAndCategory.splice(indexEmpty, 1);
        }
        if (productTypeAndCategory.length === 1) {
            productTypeAndCategory.push('none')
        }

        // return productTypeAndCategory;
        return productTypeAndCategory.map(item => item.charAt(0).toUpperCase() + item.substring(1));
    }
}

