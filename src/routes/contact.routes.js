import express from "express";
import {
  createContact,
  getAllContacts,
  replyToContact,
} from "../controllers/contact.controllers.js";

const router = express.Router();

router.post("/", createContact);
router.get("/", getAllContacts);
router.patch("/:id/reply", replyToContact);

export default router;
