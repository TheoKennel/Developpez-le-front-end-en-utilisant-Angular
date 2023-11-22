import {Participation} from "./Participation";

// Classe modélisant un pays olympique.
export class OlympicCountry {
  constructor(
    public id: number,
    public country: string,
    public participations: Participation[]
  ) {
  }
}


