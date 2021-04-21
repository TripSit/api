export default function validateMiddleware(schema) {
  return async (req, res) => {
    const data = req.method === 'GET' ? req.query : req.body;
    return schema.validate(data).catch(err => {
      if (err.name !== 'ValidationError') return Promise.reject(err);
      res.status(400).json({ errors: err.errors });
    });
  };
}
