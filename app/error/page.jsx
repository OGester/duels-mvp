import Link from "next/link";

export default function accessDenied() {
  return (
    <div class="min-h-screen bg-gray-800 flex flex-col items-center justify-center">
      {/* <!-- Navigation --> */}
      <nav class="w-full px-4 py-3 bg-gray-700 flex justify-between items-center">
        <button class="text-purple-400 font-bold">Home</button>
        <div class="flex gap-2">
          <div class="w-8 h-8 bg-teal-300 rounded-full"></div>
          <div class="w-8 h-8 bg-teal-300 rounded-full"></div>
          <div class="w-8 h-8 bg-teal-300 rounded-full"></div>
        </div>
        <button class="text-teal-300 font-bold">Sign-in</button>
      </nav>

      {/* <!-- Registration Section --> */}
      <div class="mt-8 w-[90%] max-w-sm bg-gray-900 rounded-lg shadow-lg p-6">
        {/*  <!-- Register Header --> */}
        <div class="bg-teal-300 text-center text-gray-900 font-bold text-lg py-2 rounded">
          REGISTER
        </div>

        {/*  <!-- Registration Form --> */}
        <form class="mt-4 bg-purple-500 rounded-lg p-6 space-y-4">
          <div>
            <label class="block text-gray-200 text-sm mb-1">Username</label>
            <input
              type="text"
              class="w-full bg-gray-100 text-gray-800 px-3 py-2 rounded focus:outline-none"
            />
          </div>
          <div>
            <label class="block text-gray-200 text-sm mb-1">Email</label>
            <input
              type="email"
              class="w-full bg-gray-100 text-gray-800 px-3 py-2 rounded focus:outline-none"
            />
          </div>
          <div>
            <label class="block text-gray-200 text-sm mb-1">Password</label>
            <input
              type="password"
              class="w-full bg-gray-100 text-gray-800 px-3 py-2 rounded focus:outline-none"
            />
          </div>
        </form>

        {/* <!-- Sign-Up Button --> */}
        <button class="mt-4 w-full bg-teal-300 text-gray-900 font-bold py-2 rounded hover:bg-teal-400">
          SIGN UP
        </button>
      </div>
    </div>
  );
}
