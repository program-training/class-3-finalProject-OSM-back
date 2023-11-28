// const allowedOrigins = ["213.151.48.57",'http://localhost', 'http://127.0.0.1', 'http://localhost:8181'];
// const allowedOrigins = ["http://calcalist.com"]
// const corsOptions = {
//   origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
//     if (!origin || allowedOrigins.includes(origin)) {
//         console.log(origin);
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };

// export default corsOptions;
// import cors, { CorsOptionsDelegate } from "cors";

// const whiteList = ["213.151.48.57",'http://localhost', 'http://127.0.0.1', 'http://localhost:8080',"5.28.186.24"];
// // const whiteList = ["http://calcalist.com"];

// const corsOptions: CorsOptionsDelegate = (req, callback) => {
//   const isExist = whiteList.find((api) => api === req.headers.origin);
//   if (!isExist)
//     return callback(
//       new Error(
//         `CORS Error: the API ${req.headers.origin} is an Unauthorized API`
//       ),
//       {
//         origin: false,
//       }
//     );
//   callback(null, { origin: true });
// };
// const corsHandler = cors(corsOptions);

// export default corsHandler;
// import { Request, Response, NextFunction } from 'express';

// // const allowedOrigins = ["213.151.48.57",'http://localhost', 'http://127.0.0.1', 'http://localhost:8080',"5.28.186.24"];
// const allowedOrigins = ["http://calcalist.com"];
// const corsHandler = (req: Request, res: Response, next: NextFunction) => {
//   const origin = req.headers.origin as string;

//   if (allowedOrigins.includes(origin)) {
//     res.header("Access-Control-Allow-Origin", origin);
//   }

//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );

//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
//     return res.status(200).json({});
//   }

//   next();
// };

// export default corsHandler;
