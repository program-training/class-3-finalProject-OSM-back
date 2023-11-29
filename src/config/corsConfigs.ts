import { allowedOrigins } from "./allowedOrigins"

export const corsConfigs = {
    origin: (origin:string | undefined, callback:(err: Error | null, allow?: boolean) => void) => {
        console.log(origin);
        
        if (allowedOrigins.includes(origin as string) !== true || !origin) {
            callback(null, true)
        } else {
            callback(new Error('origin not allowed by Cors'))
        }
    },
    optionsSuccessStatus: 200,
}
