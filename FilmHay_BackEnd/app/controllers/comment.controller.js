const { MongoAPIError } = require("mongodb");
const CommentService = require("../services/comment.service");
const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

//Tao cmt
exports.create = async (req, res, next) => {
    const commentService = new CommentService(MongoDB.client);
    if(!req.body?.name){
       
        return res.json({message:"Bạn cần đăng nhập để bình luận",isPost:false});
        
    }else if(!req.body?.content){
        return res.json({message: "Bình luận không được để trống"})
    }
  
    try { 
        
        const document = await commentService.create(req.body);
        return res.json({isPost:true});
    }catch(error){
        return next(
            new ApiError(500, "An error occurred while creating the comment")
        );
    }
};

exports.findCommentBySlug = async (req, res, next) => {
    try {
        const commentService = new CommentService(MongoDB.client);
        const documents = await commentService.findCommentBySlug(req.body?.slug);
        if (documents.length>0) {
            return res.json(documents);
           
        }else
        return res.send({message:"Sai tên đăng nhập hoặc mật khẩu"+req.body?.slug});
    } catch (error) {
        return next(
            new  ApiError(500, "An error occurred while login the contact")
        );
    }
};


exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const commentService = new CommentService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await commentService.findByName(name);
        } else {
            documents = await commentService.find();
        }
    } catch (error) {
        return next(
            new  ApiError(500, "An error occurred while creating the contact")
        );
    }
    return res.send(documents);
};


exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const commentService = new CommentService(MongoDB.client);
        const document = await commentService.update(req.params.id, req.body);
        if (!document){
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was update successfully"});
    } catch (error) {
        return next(
            new  ApiError(500, "An error occurred while creating the contact")
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
      const commentService = new CommentService(MongoDB.client);
      const document = await commentService.delete(req.params.id);
      if (!document) {
        return next(new ApiError(404, "Contact not found"));
      }
      return res.send({ message: "Contact was deleted successfully" });
    } catch (err) {
      return next(
        new ApiError(500, "Could not delete contact with id: " + req.params.id)
      );
    }
  };

exports.deleteAll = async (_req, res, next) => {
    try {
        const commentService = new CommentService(MongoDB.client);
        const deletedCount = await commentService.deleteAll();
        return res.send({ 
            message: `${deletedCount} contacts were deleted successfully`, 
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all comment")
        );
    }
}
exports.findAllFavorite = async (_req, res, next) => {
    try {
        const commentService = new CommentService(MongoDB.client);
        const document = await commentService.findFavorite();
        return res.send(document);
    } catch (error) {
        return next(
            new  ApiError(500, "An error occurred when findall")
        );
    }
};