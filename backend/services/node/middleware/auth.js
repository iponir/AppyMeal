const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        // Get Token
        const token = req.headers.authorization.split(" ")[1]
        // Verify Token
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.userData = decoded
        next() // Auth was a success
    }
    catch(err) {
        return res.status(401).json({
            message: 'Auth Failed'
        })
    }
}