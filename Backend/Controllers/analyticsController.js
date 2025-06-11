import db from "../database.js";

const getAnalyticsStats = async (req, res) => {
  try {
    const loginStatsRef = db.collection("Analytics").doc("loginStats");
    const signUpStatsRef = db.collection("Analytics").doc("signUpStats");

    const [loginDoc, signUpDoc] = await Promise.all([
      loginStatsRef.get(),
      signUpStatsRef.get(),
    ]);

    if (!loginDoc.exists || !signUpDoc.exists) {
      return res.status(404).json({ error: "Analytics documents not found." });
    }

    const totalLogins = loginDoc.data().totalLogins || 0;
    const totalSignUps = signUpDoc.data().totalSignUps || 0;

    res.status(200).json({
      totalLogins,
      totalSignUps,
    });
  } catch (error) {
    console.error("Error fetching analytics stats:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export default getAnalyticsStats;
