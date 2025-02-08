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

interface TripPlace extends GoogleSearchResult { 
  id: string;
};

interface TripDocument {
  name: string;
  startDate: string;
  endDate: string;
  destinations: City[];
  stops: StopWithDetails[] | undefined;
  places: TripPlace[] | undefined;
  users: TripUser[];
  userIds: string[];
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
  places?: TripPlace[];
  users: TripUser[];
  userIds: string[];
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
  TripUser,
  TripPlace
};