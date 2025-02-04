import { UserDB } from "@/types/users";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface AddUserModalProps {
  userSearchQuery: string;
  setUserSearchQuery: (value: string) => void;
  handleUserSearch: () => void;
  searchResults: UserDB[];
  setSelectedUser: (user: UserDB) => void;
  selectedUser: UserDB | null;
  handleAddUser: () => void;
  closeModal: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  userSearchQuery,
  setUserSearchQuery,
  handleUserSearch,
  searchResults,
  setSelectedUser,
  selectedUser,
  handleAddUser,
  closeModal,
}) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-20" onClick={closeModal}>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-92 sm:w-96 relative z-30" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center pb-4 mb-2">
          <h3 className="text-lg font-bold">Add User to Trip</h3>
          <FontAwesomeIcon icon={faX} size="lg" onClick={closeModal} />
        </div>
        <input
          type="text"
          value={userSearchQuery}
          onChange={(e) => setUserSearchQuery(e.target.value)}
          className="w-full p-2 border rounded-md mb-2"
          placeholder="Search users by name or email"
        />
        <button onClick={handleUserSearch} className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">
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
            <button onClick={handleAddUser} className="bg-green-500 text-white px-4 py-2 rounded-md w-full">
              Add {selectedUser.name} to Trip
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddUserModal;