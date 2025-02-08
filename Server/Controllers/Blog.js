const blogModel = require('../models/blogModel');
const cloudinary = require('cloudinary').v2;

const createBlog = async(req, res)=> {
    try {
        const { title, category, media, info, mediaId} = req.body;
        const blog = await new blogModel({
            title,
            media,
            category,
            descp: info,
            mediaId
        }).save();
        res.status(201).json({
            success: true,
            error: false,
            message: "Blog created successfully",
            blog
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: true,
            message: "An error occurred!"
        })
    }
}
const blogById = async(req, res) => {
    try {
        const blog = await blogModel.findById(req.params.id)
        if(!blog) {
            res.json({
                success: false,
                msg: 'No blog found'
            })
        }
        res.status(200).json({
            success: true,
            blog
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: true,
            message: "An error occurred!"
        })
    }
}

const updateBlog = async(req, res)=> {
    try {
        const { newTitle, newCat, newDesc } = req.body;
        const blog = await blogModel.findById(req.params.id);

        if (!blog) {
        return res.status(404).json({
            success: false,
            message: 'Blog not found',
        });
        }

        let newMed = blog.media;
        let newMediaId = blog.mediaId;

        // Check if a new file was uploaded
        if (req.file) {
        const fileBuffer = req.file.buffer;

            // Remove the previous image from Cloudinary
            if (blog.mediaId) {
                await cloudinary.uploader.destroy(blog.mediaId, { resource_type: 'image' });
            }

            // Upload the new image to Cloudinary
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({
                resource_type: 'image',
                upload_preset: 'Deep-z',
                transformation: [
                    {
                    quality: 'auto',
                    fetch_format: 'auto',
                    },
                    {
                    width: '800',
                    height: '800',
                    crop: 'fill',
                    gravity: 'auto',
                    },
                ],
                }, (error, result) => {
                if (error) return reject(error);
                resolve(result);
                }).end(fileBuffer);
            });

            newMed = result.secure_url;
            newMediaId = result.public_id;
        }

        // Update the blog with the new details
        const updatedBlog = await blogModel.findByIdAndUpdate(
        req.params.id,
        {
            title: newTitle,
            category: newCat,
            media: newMed,
            descp: newDesc,
            mediaId: newMediaId,
        },
        { new: true }
        );

        res.json({
        success: true,
        blogz: updatedBlog,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error: true,
            message: "An error occurred!"
        })
    }
}


const findAllBlogs = async(req, res)=> {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortOrder = req.query.sort === 'asc' ? 1 : -1;
        const query = {};

        // Building the query object conditionally
        if (req.query.kword) {
            query.$or = [
                { title: { $regex: req.query.kword, $options: "i" } },
                { descp: { $regex: req.query.kword, $options: "i" } },
            ];
        }

        if (req.query.caty) {
            query.category = { $regex: req.query.caty, $options: "i" };
        }
        const blogs = await blogModel.find(query).sort({createdAt: sortOrder}).skip(startIndex).limit(limit);
        const totalBlogs = await blogModel.countDocuments(query);
        const now = new Date();
        const oneMonthAgo= new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );
        const lastMonthBlogs = await blogModel.countDocuments({
            ...query,
            createdAt: { $gte: oneMonthAgo },
        });
        res.status(200).json({ 
            success: true,
            blogs,
            totalBlogs,
            lastMonthBlogs
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: true,
            message: "An error occurred!"
        })
    }
}

const deleteBlog= async(req, res)=> {
    try {
        const blog = await blogModel.findById(req.params.id);
        if(!blog)  {
            res.json({
                success: false,
                message: "delete Usuccessful"
            });
        }

        
        if (blog.mediaId) {
            await cloudinary.uploader.destroy(blog.mediaId, { resource_type: 'image' });
        }
        await blogModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ ok: true, msg: 'Blog deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error: true,
            msg: "An error occurred!"
        })
    }
}


module.exports = { createBlog, updateBlog, blogById, findAllBlogs, deleteBlog }