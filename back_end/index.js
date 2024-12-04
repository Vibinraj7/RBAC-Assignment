const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoute = require('../back_end/routes/authRoute')
const app = express();


//MIDDLEWARES
app.use(cors());
app.use(express.json())



//ROUTES
app.use('/api/auth',authRoute)


//MONGODB CONNECTION
mongoose.connect('mongodb://localhost:27017/role_based_access_control')
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log("failed to connect MongoDB", error))



//GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});


//SERVER CONNECTION

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
})