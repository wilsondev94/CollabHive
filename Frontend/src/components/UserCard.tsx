import { User } from "@/state/apiSlice";
import Image from "next/image";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="flex items-center gap-3 rounded border p-4 shadow">
      {user.profilePictureUrl && (
        <Image
          src={`/${user.profilePictureUrl}`}
          alt="Profile Picture"
          width={32}
          height={32}
          className="rounded-full"
        />
      )}
      <div>
        <h3>{user.username}</h3>
        <p>{user.email}</p>
      </div>
    </div>
  );
}
