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

interface Trip {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  destination: string;
  stops: Stop[] | undefined;
  bookmarks: GoogleSearchResult[] | undefined;
}

interface TripFormState {
  name: string;
  startDate: string;
  endDate: string;
  destination: string;
}

export {
  Stop,
  Trip,
  TripFormState
};