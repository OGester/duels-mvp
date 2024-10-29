export default async function userSettings() {
  //somehow this function makes user in navbar undefined
  //look in to that later,
  //const user = getUserFromSession();

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center">
        <h2>Settings</h2>
      </div>
      <p>Configure your profile settings here</p>
    </div>
  );
}
