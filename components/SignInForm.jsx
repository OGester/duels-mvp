"use client";

import { signInAction } from "@/app/sign-in/actions";
import { useFormState } from "../lib/hooks";

export default function SignInForm() {
  const [state, handleSubmit] = useFormState(signInAction);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex">
        <label htmlFor="emailField" className="shrink-0 w-32">
          Email
        </label>
        <input
          id="emailField"
          name="email"
          type="email"
          className="border px-2 py-1 rounded w-full"
        />
      </div>
      <div className="flex">
        <label htmlFor="passwordField" className="shrink-0 w-32">
          Password
        </label>
        <input
          id="passwordField"
          name="password"
          type="password"
          className="border px-2 py-1 rounded w-full"
        />
      </div>
      {Boolean(state.error) && (
        <p className="text-red-700">{state.error.message}</p>
      )}
      <button type="submit">Logga in</button>
    </form>
  );
}
