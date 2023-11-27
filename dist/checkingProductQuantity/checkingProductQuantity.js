"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkingProductQuantity = void 0;
const checkingProductQuantity = async (req, res, next) => {
    try {
        const cartItems = req.body.cartItems;
        const productNotFound = [];
        let errorFlag = false;
        const reqData = createArrayRequest(cartItems);
        const quantityProduct = await fetch("https://erp-server-uxqd.onrender.com/api/shop_inventory/updateInventory", {
            method: "post",
            body: JSON.stringify(reqData),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const responseData = await quantityProduct.json();
        for (let i = 0; i < responseData.length; i++) {
            if (responseData[i].error) {
                productNotFound.push({ id: cartItems[i].id, error: responseData[i].error });
                req.body.price -= cartItems[i].price * cartItems[i].quantity;
                cartItems.splice(i, 1);
            }
        }
        if (cartItems.length === 0) {
            res.status(406).json({ productNotFound: productNotFound });
        }
        else {
            req.body.cartItems = cartItems;
            res.locals.productNotFound = productNotFound;
            next();
        }
    }
    catch {
        res.status(500).json("checking product quantity is failed");
    }
};
exports.checkingProductQuantity = checkingProductQuantity;
const createArrayRequest = (cartItems) => {
    let reqData = [];
    cartItems.forEach((cartItem) => {
        let req = { productId: cartItem.id, requiredQuantity: cartItem.quantity };
        reqData.push(req);
    });
    return reqData;
};
