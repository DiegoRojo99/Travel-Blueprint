import { TripUser } from "@/types/trip";
import { UserDB } from "@/types/users";

/**
 * Convert UserDB to TripUser format.
 * @param userData - The UserDB object to be converted.
 * @param role - The role to be assigned to the user in the trip.
 * @returns {TripUser} The mapped TripUser object.
 */
export const UserToTripUserDTO = (userData: UserDB, role: 'Owner' | 'Member' | 'Viewer'): TripUser => {
  return {
    uid: userData.id,
    displayName: userData.name,
    photoURL: userData.profilePicture,
    email: userData.email,
    role: role,
  };
};
