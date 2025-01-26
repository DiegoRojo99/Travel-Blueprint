import { Trip } from "@/types/trip";
import { format } from "date-fns";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMapPin } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";

const TripSmallCard = ({ trip }: { trip: Trip }) => (
  <Link href={`/trips/${trip.id}/details`}>
    <div
      key={trip.id}
      className="bg-gray-100 p-4 rounded shadow-md flex flex-col text-black transform transition-transform hover:-translate-y-2 hover:shadow-lg"
    >
      <span className="font-semibold text-center">{trip.name}</span>
      <span className="mt-2">
        <FontAwesomeIcon icon={faCalendar} size="sm" className="text-gray-500 mr-1" />
        {format(trip.startDate, 'MMM d')} - {format(trip.endDate, 'MMM d')}
      </span>
      <span>
        <FontAwesomeIcon icon={faMapPin} size="1x" className="text-gray-500 mr-1" />
        {trip.destinations?.join(', ')}
      </span>
    </div>
  </Link>
);

export default TripSmallCard;