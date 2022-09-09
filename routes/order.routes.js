const router = require("express").Router();
//importar los controladores
const {
  preOrder,
  placeOrder,
  myOrders,
  workOrders,
  viewOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.controller");

//importar los middlewares
const { verifyToken, checkRole } = require("../middleware");

router.patch("/pending/:id", verifyToken, checkRole(["Employee"]), preOrder);
router.post("/place", verifyToken, checkRole(["Client"]), placeOrder);
router.get("/client-orders", verifyToken, checkRole(["Client"]), myOrders);
router.get("/work-orders", verifyToken, checkRole(["Employee"]), workOrders);
router.get("/get/:id", verifyToken, viewOrder);
router.patch("/update/:id", verifyToken, checkRole(["Client"]), updateOrder);
router.delete("/delete/:id", verifyToken, checkRole(["Client"]), deleteOrder);

module.exports = router;
