import express, { Router } from "express";

const router = Router();

router.post("/register", require("../controllers/registerUser").process);
router.post("/verify", require("../controllers/verifyUser").process);
router.post("/login", require("../controllers/loginUser").process);



module.exports = router;
