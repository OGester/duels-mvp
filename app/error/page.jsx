import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function accessDenied() {
  return (
    <div className="flex flex-col justify-center w-1/2 p-6">
      <h2 className="flex justify-center text-orange-500 font-bold mb-2.5">
        OOPS!
      </h2>
      <div className="flex justify-center p-4">
        <Card className="flex flex-col justify-center border-4 border-orange-300 w-auto">
          <CardContent>
            <div className="grid w-full items-center gap-4 mt-6">
              <div className="flex flex-col space-y-1.5">
                <h2 className="text-orange-400">You´re OB buddy!</h2>
                <div className="flex justify-center">
                  <p>Admin credentials is required</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center py-2 text-xs">
              <span>
                <Link
                  className="text-orange-400 font-bold underline"
                  href="/profile-page"
                >
                  Go Back
                </Link>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
