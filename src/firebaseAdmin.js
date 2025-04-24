import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // Or use .cert() with service account
    databaseURL: "https://bizethio-60df1.firebaseio.com"
  });
}

export default admin;
