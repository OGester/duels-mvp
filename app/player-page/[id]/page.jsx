import { db } from "@/db";
import Modal from "@/components/Modal";

export default async function ShowUserProfile(props) {
  console.log("PROPS:", props);
  const userProfile = await db.user.findUnique({
    where: {
      user_id: props.params.userId,
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

  if (!userProfile) {
    console.log("User not found");
    return null;
  }
  console.log("UserProfile:", userProfile);
  return (
    <div>
      <Modal />
      <div>Show profile for{userProfile.username}</div>
    </div>
  );
}
