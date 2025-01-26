import { City } from "./cities";
import { LocationAPI } from "./googleAPI";
import { GoogleSearchResult, StopWithDetails } from "./search";

interface Stop {
  name: string;
  date: string;
  type: string;
  location: LocationAPI | undefined;
  notes: string;
}

interface TripDocument {
  name: string;
  startDate: string;
  endDate: string;
  destinations: City[];
  stops: StopWithDetails[] | undefined;
  places: GoogleSearchResult[] | undefined;
}

interface Trip {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  destinations: City[];
  stops: StopWithDetails[] | undefined;
  places: GoogleSearchResult[] | undefined;
}

interface TripFormState {
  name: string;
  startDate: string;
  endDate: string;
  destinations: City[];
}

export {
  Stop,
  TripDocument,
  Trip,
  TripFormState
};