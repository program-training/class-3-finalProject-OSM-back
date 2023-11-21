import { OrderInterface } from "./orderInterface";
// import { allOrdersDal } from "./dal/userDal";

export const allOrdersService = async (Order: OrderInterface) => {
    try {
      const result = await allOrdersDal(Order);
      return result;
    } catch (err) {
      console.error("Error reading data:(service)", err);
      throw err;
    }
  };
