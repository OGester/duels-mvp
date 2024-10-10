"use client";
//change to register action
import { signUpAction } from "@/app/register/actions";
import { useFormState } from "../lib/hooks";

export default function SignUpForm() {
  const [state, handleSubmit] = useFormState(signUpAction);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex">
        <label htmlFor="usernameField" className="shrink-0 w-32">
          Username
        </label>
        <input
          id="usernameField"
          name="username"
          type="text"
          className="text-slate-800 border px-2 py-1 rounded w-full"
        />
      </div>
      <div className="flex">
        <label htmlFor="emailField" className="shrink-0 w-32">
          Email
        </label>
        <input
          id="emailField"
          name="email"
          type="email"
          className="text-slate-800 border px-2 py-1 rounded w-full"
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
          className="text-slate-800 border px-2 py-1 rounded w-full"
        />
      </div>
      {Boolean(state.error) && (
        <p className="text-red-700">{state.error.message}</p>
      )}
      <button classNAme="border px-2 py-1 rounded" type="submit">
        Logga in
      </button>
    </form>
  );
}
