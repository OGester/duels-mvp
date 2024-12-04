"use client";
import "@/styles/signIn.css";
import { useRef } from "react";
import Link from "next/link";

import { signInAction } from "@/app/sign-in/actions";
import { useFormState } from "../lib/hooks";

export default function SignInForm() {
  const [state, handleSubmit] = useFormState(signInAction);

  return (
    <main className="main-container">
      <div className="title-container">
        <h2 className="page-title">LEAGUE WORLD</h2>
      </div>
      <div className="landing-page">
        <div className="form-card">
          <div className="form-title-container">
            <h2 className="form-title">Sign in below!</h2>
          </div>
          <div className="form-wrapper">
            <div className="form-box">
              <div className="form">
                <form onSubmit={handleSubmit}>
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
                  <div className="button-container">
                    <button className="sign-in-button" type="submit">
                      Sign In
                    </button>
                  </div>
                  {Boolean(state.error) && (
                    <p className="text-red-700">{state.error.message}</p>
                  )}
                </form>
              </div>
            </div>
          </div>
          <div className="cta-section">
            <span className="text-sm text-gray-500">New Player?</span>
            <Link className="text-[#84b6ad]" href="/register">
              Register here!
            </Link>{" "}
          </div>
        </div>
      </div>
    </main>
  );
}
