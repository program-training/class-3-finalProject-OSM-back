import { allowedOrigins } from "./allowedOrigins"
import { Request,Response } from "express"; 

// export const corsConfigs = {
//     origin: (origin:string | undefined, callback:(err: Error | null, allow?: boolean) => void) => {
//         console.log(`${origin}  cors`);
//         console.log(allowedOrigins.includes(String(origin)) +' cors');
//         console.log(allowedOrigins)
        
//         if (allowedOrigins.includes('https://final-project-front.onrender.com')   ) {
//             callback(null, true)
//         } else {
//             callback(new Error('origin not allowed by Cors'),false)
//         }
//     },
//     optionsSuccessStatus: 200,
// }

export const corsConfigs = (req:Request,callback:(err: Error | null, corsOptions: object) => void) => {
    
        console.log(`${String(req.header('Origin'))}  cors`);
        console.log(allowedOrigins.includes(String(req.header('Origin'))) +' cors');
        console.log(allowedOrigins)
    let corsOptions:object ;

    if (allowedOrigins.indexOf('https://final-project-front.onrender.com') !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
      } else {
        corsOptions = { origin: false } // disable CORS for this request
        throw new Error('origin not allowed by Cors')
      }
      console.log(corsOptions)
      callback(null, corsOptions) 
    }

