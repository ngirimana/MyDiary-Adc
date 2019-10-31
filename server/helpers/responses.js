class responses {
  static errorResponse = (res, status, resError) => {
    res.status(status).json({
      status,
      error: resError,

    });
  };

  static successResponse = (res, status, resMessage, data) => {
    res.status(status).json({
      status,
      message: resMessage,
      data,
    });
  };
}
export default responses;
