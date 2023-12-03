DATABASE_USERNAME=postgres://users_cwmw_user:kfozee3pFHkIqdsb3xN3DgchdmiLyr7I@dpg-cldimnmg1b2c73f7ul1g-a.oregon-postgres.render.com/users_cwmw
MONGODB_ATLAS_ORDERS=mongodb+srv://shayArebs:jgddBUU11AVsTqXr@cluster0.lyeaoqp.mongodb.net/data?retryWrites=true&w=majority
SECRET_TOKEN_KEY=secretKey
SECRET_TOKEN_KEY_ADMIN=secretKeyAdmin
SECRET_REFRESH_TOKEN_KEY=secretRefreshKey
PORT=8080
MONGO_CONNECTION_URI=mongodb+srv://shayArebs:jgddBUU11AVsTqXr@cluster0.lyeaoqp.mongodb.net/data?retryWrites=true&w=majority
BASE_URL_ERP=https://erp-server-uxqd.onrender.com/api/shop_inventory/updateInventory
BASE_URL_STORE=https://class-3-finalproject-store-back.onrender.com
BASE_URL_FRONT=https://final-project-front.onrender.com
GMAIL_USER=oms.1resetpass@gmail.com
EMAIL_PASSWORD=knwm fbdj rwoi muet
server
app.use("/users", userRouter);
app.use("/orders", orderRouter);

users=
userRouter.get('/',verifyToken,getAllUsersController)
userRouter.post("/register", validateUser, registerController);
userRouter.post("/login", limiter, validateUser, loginController);
userRouter.post("/forgotpassword", forgotPassword);
userRouter.post("/comparepassword", comperepassword);
userRouter.post("/resetpaasword", resetPassword);
userRouter.delete("/:userId", deleteUserByUserId);

orders=
orderRouter.get("/",verifyToken, handleGetAllOrders);
orderRouter.put("/:orderId", handleUpdateByOrderId);
orderRouter.post("/",checkingProductQuantity, handleAddNewOrder);
orderRouter.get("/:userId", handleGetOrdersByUserId);
orderRouter.delete("/:orderId", handleDeleteOrdersByOrderId);
