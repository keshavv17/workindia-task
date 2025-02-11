require('dotenv').config();
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

const apiKeyMiddleware = (req, res, next) => {
    try {
        const apiKye = req.header('api-key');

        if (!apiKye) {
            return res.json({ msg: 'API key not provided' });
        }

        if (apiKye !== ADMIN_API_KEY) {
            return res.json({ message: 'Invalid API key' });
        }

        next();
    } catch(e) {
        console.log(error);
        return res.json({ msg: 'Server Error!' })
    }
};

module.exports = apiKeyMiddleware;
