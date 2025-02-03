import { UserDB } from "@/types/users";
import React from "react";

interface AddUserModalProps {
  isAddingUser: boolean;
  userSearchQuery: string;
  setUserSearchQuery: (value: string) => void;
  handleUserSearch: () => void;
  searchResults: UserDB[];
  setSelectedUser: (user: UserDB) => void;
  selectedUser: UserDB | null;
  handleAddUser: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  isAddingUser,
  userSearchQuery,
  setUserSearchQuery,
  handleUserSearch,
  searchResults,
  setSelectedUser,
  selectedUser,
  handleAddUser,
}) => {
  if (!isAddingUser) return null;

  return (
    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
      <h3 className="text-lg font-bold mb-2">Add User to Trip</h3>
      <input
        type="text"
        value={userSearchQuery}
        onChange={(e) => setUserSearchQuery(e.target.value)}
        className="w-full p-2 border rounded-md mb-2"
        placeholder="Search users by name or email"
      />
      <button onClick={handleUserSearch} className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Search
      </button>

      <ul className="mt-4">
        {searchResults.map((user) => (
          <li
            key={user.id}
            className="p-2 border rounded-md mb-2 cursor-pointer hover:bg-gray-200"
            onClick={() => setSelectedUser(user)}
          >
            {user.name} ({user.email})
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div className="mt-4">
          <button onClick={handleAddUser} className="bg-green-500 text-white px-4 py-2 rounded-md">
            Add {selectedUser.name} to Trip
          </button>
        </div>
      )}
    </div>
  );
};

export default AddUserModal;