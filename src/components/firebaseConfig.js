import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDc6KM28p9yMN8jf6j3rO4hSuS2dGrRBbs",
  authDomain: "snail-926bd.firebaseapp.com",
  projectId: "snail-926bd",
  storageBucket: "snail-926bd.appspot.com",
  messagingSenderId: "226907372444",
  appId: "1:226907372444:web:81f9082335b52dcc62e659",
  measurementId: "G-GFMSJE658M",
};

// Initialize Firebase only if it hasn't been initialized yet
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig); // Initialize app
} else {
  app = getApps()[0]; // Use the existing initialized app
}

export default app; // Export the app
