"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkingProductQuantity = void 0;
const checkingProductQuantity = async (req, res, next) => {
    try {
        const cartItems = req.body.cartItems;
        let productNotFound = [];
<<<<<<< HEAD
        let errorFlag = false;
        const reqData = createArrayRequest(cartItems);
        let quantityProduct = await fetch("https://erp-server-uxqd.onrender.com/api/shop_inventory/updateInventory", {
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
                errorFlag = true;
            }
        }
        if (errorFlag === true) {
            res.status(406).json({ productNotFound: productNotFound });
=======
        for (let i = cartItems.length - 1; i >= 0; i--) {
            const resData = { _id: cartItems[i].id, quantity: cartItems[i].quantity };
            let quantityProduct = await fetch("https://erp-server-uxqd.onrender.com/api/shop_inventory/updateInventory", {
                method: "post",
                body: JSON.stringify(resData),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const responseData = await quantityProduct.json();
            if (quantityProduct.status !== 200 || responseData.error === 'not enough in stock' || responseData.error === 'no product id') {
                productNotFound.push(cartItems[i].id);
                req.body.price -=
                    cartItems[i].price * cartItems[i].quantity;
                cartItems.splice(i, 1);
            }
        }
        if (cartItems.length === 0) {
            res.status(405).json({ message: "No products in stock" });
>>>>>>> develop
        }
        else {
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
        let req = { _id: cartItem.id, quantity: cartItem.quantity };
        reqData.push(req);
    });
    return reqData;
};
