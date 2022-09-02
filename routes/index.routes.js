const router = require("express").Router();
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const adminRoutes = require("./admin.routes");
const uploadRoutes = require("./upload.routes");
const carRoutes = require("./car.routes");
const cleanServicesRoutes = require("./washservice.routes");
const orderRoutes = require("./order.routes");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/admin", adminRoutes);
router.use("/upload", uploadRoutes);
router.use("/car", carRoutes);
router.use("/cleanservices", cleanServicesRoutes);
router.use("/order", orderRoutes);

module.exports = router;
