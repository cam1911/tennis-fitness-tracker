import { useSession } from "next-auth/react";
import Image from "next/image";

const ProfileIcon = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    // Extract initials from the user's name
    const initials = session.user.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();

    return (
      <div className="w-12 h-12 flex items-center justify-center border-2 border-blue-400 rounded-full text-blue-400 font-bold text-lg">
        {initials}
      </div>
    );
  }

  return (
    <Image
      src="/user-placeholder.png" // Generic user icon
      alt="Profile Icon"
      width={40}
      height={40}
    />
  );
};

export default ProfileIcon;
