"use client";

import { signInAction } from "@/app/sign-in/actions";
import { useFormState } from "../lib/hooks";

export default function SignInForm() {
  const [state, handleSubmit] = useFormState(signInAction);

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="">
        <label htmlFor="emailField" className="">
          Email
        </label>
        <input
          id="emailField"
          name="email"
          type="email"
          placeholder="Email"
          className=""
        />
      </div>
      <div className="">
        <label htmlFor="passwordField" className="">
          Password
        </label>
        <input
          id="passwordField"
          name="password"
          type="password"
          placeholder="Enter password"
          className=""
        />
      </div>
      {Boolean(state.error) && (
        <p className="text-red-700">{state.error.message}</p>
      )}
      <div className="flex justify-center py-2">
        <button className="border px-4 py-1 rounded" type="submit">
          Logga in
        </button>
      </div>
    </form>
  );
}
