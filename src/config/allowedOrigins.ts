import * as dotenv from 'dotenv';

dotenv.config 
const FRONT:string = process.env.BASE_URL_FRONT as string;

export const allowedOrigins:string[] = [
    'http://localhost:8080',
    'http://127.0.0.1:8080',
    FRONT,
    '216.24.57.3',
    '216.24.57.253'
]

