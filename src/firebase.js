import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCABfDvjo_yCAA527UsQIM6_3qvE8pYT3Q",
  authDomain: "auth-dev-test-ce07b.firebaseapp.com",
  projectId: "auth-dev-test-ce07b",
  storageBucket: "auth-dev-test-ce07b.appspot.com",
  messagingSenderId: "64617145632",
  appId: "1:64617145632:web:6ca562b516468b581ee345"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export { app as default, auth };
