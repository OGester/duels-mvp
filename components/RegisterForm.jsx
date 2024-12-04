"use client";
import "@/styles/register.css";
import { Card, CardContent } from "@/components/ui/card";

//change to register action for readability?
import { signUpAction } from "@/app/register/actions";
import { useFormState } from "../lib/hooks";

//Maybe refactor to use navlink instead of link?
import Link from "next/link";

export default function SignUpForm() {
  const [state, handleSubmit] = useFormState(signUpAction);

  return (
    <main className="main-container">
      <div className="title-container">
        <h2 className="page-title">LEAGUES r US</h2>
      </div>
      <div className="landing-page">
        <div className="form-card">
          <div className="form-title-container">
            <h2 className="form-title">Register here</h2>
          </div>
          <div className="form-wrapper">
            <div className="form-box">
              <div className="form">
                <form onSubmit={handleSubmit}>
                  <div className="grid w-full items-center gap-4 mt-6">
                    <div className="form-group">
                      <label htmlFor="usernameField" className="form-label">
                        Username
                      </label>
                      <input
                        id="usernameField"
                        name="username"
                        type="text"
                        className="username-input"
                        placeholder="Enter a username"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="emailField" className="form-label">
                        Email
                      </label>
                      <input
                        id="emailField"
                        name="email"
                        type="email"
                        className="email-input"
                        placeholder="Enter your email"
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
                    {Boolean(state.error) && (
                      <p className="text-red-700">{state.error.message}</p>
                    )}
                    <div className="button-container">
                      <button className="sign-up-button" type="submit">
                        Register
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="cta-section">
              <span className="text-sm text-gray-500">Already registered?</span>
              <Link className="text-[#84b6ad]" href="/sign-in">
                sign-in
              </Link>{" "}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
