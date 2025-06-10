import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import db from "../database.js";
import admin from "firebase-admin";

dotenv.config();

const SignIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const snapshot = await db.collection("UserAccounts").get();

    let userDoc = null;
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.username === username) {
        userDoc = { id: doc.id, ...data };
      }
    });

    if (!userDoc) {
      return res.status(400).json({ message: "User not found." });
    }

    const verified = await bcrypt.compare(password, userDoc.password);
    if (!verified) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      {
        username: userDoc.username,
        userId: userDoc.id,
        role: userDoc.role || "User",
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    const analyticsRef = db.collection("Analytics").doc("loginStats");
    const analyticsDoc = await analyticsRef.get();

    if (analyticsDoc.exists) {
      await analyticsRef.update({
        totalLogins: admin.firestore.FieldValue.increment(1),
      });
    } else {
      await analyticsRef.set({ totalLogins: 1 });
    }

    return res.status(200).json({
      message: "Login successful.",
      token: token,
      role: userDoc.role || "User",
      redirectTo: userDoc.role === "Admin" ? "/Admin-Portal" : "/homepage",
    });
  } catch (error) {
    console.error("Error in SignIn function: ", error);
    return res.status(500).json({ message: "An error occurred during login." });
  }
};

export default SignIn;
