import { Trip } from "@/types/trip";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMapPin } from '@fortawesome/free-solid-svg-icons';

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

const TripSmallCard = ({ trip }: { trip: Trip }) => (
  <div
    key={trip.id}
    className="bg-gray-100 p-4 rounded shadow-md flex flex-col text-black"
  >
    <span className="font-semibold text-center">{trip.name}</span>
    <span className="mt-2">
      <FontAwesomeIcon icon={faCalendar} size="sm" className="text-gray-500 mr-1" />
      {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
    </span>
    <span>
      <FontAwesomeIcon icon={faMapPin} size="1x" className="text-gray-500 mr-1" />
      {trip.destination}
    </span>
  </div>
);

export default TripSmallCard;