import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, map} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {OlympicCountry} from "../models/Olympic";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {

  private olympicUrl = './assets/mock/olympic.json';
  /* BehaviorSubject conservant un tableau initial vide de pays olympiques
  Peut être mis à jour dynamiquement et les abonnés seront notifiés de tout changement. */
  private olympics$ = new BehaviorSubject<OlympicCountry[]>([]);

  constructor(private http: HttpClient) {}

  /**
   * Charge les données initiales des pays olympiques depuis un fichier JSON
   * Met à jour le BehaviorSubject en cas de succès ou d'erreur
   */
  loadInitialData() {
    return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        console.error(error);
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  /**
   * Récupère un Observable des données des pays olympiques
   */
  getOlympics() {
    return this.olympics$.asObservable();
  }

  /**
   * Trouve et retourne les détails d'un pays olympique par son nom.
   * @param countryName Le nom du pays à rechercher.
   */
  getOlympicByCountry(countryName : string | null) {
   return this.getOlympics().pipe(map(olympicCountry =>
     olympicCountry.find(country => country.country === countryName)
   ))
  }
}
