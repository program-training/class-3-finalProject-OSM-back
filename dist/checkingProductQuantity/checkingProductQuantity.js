"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkingProductQuantity = void 0;
const checkingProductQuantity = async (req, res, next) => {
    try {
        const cartItems = req.body.cartItems;
        let productNotFound = [];
        for (let i = cartItems.length - 1; i >= 0; i--) {
            const resData = { productId: cartItems[i].id, requiredQuantity: cartItems[i].quantity };
            let quantityProduct = await fetch('https://erp-server-uxqd.onrender.com/api/shop_inventory/updateInventory', {
                method: 'post',
                body: JSON.stringify(resData)
            });
            if (quantityProduct.status !== 200) {
                productNotFound.push(`${cartItems[i].id}`);
                req.body.price -= cartItems[i].price * cartItems[i].quantity;
                cartItems.splice(i, 1);
            }
        }
        if (cartItems.length === 0) {
            res.status(405).json({ message: 'No products in stock' }).status(405);
        }
        else {
            req.body.cartItems = cartItems;
            res.locals.productNotFound = productNotFound;
            next();
        }
    }
    catch {
        res.json('checking product quantity is failed').status(500);
    }
};
exports.checkingProductQuantity = checkingProductQuantity;
