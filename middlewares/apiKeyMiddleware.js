require('dotenv').config();
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

const apiKeyMiddleware = (req, res, next) => {
    try {
        const apiKey = req.header('api-key');

        if (!apiKey) {
            return res.json({ msg: 'API key not provided' });
        }

        if (apiKey !== ADMIN_API_KEY) {
            return res.json({ message: 'Invalid API key' });
        }

        next();
    } catch (e) {
        return res.json({ msg: 'Server Error!' })
    }
};

module.exports = apiKeyMiddleware;
