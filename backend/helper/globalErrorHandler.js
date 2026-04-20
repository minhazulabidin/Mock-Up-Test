const { apiResponse } = require("./apiResponse");

exports.globalErrorHandler = (error, req, res, next) => {
    if (error.name === "ValidationError") {
        let errors = {};
        Object.keys(error.errors).forEach((key) => {
            errors[key] = error.errors[key].message;
        });
        apiResponse(res, 400, Object.values(errors)[0])
    } else if (error.message) {
        apiResponse(res, 500, error.message)
    } else {
        console.log(error)
        apiResponse(res, 500, error)
    }
}