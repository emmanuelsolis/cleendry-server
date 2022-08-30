const router = require("express").Router();
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const adminRoutes = require("./admin.routes");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
