"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

//change to register action for readability?
import { signUpAction } from "@/app/register/actions";
import { useFormState } from "../lib/hooks";

//Maybe refactor to use navlink instead of link?
import Link from "next/link";

export default function SignUpForm() {
  const [state, handleSubmit] = useFormState(signUpAction);

  return (
    <div className="flex flex-col justify-center w-auto p-6">
      <h2 className="flex justify-center text-black font-bold mb-2.5">
        My Leagues
      </h2>
      <p className="flex justify-center mb-4">Register here to get started</p>
      <div className="flex justify-center p-4">
        <Card className="flex flex-col justify-center border-4 border-orange-300">
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4 mt-6">
                <div className="flex-col space-y-1.5">
                  <Label htmlFor="usernameField">Username</Label>
                  <Input
                    id="usernameField"
                    name="username"
                    type="text"
                    placeholder="Enter a username"
                  />
                </div>
                <div className="flex-col space-y-1.5">
                  <Label htmlFor="emailField">Email</Label>
                  <Input
                    id="emailField"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="flex-col space-y-1.5">
                  <Label htmlFor="passwordField">Password</Label>
                  <Input
                    id="passwordField"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                  />
                </div>
                {Boolean(state.error) && (
                  <p className="text-red-700">{state.error.message}</p>
                )}
                <div className="flex justify-center py-2 text-xs">
                  <Button className="bg-orange-300 text-black" type="submit">
                    Register
                  </Button>
                </div>
                <div className="flex justify-center py-2 text-xs">
                  <span>
                    Already registered?
                    <Link className="text-orange-400" href="/sign-in">
                      {" "}
                      Sign in
                    </Link>{" "}
                    instead!
                  </span>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
