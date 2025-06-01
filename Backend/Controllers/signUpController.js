import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../database.js";

dotenv.config();

const SignUp = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const snapshot = await db.collection("UserAccounts").get();

    const existingUser = snapshot.docs.find(
      (doc) => doc.data().username === username
    );

    if (existingUser) {
      return res.status(400).json({ message: "Username already taken." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserRef = await db.collection("UserAccounts").add({
      username,
      password: hashedPassword,
      role: role || "User",
    });

    const token = jwt.sign(
      {
        username,
        userId: newUserRef.id,
        role: role || "User",
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "User registered successfully.",
      token,
      role: role || "User",
      redirectTo: role === "Admin" ? "/Admin-Portal" : "/homepage",
    });
  } catch (error) {
    console.error("Error in SignUp function: ", error);
    res.status(500).json({ message: "An error occurred during registration." });
  }
};

export default SignUp;
