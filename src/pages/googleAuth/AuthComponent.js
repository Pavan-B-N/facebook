import app from "./firebaseConfig";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function GoogleAuth() {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const Login = async () => {
    const response = await signInWithPopup(firebaseAuth, provider);
    console.log(response);
  };
  return (
    <div className="App">
      <button 
      disabled
      className="google"
      onClick={Login}>Login with Google</button>
    </div>
  );
}
