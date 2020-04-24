const cache = require('../db/redis_con')
module.exports = (req, res, next) => {
    cache.client.get('cache', (err, reply) => {
        if(err){
            res.status(422).json({error: err})
        }
        else{
            console.log(reply)
            if(reply == 'manager'){
                next()
            }
            else{
                res.status(422).json({error: 'Only user type of Manager can access this route'})
            }
        }
    })
}