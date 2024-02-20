function loggerMiddleware(req, res, next) {
  const timestamp = new Date().toLocaleString("da-DK", { timeZone: "Europe/Copenhagen" }).toString();
  const origin = req.headers['origin'] || req.headers['referer'] || req.connection.remoteAddress;
  const statusCode = res.statusCode;

  console.log(`[${timestamp}] Request from: ${origin} | Status code: ${statusCode} | Path: ${req.originalUrl} | Method: ${req.method}`);

  next();
}

module.exports = loggerMiddleware;
