export default function createDefaultErrorHandler() {
  return (err, req, res, next) => {
    if (res.headersSent) next(err);
    else {
      console.error(err);
      res.sendStatus(500);
    }
  };
}
