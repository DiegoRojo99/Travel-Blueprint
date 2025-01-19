import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trip } from '@/types/trip';

const TripDetailsContent = ({ params }: { params: Promise<{ id: string }>  }) => {
  const { id } = use(params);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await fetch(`/api/trips/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch trip');
        }
        const data = await res.json();
        setTrip(data);
      } catch (error) {
        console.error('Error fetching trip:', error);
        router.push('/trips');
      }
    };

    fetchTrip();
  }, [id, router]);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSaveChanges = async () => {
    // Add save logic here
    console.log('Save changes');
    setIsEditing(false);
  };

  if (!trip) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Trip Details</h1>
      <div>
        <label>Trip Name:</label>
        <input
          type="text"
          value={trip.name}
          readOnly={!isEditing}
          className="border rounded p-2 mb-4"
        />
      </div>
      {/* <div>
        <label>Description:</label>
        <textarea
          value={trip.description}
          readOnly={!isEditing}
          className="border rounded p-2 mb-4"
        />
      </div> */}
      {/* Add more fields as needed */}
      <div className="mt-4">
        {isEditing ? (
          <>
            <button onClick={handleSaveChanges} className="bg-blue-500 text-white px-4 py-2 rounded">
              Save Changes
            </button>
            <button onClick={handleEditToggle} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">
              Cancel
            </button>
          </>
        ) : (
          <button onClick={handleEditToggle} className="bg-green-500 text-white px-4 py-2 rounded">
            Edit Trip
          </button>
        )}
      </div>
    </div>
  );
};

export default TripDetailsContent;
