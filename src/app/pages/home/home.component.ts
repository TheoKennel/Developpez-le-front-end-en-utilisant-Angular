import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, Observable, Subject, Subscription, takeUntil} from 'rxjs';
import {OlympicService} from 'src/app/core/services/olympic.service';
import {OlympicCountry} from "../../core/models/Olympic";
import {BreakpointService} from "../../core/services/breakpoint.service";

/**
 * Composant principal de la page d'accueil
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  numberOfJo !: number;
  numberOfCountry !: number;
  screenSize !: string;

  public olympics$: Observable<OlympicCountry[]> | undefined
  private subscription = new Subscription()

  /**
   * Initialise le composant, récupère les données olympiques et configure le responsive
   */
  constructor(private olympicService: OlympicService,
              private breakpointService: BreakpointService) {
  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.getNumberOfCountry()
    this.getNumberOfJo()
    this.responsiveBreakpoint()
  }

  /**
   * Calcule le nombre total de pays participant aux JO
   */
  private getNumberOfCountry() {
    const subscribeFcCountry = this.olympics$?.pipe(
      map(data => data.length),
    ).subscribe(length => this.numberOfCountry = length
    )
    this.subscription.add(subscribeFcCountry)
  }

  /**
   * Calcule le nombre total d'éditions des JO
   */
  private getNumberOfJo() {
    const subscribeFcJo = this.olympics$?.pipe(
      map(data => data.length),
    ).subscribe(length => this.numberOfJo = length)
    this.subscription.add(subscribeFcJo)
  }

  /**
   * Gère les changements de taille de l'écran pour le responsive design
   */
  private responsiveBreakpoint() {
    const subscribeResponsive = this.breakpointService.screenSize$
      .subscribe(screenSize => this.screenSize = screenSize)
    this.subscription.add(subscribeResponsive)
  }

  /**
   * Nettoie les abonnements lors de la destruction du composant
   */
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
