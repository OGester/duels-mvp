import { db } from "@/db";

export default async function ShowUserProfile(props) {
  console.log("PROPS:", props);
  const fullUserProfile = await db.user.findUnique({
    where: {
      user_id: props.params.id,
    },
    select: {
      username: true,
      email: true,
      profile: {
        select: {
          profile_image_url: true,
          description: true,
          score: true,
        },
      },
    },
  });

  if (!fullUserProfile) {
    console.log("User not found");
    return null;
  }
  console.log("Owner userProfile:", fullUserProfile);
  return (
    <div>
      <div>
        Show profile for <span>{fullUserProfile.username}</span>
      </div>
    </div>
  );
}
