//import { notFound } from "next/navigation";
import { db } from "@/db";
//import Link from "next/link";

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
  return <div>Show profile for{userProfile.username}</div>;
}
