import { TripUser } from "@/types/trip";
import Image from "next/image";

export default function UserProfiles({ users }: {users: TripUser[]}){
  return (
    <div className="flex ml-2 align-center">
      {users?.slice(0, 3).map((user, index) => (
        <Image
          key={index}
          src={user.photoURL ?? ''}
          alt={user.displayName}
          title={user.displayName}
          width={128}
          height={128}
          className="w-8 h-8 rounded-full border-2 border-white -ml-2"
        />
      ))}
      {users?.length > 3 && (
        <span className="text-gray-600 text-sm">+{users.length - 3}</span>
      )}
    </div>
  )
}