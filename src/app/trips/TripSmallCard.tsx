import { Trip } from "@/types/trip";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMapPin } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

const TripSmallCard = ({ trip }: { trip: Trip }) => (
  <Link href={`/trips/${trip.id}/details`}>
    <div
      key={trip.id}
      className="bg-gray-100 p-4 rounded shadow-md flex flex-col text-black transform transition-transform hover:-translate-y-2 hover:shadow-lg"
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
  </Link>
);

export default TripSmallCard;