const { createClient }  = require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
    //    host: 'redis-11092.crce179.ap-south-1-1.ec2.cloud.redislabs.com',
    //     port: 11092
    host: 'redis-11738.c212.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 11738
    }
});

module.exports = redisClient;
// const { createClient }  = require('redis');

// const client = createClient({
//     username: 'default',
//     password: process.env.REDIS_PASS,
//     socket: {
//         host: 'potato-balmy-sugar-34259.db.redis.io',
//         port: 11783
//     }
// });

// client.on('error', err => console.log('Redis Client Error', err));

// await client.connect();

// await client.set('foo', 'bar');
// const result = await client.get('foo');
// console.log(result)  // >>> bar

