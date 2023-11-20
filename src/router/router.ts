import express, { Request, Response } from "express";
import usersRoutes from "../users/routes/usersRoutes";
import authenticateToken from "../utils/authenticate";
const router = express.Router();

router.use(authenticateToken)
router.use("/api/users", usersRoutes);
router.use("*", (req: Request, res: Response) =>
  res.status(404).send("Page not found!")
);

export default router;
