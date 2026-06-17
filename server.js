import express from "express";
import admin from "firebase-admin";
import cron from "node-cron";

const app = express();

// Firebase Service Account
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Test Route
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Dheiva Theervu Backend Running 🚀"
  });
});

// Auto Update Panchangam Daily
cron.schedule("0 0 * * *", async () => {
  try {

    const todayData = {
      nakshatra: "Ashwini",
      tithi: "Prathama",
      ragu: "07:30 AM - 09:00 AM",
      yamagandam: "10:30 AM - 12:00 PM",
      kuligai: "01:30 PM - 03:00 PM",
      sunrise: "06:00 AM",
      sunset: "06:30 PM",
      festival: "Daily Panchangam Updated",
      rasi: "Good day for spiritual activities"
    };

    await db
      .collection("daily_panchangam")
      .doc("today")
      .set(todayData);

    console.log("✅ Panchangam Updated");

  } catch (error) {
    console.error(error);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
