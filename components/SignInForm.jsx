"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { signInAction } from "@/app/sign-in/actions";
import { useFormState } from "../lib/hooks";

export default function SignInForm() {
  const [state, handleSubmit] = useFormState(signInAction);

  return (
    <div className="flex flex-col justify-center w-auto p-6">
      <h2 className="flex justify-center text-black font-bold mb-2.5">
        Tjing Duels
      </h2>
      <p className="flex justify-center mb-4">Sign in below</p>
      <div className="flex justify-center p-4">
        <Card className="flex flex-col justify-center border-4 border-orange-300 w-1/4">
          <CardContent>
            <form onSubmit={handleSubmit} className="">
              <div className="grid w-full items-center gap-4 mt-6">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="emailField">Email</Label>
                  <Input
                    id="emailField"
                    name="email"
                    type="email"
                    placeholder="Enter your Email"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
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
                    Sign-in
                  </Button>
                </div>
              </div>
            </form>
            <div className="flex justify-center py-2 text-xs">
              <span>
                New player?
                <Link className="text-orange-400" href="/register">
                  {" "}
                  Sign up
                </Link>{" "}
                here!
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
