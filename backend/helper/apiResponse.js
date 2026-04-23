exports.apiResponse = (res, statusCode, message, data) => {
    return res.status(statusCode).json({
        statusCode: statusCode,
        success: statusCode >= 300 ? false : true,
        message: message,
        data: data
    })
}