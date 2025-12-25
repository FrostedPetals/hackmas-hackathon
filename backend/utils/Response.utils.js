//standardized error and response
export const ApiError=(res,msg="Something went wrong",code="SERVER_ERROR",statusCode)=>{
    return res.status(statusCode).json({
            status: "error",
    error: {
      code,
      msg
    }

    })
}

export const ApiResponse=(res,msg="Success",data={},statuscode=200)=>{
    return res.status(statuscode).json({
        status:"success",
        data,
        msg
    })
}