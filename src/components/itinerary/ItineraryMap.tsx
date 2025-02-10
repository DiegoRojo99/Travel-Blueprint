import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Trip } from "@/types/trip";

const ItineraryMap = ({ trip }: { trip: Trip}) => {
  const mapContainerStyle = { width: "100%", height: "400px" };
  const defaultCenter = { 
    lat: trip?.destinations?.[0].location.lat || 0, 
    lng: trip?.destinations?.[0].location.lng || 0
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={12}
      >
        {trip.stops?.map((stop) => (
          <Marker key={stop.id} position={{ lat: stop.location.lat, lng: stop.location.lng }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default ItineraryMap;