import { allowedOrigins } from "./allowedOrigins"

export const corsConfigs = {
    origin: (origin:string | undefined, callback:(err: Error | null, allow?: boolean) => void) => {
        console.log(`${origin}  cors`);
        console.log(allowedOrigins.indexOf(origin as string)+' cors');
        
        if (allowedOrigins.indexOf(origin as string) !== -1  ) {
            callback(null, true)
        } else {
            callback(new Error('origin not allowed by Cors'))
        }
    },
    optionsSuccessStatus: 200,
}
