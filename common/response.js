export function errorRes(
  res,
  err,
  errMsg = "failed operation",
  statusCode = 500
) {
  console.error("ERROR:", err);
  return res.status(statusCode).json({ error: errMsg });
}

export function successRes(res, data = {}, statusCode = 200) {
  return res.status(statusCode).json(data);
}

export function errData(res, errMsg = "failed operation") {
  return (err, data) => {
    if (err) return errorRes(res, err, errMsg);
    return successRes(res, data);
  };
}
