const apiResponse = {
  success: (data: any, message = "Success") => {
    const respData = {
      data,
      message,
      success: true,
      status: 200,
    };

    return respData;
  },
  error: (error: any, message = "Error") => {
    const respData = {
      error,
      message,
      success: false,
      status: error.statusCode || 500,
    };

    return respData;
  },
};

export default apiResponse;
