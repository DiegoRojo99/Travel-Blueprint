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
  users: TripUser[];
}

interface TripUser {
  uid: string;
  displayName: string;
  photoURL?: string;
  email?: string;
  role?: 'Owner' | 'Member' | 'Viewer';
}

interface Trip {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  destinations: City[];
  stops?: StopWithDetails[];
  places?: GoogleSearchResult[];
  users: TripUser[];
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
  TripFormState,
  TripUser
};