import express from "express";
import RedisClient from "./redis";
export const checkRedisMiddleware = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { test } = req.query;
      if (test) {
        const key = test as string;
        const data = await RedisClient.json.get(key);
        if (data) {
          console.log("Data retrieved from Redis");
          return res.send(data);
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
      next();
    }
  };