"use client";
import "@/styles/signIn.css";
import Link from "next/link";

import { signInAction } from "@/app/sign-in/actions";
import { useFormState } from "../lib/hooks";

export default function SignInForm() {
  const [state, handleSubmit] = useFormState(signInAction);

  return (
    <main className="main-container">
      <div className="title-container">
        <h2 className="page-title">MY LEAGUES</h2>
      </div>
      <div className="landing-page">
        <div className="form-card">
          <h2 className="form-title">Sign in below!</h2>
          <div className="form-wrapper">
            <div className="form-box">
              <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                  <label htmlFor="emailField" className="form-label">
                    Email
                  </label>
                  <input
                    id="emailField"
                    name="email"
                    type="email"
                    className="email-input"
                    placeholder="Enter your Email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="passwordField" className="form-label">
                    Password
                  </label>
                  <input
                    id="passwordField"
                    name="password"
                    type="password"
                    className="password-input"
                    placeholder="Enter password"
                  />
                </div>
              </form>
              {Boolean(state.error) && (
                <p className="text-red-700">{state.error.message}</p>
              )}
            </div>
          </div>
          <div className="cta-section">
            <button className="sign-in-button" type="submit">
              Sign In
            </button>
            <button>
              <Link className="register" href="/register">
                New player?
              </Link>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

{
  /* 
              
               
                
            </div> */
}
