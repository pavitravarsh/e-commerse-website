import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import app from "./firebaseConfig"; // Import the initialized Firebase app
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Font Awesome Icon
import { faGoogle } from "@fortawesome/free-brands-svg-icons"; // Google Icon
import "./styles/SignIn.css"; // Your CSS for styling

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // For confirming password in sign-up
  const [isNewUser, setIsNewUser] = useState(false); // Track if it's a new user
  const [error, setError] = useState(""); // Track error messages

  // Get the authentication instance from the initialized Firebase app
  const auth = getAuth(app);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isNewUser) {
      // Check if passwords match
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      // Sign up new user with Firebase
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("User signed up:", userCredential.user);
          setError(""); // Clear any previous errors
        })
        .catch((error) => {
          console.error("Error signing up:", error.message);
          setError(error.message);
        });
    } else {
      // Log in existing user
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("User logged in:", userCredential.user);
          setError(""); // Clear any previous errors
        })
        .catch((error) => {
          console.error("Error logging in:", error.message);
          setError(error.message);
        });
    }
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("User signed in with Google:", result.user);
        setError(""); // Clear errors
      })
      .catch((error) => {
        console.error("Error with Google Sign-In:", error.message);
        setError(error.message);
      });
  };

  return (
    <div className="sign-in-container">
      <h2>{isNewUser ? "Sign Up" : "Sign In"}</h2>
      <form onSubmit={handleFormSubmit} autoComplete="on">
        <div className="form-group">
          <label>Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete={isNewUser ? "new-password" : "current-password"}
          />
        </div>
        {isNewUser && (
          <div className="form-group">
            <label>Confirm Password</label>
            <br />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="form-actions">
          <button type="submit">{isNewUser ? "Sign Up" : "Sign In"}</button>
        </div>
      </form>

      {/* Google Sign-In Button with Icon */}
      <div className="form-actions">
        <button onClick={handleGoogleSignIn} className="google-signin-btn">
          <FontAwesomeIcon icon={faGoogle} /> Sign in with Google
        </button>
      </div>

      {/* Toggle between Sign In and Sign Up */}
      <div className="toggle-container">
        <p>{isNewUser ? "Already have an account?" : "New user?"}</p>
        <button
          onClick={() => {
            setIsNewUser(!isNewUser);
            setError(""); // Clear errors when toggling
          }}
        >
          {isNewUser ? "Log In" : "Create Account"}
        </button>
      </div>
    </div>
  );
};

export default SignIn;
