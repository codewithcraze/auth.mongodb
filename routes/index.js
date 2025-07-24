const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.route');


const routes = [
    {
        path: '/auth',
        route: authRoutes
    }
]

routes.forEach((data, index) => router.use(data.path, data.route));


module.exports = router;