const { MongoAPIError } = require("mongodb");
const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    const userService = new UserService(MongoDB.client);
    if(!req.body?.name || !req.body?.password){
       
        return next(new MongoAPIError(400, "Name or pass can not be empty"));
        
    }
    
    try {
        const data = await userService.findByName(req.body?.name)
        if(data.length > 0) {return res.send({ message: "Thất bại! Tên người dùng đã tồn tại", isCreate: false});}
       
        
        const document = await userService.create(req.body);
        return res.send({ message: "Thành công! Hãy đăng nhập ngay", isCreate: true});
    }catch(error){
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const userService = new UserService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await userService.findByName(name);
        } else {
            documents = await userService.find();
        }
    } catch (error) {
        return next(
            new  ApiError(500, "An error occurred while creating the contact")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const documents = await userService.logIn(req.body?.name,req.body?.password);
        if (documents.length>0) {
            return res.send({message:"Đăng nhập thành công",isLogin:true});
           
        }else
        return res.send({message:"Sai tên đăng nhập hoặc mật khẩu",isLogin:false});
    } catch (error) {
        return next(
            new  ApiError(500, "An error occurred while login the contact")
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.update(req.params.id, req.body);
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
      const userService = new UserService(MongoDB.client);
      const document = await userService.delete(req.params.id);
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
        const userService = new UserService(MongoDB.client);
        const deletedCount = await userService.deleteAll();
        return res.send({ 
            message: `${deletedCount} contacts were deleted successfully`, 
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all contacts")
        );
    }
}
exports.findAllFavorite = async (_req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.findFavorite();
        return res.send(document);
    } catch (error) {
        return next(
            new  ApiError(500, "An error occurred while creating the contact")
        );
    }
};