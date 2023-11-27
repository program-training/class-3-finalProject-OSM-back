import { NextFunction, Request, Response } from "express";
import { Product } from "../interfaces/orderInterface";

export const checkingProductQuantity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartItems: Product[] = req.body.cartItems;
    let productNotFound: Object[] = [];
    for (let i = cartItems.length - 1; i >= 0; i--) {
      const resData = { _id: cartItems[i].id, quantity: cartItems[i].quantity };
      let quantityProduct = await fetch(
        "https://erp-server-uxqd.onrender.com/api/shop_inventory/updateInventory",
        {
          method: "post",
          body: JSON.stringify(resData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await quantityProduct.json();
      console.log(responseData)
      if (quantityProduct.status !== 200||responseData.error==='not enough in stock'||responseData.error==='no product id') {
        productNotFound.push(cartItems[i].id as string);
        req.body.price -=
          (cartItems[i].price as number) * (cartItems[i].quantity as number);
        cartItems.splice(i, 1);
      }
    }
    if (cartItems.length === 0) {
      res.status(405).json({ message: "No products in stock" });
    } else {
      req.body.cartItems = cartItems;
      res.locals.productNotFound = productNotFound;
      next();
    }
  } catch {
    res.status(500).json("checking product quantity is failed");
  }
};
