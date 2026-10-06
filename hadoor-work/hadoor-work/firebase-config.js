// ضع بيانات مشروع Firebase هنا من Project settings > Your apps > Web app.
// هذه بيانات Web App وليست مفاتيح خادم. لا تضع service account أو private key هنا.
export const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_FIREBASE_APP_ID"
};

// EmailJS: أنشئ Service + Template من emailjs.com ثم ضع القيم هنا.
// داخل القالب استخدم: {{from_name}}, {{reply_to}}, {{subject}}, {{message}}
export const emailConfig = {
  publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
  serviceId: "YOUR_EMAILJS_SERVICE_ID",
  templateId: "YOUR_EMAILJS_TEMPLATE_ID",
  // بريد الاستلام المطلوب: haider.abaas6g@gmail.com — ضعه في خانة To Email داخل قالب EmailJS.
  configured: false
};
