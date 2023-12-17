import { createClient,SchemaFieldTypes,RediSearchSchema,AggregateSteps,AggregateGroupByReducers } from "redis";

export const client = createClient({
    password: 'iemRf1InK9rdD1rOUutxqdask4z2VscP',
    socket: {
        host: 'redis-16291.c325.us-east-1-4.ec2.cloud.redislabs.com',
        port: 16291
    }
});

export const connectToRedis = async () => {
client.on('error', err => console.log('Redis Client Error', err));
await client.connect();
console.log("connected to Redis");
return client;
}