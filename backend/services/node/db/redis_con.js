const redis = require('redis')

const client = redis.createClient({
    port      : process.env.PORT,               // replace with your port
    host      : process.env.DB_HOST,        // replace with your hostanme or IP address
    password  : process.env.DB_PASS,    // replace with your password
    // optional, if using SSL
    // use `fs.readFile[Sync]` or another method to bring these values in
  })

// Print Redis errors to the command line
client.on('error', (err) => {
    console.log("Error: => " + err)
})

client.on('connect', () => {
    console.log('connected');
})

const promiser = (resolve, reject) => {
    return (err, data) => {
        if(err) reject(err)
        resolve(data)
    }
}

const get = (key) => {
    return new Promise((resolve, reject) => {
        client.get(key, promiser(resolve, reject))
    })
}

const hgetall = (key) => {
    return new Promise((resolve, reject) => {
        if(key === null) reject()
        client.hgetall(key, promiser(resolve, reject))
    })
}

const lrange = (key) => {
    return new Promise((resolve, reject) => {
        client.lrange(key, [0, -1], promiser(resolve, reject))
    })
}

const zrevrangebyscore = (key, max, min) => {
    return new Promise((resolve, reject) => {
        client.zrevrangebyscore(key, max, min, promiser(resolve, reject))
    })
}

exports.client = client
exports.get = get
exports.hgetall = hgetall
exports.lrange = lrange
exports.zrevrangebyscore = zrevrangebyscore