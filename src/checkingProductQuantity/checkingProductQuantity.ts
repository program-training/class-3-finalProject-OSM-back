 import { NextFunction, Request, Response } from "express";
 import { Product } from "../interfaces/orderInterface";

export const checkingProductQuantity =async (req: Request, res: Response, next: NextFunction)=>{
    try{
        const cartItems:Product[] = req.body.cartItems;
        let productNotFound:string[]=[] 
        for (let i = cartItems.length - 1; i >= 0; i--) {
            const resData ={productId:cartItems[i].id ,requiredQuantity:cartItems[i].quantity}
            let quantityProduct = await fetch('https://erp-server-uxqd.onrender.com/api/shop_inventory/updateInventory',{
                method: 'post',
                body: JSON.stringify(resData)
            })

            if (quantityProduct.status !== 200){
                productNotFound.push(`${cartItems[i].id}`)
                req.body.price -= (cartItems[i].price as number) * (cartItems[i].quantity as number);
                cartItems.splice(i,1)
            }

          }
          if(cartItems.length===0){
            res.status(405).json({message:'No products in stock'}).status(405)
          }else{
          req.body.cartItems=cartItems
          res.locals.productNotFound=productNotFound
          next()
          }
    }catch {
        res.json('checking product quantity is failed').status(500);
    }

}
