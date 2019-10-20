class responses {
  static errorResponse = (req, res, status, resError) => {
    res.status(status).json({
      status,
      error: resError,

    });
  };

  static successResponse = (req, res, status, resMessage, data) => {
    res.status(status).json({
      status,
      message: resMessage,
      data,
    });
  };
}
export default responses;
