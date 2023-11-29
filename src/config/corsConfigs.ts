import { allowedOrigins } from "./allowedOrigins"

export const corsConfigs = {
    origin: (origin:string | undefined, callback:(err: Error | null, allow?: boolean) => void) => {
        console.log(`${origin}  cors`);
        const origin1 = origin as string
        console.log(allowedOrigins.includes(origin1) +' cors');
        console.log(allowedOrigins)
        
        if (!origin || allowedOrigins.includes(origin1)   ) {
            callback(null, true)
        } else {
            callback(new Error('origin not allowed by Cors'),false)
        }
    },
    optionsSuccessStatus: 200,
}
