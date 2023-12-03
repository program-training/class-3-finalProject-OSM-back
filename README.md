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
