import { use, useEffect, useState } from 'react';
import { Trip } from '@/types/trip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMapPin, faPencil, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import AddStopForm from './AddStopForm';
import Itinerary from './Itinerary';

const TripDetailsContent = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await fetch(`/api/trips/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch trip');
        }
        const data = await res.json();
        setTrip(data);
        setStartDate(data.startDate);
        setEndDate(data.endDate);
      }
      catch (error) {
        console.error('Error fetching trip:', error);
      }
    };

    fetchTrip();
  }, [id]);

  const handleEditToggle = () => setIsEditing(!isEditing);
  const handleSaveChanges = async () => {
    try {
      const updatedTrip = {
        name: trip?.name,
        startDate,
        endDate,
        destination: trip?.destination,
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

  if (!trip) return <p>Loading...</p>;

  return (
    <div
      className="relative p-2 sm:p-6 bg-cover bg-center bg-gray-800"
      // style={{ backgroundImage: `url('/path/to/your/image.jpg')` }}
    >
      <div className="relative z-2 text-black bg-white p-2 sm:p-6 m-2 sm:m-6 rounded-lg">
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

        <div className="flex items-center space-x-2 mb-2">
          <FontAwesomeIcon icon={faMapPin} size="lg" />
          <span>{trip.destination}</span>
        </div>
        
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faCalendar} size="1x" />
            {isEditing ? (
              <div>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => handleDateChange('start', e.target.value)}
                  className="bg-transparent border-b-2 border-white text-1x sm:text-lg"
                />
                <span className="mx-2">-</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => handleDateChange('end', e.target.value)}
                  className="bg-transparent border-b-2 border-white text-1x sm:text-lg"
                />
              </div>
            ) : (
              <span className="text-1x sm:text-lg">
                {startDate} - {endDate}
              </span>
            )}
          </div>
          <div>
            <FontAwesomeIcon icon={faUserPlus} size="lg" className="cursor-pointer" />
          </div>
        </div>

        <>
          {isEditing ? (
            <div className='mt-6'>
              <button onClick={handleSaveChanges} className="bg-blue-500 text-white px-6 py-2 rounded-md">
                Save Changes
              </button>
              <button onClick={handleEditToggle} className="bg-gray-500 text-white px-6 py-2 rounded-md ml-4">
                Cancel
              </button>
            </div>
          ) : (
            <></>
          )}
        </>
      </div>
      <AddStopForm 
        tripId={trip.id} 
        onStopAdded={(newStop) => setTrip({ ...trip, stops: [...(trip.stops || []), newStop] })} 
      />
      <Itinerary trip={trip} />
    </div>
  );
};

export default TripDetailsContent;