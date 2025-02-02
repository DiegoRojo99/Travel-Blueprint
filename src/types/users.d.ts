export type UserDB = {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  providers: string[];
  createdAt: FirebaseFirestore.Timestamp;
};

export type AuthUser = {
  uid: string;
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
  providerData: { providerId: string }[];
};