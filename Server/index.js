const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require("path");
const crypto = require('crypto');
const { connectDB } = require('./db');
const userRouter = require('./Routes/authRoutes');
const blogRouter = require('./Routes/blogRoutes');
const commentRouter = require('./Routes/commentRoutes');
const cloudinary = require('cloudinary').v2;

const app = express();

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.use(cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true
}));

app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.json({ urlencoded: false, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());



const PORT = process.env.HOSTPORT;

connectDB();


app.use('/api/users', userRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/comments', commentRouter);
app.get('/', (req, res) => {
    res.send("Welcome to ZONEY");
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});