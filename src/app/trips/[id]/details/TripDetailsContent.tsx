import { use, useCallback, useEffect, useState } from 'react';
import { Trip } from '@/types/trip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import Itinerary from '@/components/itinerary/Itinerary';
import { GoogleSearchResult, StopWithDetails } from '@/types/search';
import PlaceSection from '@/components/places/PlaceSection';
import Loader from '@/components/loaders/Loader';
import { UserDB } from '@/types/users';
import { useAuth } from '@/hooks/useAuth';
import { sendRequestWithToken } from '@/lib/api';
import DateSelector from './components/DateSelector';
import TripDestinations from './components/TripDestinations';

const TripDetailsContent = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const {user, getToken} = useAuth();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState<null | UserDB>(null);
  
  const memoizedGetToken = useCallback(() => getToken(), [getToken]);
  useEffect(() => {
    const fetchTrip = async () => {
      
      if (!user) {
        console.log('User not authenticated');
        return;
      }

      try {
        const data = await sendRequestWithToken(`/api/trips/${id}`, memoizedGetToken, {
          method: 'GET',
        });
        
        setTrip(data);
        setStartDate(data.startDate);
        setEndDate(data.endDate);
      } catch (error) {
        console.error('Error fetching trip:', error);
      }
    };

    fetchTrip();
  }, [id, user]);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSaveChanges = async () => {
    try {
      const updatedTrip = {
        name: trip?.name,
        startDate,
        endDate,
        destinations: trip?.destinations,
      };

      const response = await fetch(`/api/trips/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTrip),
      });

      if (!response.ok) {
        throw new Error('Failed to update the trip');
      }

      const updatedData = await response.json();
      setTrip(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating trip:', error);
      alert('Failed to update the trip. Please try again.');
    }
  };

  const handleDateChange = (dateType: 'start' | 'end', date: string) => {
    if (dateType === 'start') {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  const handleUserSearch = async () => {
    try {
      const response = await fetch(`/api/users/search?query=${userSearchQuery}`);
      if (!response.ok) {
        throw new Error('Failed to search users');
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const handleAddUser = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch(`/api/trips/${id}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: selectedUser.id, tripId: trip?.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to add user to the trip');
      }

      const updatedTrip = await response.json();
      setTrip(updatedTrip);
      setIsAddingUser(false);
      alert('User added successfully!');
    } catch (error) {
      console.error('Error adding user to trip:', error);
      alert('Failed to add user to the trip.');
    }
  };

  if (!trip) return <Loader />;
  return (
    <div className="relative p-2 sm:p-4 bg-cover bg-center bg-gray-800 h-full">
      <div className="relative z-2 text-black bg-white p-4 sm:p-6 rounded-lg">
        {/* Trip Details */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              {isEditing ? (
                <input
                  type="text"
                  value={trip.name}
                  onChange={(e) => setTrip({ ...trip, name: e.target.value })}
                  className="bg-transparent border-b-2 border-white text-xl sm:text-3xl"
                />
              ) : (
                trip.name
              )}
            </h1>
          </div>
          <div>
            <FontAwesomeIcon icon={faPencil} size="lg" className="cursor-pointer" onClick={handleEditToggle} />
          </div>
        </div>

        <DateSelector
          startDate={startDate}
          endDate={endDate}
          isEditing={isEditing}
          handleDateChange={handleDateChange}
          trip={trip}
        />

        <TripDestinations 
          trip={trip} 
          setIsAddingUser={setIsAddingUser} 
          isAddingUser={isAddingUser} 
        />

        {/* Add User Modal */}
        {isAddingUser && (
          <div className="mt-4 bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Add User to Trip</h3>
            <input
              type="text"
              value={userSearchQuery}
              onChange={(e) => setUserSearchQuery(e.target.value)}
              className="w-full p-2 border rounded-md mb-2"
              placeholder="Search users by name or email"
            />
            <button
              onClick={handleUserSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Search
            </button>

            <ul className="mt-4">
              {searchResults.map((user: UserDB) => (
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
                <button
                  onClick={handleAddUser}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Add {selectedUser.name} to Trip
                </button>
              </div>
            )}
          </div>
        )}

        {/* Edit Buttons */}
        {isEditing && (
          <div className="mt-6">
            <button onClick={handleSaveChanges} className="bg-blue-500 text-white px-6 py-2 rounded-md">
              Save Changes
            </button>
            <button onClick={handleEditToggle} className="bg-gray-500 text-white px-6 py-2 rounded-md ml-4">
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Components */}
      <PlaceSection
        trip={trip}
        onPlaceAdded={(selectedPlace: GoogleSearchResult) =>
          setTrip({ ...trip, places: [...(trip.places || []), selectedPlace] })}
        onStopAdded={(selectedStop: StopWithDetails) =>
          setTrip({ ...trip, stops: [...(trip.stops || []), selectedStop] })}
      />
      <Itinerary trip={trip} />
    </div>
  );
};

export default TripDetailsContent;