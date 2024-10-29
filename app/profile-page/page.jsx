import { getUserFromSession } from "@/lib/auth";

export default async function userPage() {
  //somehow this function makes user in navbar undefined
  //look in to that later,
  //const user = getUserFromSession();

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center">
        <h2>Welcome</h2>
      </div>

      <p>Ready for some duels?</p>
    </div>
  );
}
