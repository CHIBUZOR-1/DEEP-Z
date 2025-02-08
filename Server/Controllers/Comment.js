const commentModel = require('../models/CommentModel');

const createComment = async(req, res) => {
    try {
        const { bId, comt }= req.body
        const commentz = await new commentModel({
            by: req.user.userId,
            blogId: bId,
            content: comt
        }).save()

        const popComment = await commentModel.findById(commentz._id).populate({
            path: 'by',
            select: '-password'
        })
        res.status(201).json({
            ok: true,
            popComment
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
const editComment = async(req, res) => {
    try {
        const updatedCommentz = await commentModel.findByIdAndUpdate(req.params.id, {
            content: req.body.eComt
        }, {
            new: true
        }).populate({
            path: 'by',
            select: '-password'
          });

          if (!updatedCommentz) {
            return res.status(404).json({
              ok: false,
              message: 'Comment not found',
            });
          }
          console.log(updatedCommentz)
      
          res.status(200).json({
            ok: true,
            message: 'Comment updated',
            updatedCommentz,
          });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: true,
            message: "An error occurred!"
        })
    }
}
const getComments = async(req, res) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const comments = await commentModel.find({}).sort({ createdAt: -1}).populate({
            path: 'by',
            select: '-password'
        }).sort({UpdatedAt: -1}).skip(startIndex).limit(limit);
        const totalComments = await commentModel.countDocuments({});
        const now = new Date();
        const oneMonthAgo= new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );
        const lastMonthComments = await commentModel.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });
        res.status(200).json({
            ok: true,
            msg: 'Fetched',
            comments,
            totalComments,
            lastMonthComments
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
const getBlogComments = async(req, res) => {
    try {
        const comment= await commentModel.find({ blogId: req.params.id }).sort({ createdAt: -1}).populate({
            path: 'by',
            select: '-password'
        })
        if(!comment) {
            res.json({
                ok: false,
                msg: 'None found'
            })
        }
        res.status(200).json({
            ok: true,
            comment
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
const deleteComment = async(req, res) => {
    try {
        const commentD = await commentModel.findByIdAndDelete(req.params.id);
        if(!commentD){
            res.json({
                ok: false,
                msg: 'Not successful'
            })
        }
        res.status(200).json({
            ok: true,
            msg: 'Deleted successfully'
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
const likeUnlikeComment = async(req, res)=> {
    try {
        const comment = await commentModel.findById(req.params.id);
        if(!comment) {
            return res.json({
                error: true,
                message: "Not found"
            })
        }
        const likedComment= comment.likes.includes(req.user.userId);
        if(likedComment) {
            // unlike comment
            comment.likes.pull(req.user.userId);
            await comment.save();
        } else {
            comment.likes.push(req.user.userId)
            await comment.save();
        }
        const updatedComment = await commentModel.findById(req.params.id).populate({
            path: "by",
            select: "-password"
        });
        res.status(200).json({ ok: true, message: "Comment Liked", updatedComment })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: true,
            message: "Error!"
        })
    }
}

module.exports = { createComment, editComment, deleteComment, getComments, getBlogComments, likeUnlikeComment }
