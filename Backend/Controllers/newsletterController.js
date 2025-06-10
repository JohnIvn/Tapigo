import db from "../database.js";

const Newsletter = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== "string") {
      return res
        .status(400)
        .json({ error: "Invalid or missing 'text' value." });
    }

    await db.collection("Newsletter").doc(text).set({ active: true });

    res.status(201).json({ message: "Newsletter entry created.", id: text });
  } catch (error) {
    console.error("Error adding newsletter:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export default Newsletter;
