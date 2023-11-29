import { allowedOrigins } from "./allowedOrigins"

export const corsConfigs = {
    origin: (origin:string | undefined, callback:(err: Error | null, allow?: boolean) => void) => {
        console.log(`${origin}  cors`);
        console.log(allowedOrigins.includes('https://final-project-front.onrender.com') +' cors');
        console.log(allowedOrigins)
        
        if (allowedOrigins.includes('https://final-project-front.onrender.com')   ) {
            callback(null, true)
        } else {
            callback(new Error('origin not allowed by Cors'),false)
        }
    },
    optionsSuccessStatus: 200,
}
