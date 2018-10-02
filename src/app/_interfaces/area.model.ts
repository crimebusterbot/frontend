export interface Area {
  area: Array<AreaPoint>;
  id?: number;
}

interface AreaPoint {
  lat: number;
  lng: number;
}
