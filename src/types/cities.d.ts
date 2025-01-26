import { LocationAPI, PhotoAPI } from "./googleAPI"

interface CityAPI {
  formatted_address: string,
  geometry: {
    location: LocationAPI,
    viewport: { northeast: object, southwest: object}
  },
  icon: string,
  icon_background_color: string,
  icon_mask_base_uri: string,
  name: string,
  photos: PhotoAPI[],
  place_id: string,
  reference: string,
  types: string[]
}

interface City {
  id: string,
  name: string,
  location: LocationAPI,
  image: string?,
}

export {
  CityAPI,
  City
}