import { createClient } from "redis";
const RedisClient = createClient({
    password: 'J5U2IHHj7zSIO5fZDNXBtWGqlw4k8iTZ',
    socket: {
        host: 'redis-17818.c135.eu-central-1-1.ec2.cloud.redislabs.com',
        port: 17818
    }
  });

export default RedisClient;