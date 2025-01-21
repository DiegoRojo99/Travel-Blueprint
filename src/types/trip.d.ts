import { GoogleSearchResult } from "./search";

interface Location {
  lat: number;
  lng: number;
}

interface Stop {
  name: string;
  date: string;
  type: string;
  location: Location | undefined;
  notes: string;
}

interface TripDocument {
  name: string;
  startDate: string;
  endDate: string;
  destination: string;
  stops: Stop[] | undefined;
  places: GoogleSearchResult[] | undefined;
}

interface Trip {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  destination: string;
  stops: Stop[] | undefined;
  places: GoogleSearchResult[] | undefined;
}

interface TripFormState {
  name: string;
  startDate: string;
  endDate: string;
  destination: string;
}

export {
  Stop,
  TripDocument,
  Trip,
  TripFormState
};