import { ApiError } from "../utils/Response.utils.js";

export default function requireLogin(req,res,next){
    if (!req.session.userId){
        return ApiError(res, "Unauthorized", "Please log in", 401);
    }
    next()
}