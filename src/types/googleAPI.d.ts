interface LocationAPI {
  lat: number,
  lng: number,
}

interface PhotoAPI {
  height: number,
  html_attributions: string[],
  photo_reference: string,
  width: number
}

export {
  LocationAPI,
  PhotoAPI,
}