const asyncHandler = require("express-async-handler");
const Comment = require("../models/commentModel");
const User = require("../models/userModel");
const Work = require("../models/workModel");

const PostComment = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user.id);

      const comment = {
        work: user.member.work ,
        name: user.name,
        image:user.image,
        comment:req.body.comment
      }
      const comments = await Comment.create(comment);
      res.status(200).json(comments);
});

const GetCommentProject = asyncHandler(async(req,res)=>{
  const project = await Comment.find({work :req.params.id});
  res.json(project);
})

const GetAllComment = asyncHandler(async(req,res)=>{
   const comment = await Comment.find({});
   res.status(200).json(comment);
});

const DeleteComment = asyncHandler(async(req,res)=>{
  const comment = await Comment.findById(req.params.id);
  const user = await User.findById(req.user.id);
  if(user.name !== comment.name){
    res.status(400).json({msg: "bạn không xóa đc cái này"});
    return;
 }

  if(comment){
    const remove = await comment.remove();
    res.json({msg:"xóa thành công"})
  }
  else{
    res.status(400);
    throw new Error('Comment not found');
  }
  
});

const PutComment = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user.id);
    const comments = await Comment.findById(req.params.id);
    if(user.name !== comments.name){
       res.status(400).json({msg: "bạn không sửa đc cái này"})
       return;
    }

    if(comments){
        comments.comment = req.body.comment || comments.comment;
    }
    const updateComment = await comments.save();
    res.status(200).json(updateComment);

});

module.exports = {
  PostComment,
  GetAllComment,
  DeleteComment,
  PutComment,
  GetCommentProject
}