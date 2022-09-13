module.exports = {
    isSameOrderWithDB: (list, listDB) => {
        // productId - _id
        return list.every((li, index) => {
            // console.log(li.productId)
            // console.log(listDB[index]._id.toString())

            return li.productId === listDB[index]._id.toString()
        });
    },

}

