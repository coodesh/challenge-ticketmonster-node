export default (req, res, next) => {
  if (req.role !== '0') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};
