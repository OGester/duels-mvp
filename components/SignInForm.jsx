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

import { signInAction } from "@/app/sign-in/actions";
import { useFormState } from "../lib/hooks";

export default function SignInForm() {
  const [state, handleSubmit] = useFormState(signInAction);

  return (
    <div className="flex flex-col justify-center w-auto p-20">
      <h2 className="flex justify-center text-black font-bold mb-2.5">
        Duels Sign In
      </h2>
      <Card className="flex flex-col justify-center border-4 border-orange-300">
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
                  className=""
                />
              </div>
              {Boolean(state.error) && (
                <p className="text-red-700">{state.error.message}</p>
              )}
              <div className="flex justify-center py-2">
                <Button className="bg-orange-300 text-black" type="submit">
                  Sign-in
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
