const asyncHandler = require("express-async-handler");

const postMessage = asyncHandler(async (req, res) => {
  console.log(req.body)
  if (!req.body.name || !req.body.email || !req.body.message) {
    res.status(400).json({ error: "All fields must be filled" });
  }
  else res.status(200).json({ message: "Message sent" });
});

module.exports = postMessage