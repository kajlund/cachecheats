// Use async function to wrap async route handlers for DRYness
// https://www.acuriousanimal.com/blog/2018/03/15/express-async-middleware
const wrap = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = wrap;