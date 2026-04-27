import Contact from "../models/contact.model.js";
import { sendMail } from "../utills/sendMail.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "name, email and message are required" });
    }

    const contact = await Contact.create({ name, email, message });

    const ownerEmailText = `
New Contact Message

Name: ${name}
Email: ${email}
Message: ${message}
`;

    if (process.env.OWNER_EMAIL) {
      await sendMail(process.env.OWNER_EMAIL, "New Contact Message", ownerEmailText);
    }

    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Error creating contact" });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts" });
  }
};

export const replyToContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    if (!reply) {
      return res.status(400).json({ message: "reply is required" });
    }

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    contact.reply = reply;
    contact.repliedAt = new Date();
    await contact.save();

    const userReplyText = `
Hello ${contact.name},

Thanks for contacting us.

Your message:
${contact.message}

Our reply:
${reply}
`;

    await sendMail(contact.email, "Reply to your contact message", userReplyText);

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: "Error replying to contact" });
  }
};
