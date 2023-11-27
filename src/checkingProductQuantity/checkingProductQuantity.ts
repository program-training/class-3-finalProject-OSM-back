import { NextFunction, Request, Response } from "express";
import { Product } from "../interfaces/orderInterface";

interface NotFound{
  id:string;
  error:string;
}
export const checkingProductQuantity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartItems: Product[] = req.body.cartItems;
    const productNotFound: NotFound[] = [];
    let errorFlag:boolean = false;
    const reqData = createArrayRequest(cartItems);
    const quantityProduct = await fetch(
        "https://erp-server-uxqd.onrender.com/api/shop_inventory/updateInventory",
        {
          method: "post",
          body: JSON.stringify(reqData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    const responseData = await quantityProduct.json();
    for (let i = 0; i<responseData.length; i++) {
        if(responseData[i].error){
            productNotFound.push({id:cartItems[i].id as string, error: responseData[i].error});
            errorFlag = true
        }
    }
    if (errorFlag === true) {
      res.status(406).json({ productNotFound:productNotFound })
    } else {
        next()
    }
  } catch {
    res.status(500).json("checking product quantity is failed");
  }
};
const createArrayRequest = (cartItems:Product[])=>{
     let reqData:Array<object>=[]
     cartItems.forEach((cartItem:Product)=>{
        let req = { _id: cartItem.id, quantity: cartItem.quantity}
        reqData.push(req)
     })
     return reqData
}