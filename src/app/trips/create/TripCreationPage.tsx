import TripCreationForm from "./TripCreationForm";
import { useRouter } from "next/navigation";

const TripsPage = () => {
  const router = useRouter();

  const handleTripCreated = (tripId: string) => {
    router.push(`/trips/${tripId}/details`)
  };

  return (
    <div className="p-6 dark:bg-gray-900">
      <div className="container mx-auto flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6">Start planning your trip</h1>
        <TripCreationForm onTripCreated={handleTripCreated} />
      </div>
    </div>
  );
};

export default TripsPage;