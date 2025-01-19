
interface Trip {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  destination: string;
}

interface TripFormState {
  name: string;
  startDate: string;
  endDate: string;
  destination: string;
}

export {
  Trip,
  TripFormState
};