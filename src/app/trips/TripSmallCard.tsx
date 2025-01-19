
interface Trip {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  destination: string;
}

const TripSmallCard = ({ trip }: { trip: Trip }) => (
  <div
    key={trip.id}
    className="bg-gray-100 p-4 rounded shadow-md flex flex-col gap-2 text-black"
  >
    <span className="font-semibold">{trip.name}</span>
    <span>
      {trip.startDate} - {trip.endDate}
    </span>
    <span>{trip.destination}</span>
  </div>
);

export default TripSmallCard;