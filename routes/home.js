const express = require("express");
const router = express.Router();
console.log("oten")
router.get("/", async (req, res, next) => {
  return res.status(200).json({
    title: "Express Testing",
    message: "test",
  });
});

module.exports = router;
