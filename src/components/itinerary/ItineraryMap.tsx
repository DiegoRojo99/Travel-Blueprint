import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Trip } from "@/types/trip";

const ItineraryMap = ({ trip }: { trip: Trip}) => {
  const mapContainerStyle = { width: "100%", height: "400px" };
  const defaultCenter = { 
    lat: trip?.destinations?.[0].location.lat || 0, 
    lng: trip?.destinations?.[0].location.lng || 0
  };

  const handleClick = (event: google.maps.MapMouseEvent) => {
    console.log('Clicked on map:', event);
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={5}
        onClick={handleClick}
      >
        {trip.stops?.map((stop) => (
          <Marker key={stop.id} position={{ lat: stop.location.lat, lng: stop.location.lng }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default ItineraryMap;