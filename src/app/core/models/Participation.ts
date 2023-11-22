// Classe modélisant les participations d'un pays.
export class Participation {
  constructor(
    public id : string,
    public year : number,
    public city : string,
    public medalsCount : number,
    public athleteCount : number
  ) {}
}
