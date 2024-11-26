import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function accessDenied() {
  return (
    <main className="flex justify-center flex-col w-full">
      <h2 className="flex justify-center text-orange-500 font-bold mb-2.5">
        OOPS!
      </h2>
      <div class="relative bg-gray-100 min-h-screen flex items-center justify-center">
        {/* <!-- Background asymmetric card --> */}
        <div class="absolute w-[90%] max-w-4xl h-[80%] bg-blue-300 rounded-tl-none rounded-tr-3xl rounded-bl-3xl rounded-br-3xl shadow-xl"></div>

        {/* <!-- First foreground card --> */}
        <div class="relative w-80 h-56 bg-white rounded-3xl shadow-lg p-6 flex items-center justify-center transform translate-x-6 translate-y-6 z-10">
          <p class="text-gray-800 text-lg font-bold">Foreground Card 1</p>
        </div>

        {/* <!-- Second foreground card (offset but more spacing) --> */}
        <div class="relative w-80 h-56 bg-white rounded-3xl shadow-lg p-6 flex items-center justify-center transform translate-x-12 translate-y-12 z-10">
          <p class="text-gray-800 text-lg font-bold">Foreground Card 2</p>
        </div>

        {/* <!-- Topmost card (centered) --> */}
        <div class="absolute w-72 h-48 bg-yellow-100 rounded-3xl shadow-2xl p-4 flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <p class="text-gray-800 text-lg font-bold">Topmost Card</p>
        </div>
      </div>

      {/*   <div className="relative bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="w-96 h-64 bg-green-500 text-white flex items-center justify-center rounded-tl-none rounded-tr-3xl rounded-bl-3xl rounded-br-3xl">
          <p className="text-lg font-bold">Rounded Corners</p>
        </div>
      </div> */}
    </main>
  );
}

{
  /* <div className="flex justify-center p-4">
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

  <div class="relative bg-gray-100 min-h-screen flex items-center justify-center">
        <!-- Background asymmetric card -->
        <div class="absolute w-96 h-64 bg-blue-300 rounded-tl-none rounded-tr-3xl rounded-bl-3xl rounded-br-3xl transform translate-x-4 translate-y-6"></div>

        Foreground card
        <div class="relative w-80 h-56 bg-white rounded-3xl shadow-lg p-6 flex items-center justify-center">
          <p class="text-gray-800 text-lg font-bold">Foreground Card</p>
        </div>
      </div>*/
}
