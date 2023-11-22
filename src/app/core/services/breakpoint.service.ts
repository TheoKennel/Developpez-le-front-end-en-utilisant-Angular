import {Injectable, OnInit} from "@angular/core";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {map, reduce} from 'rxjs/operators'
import {Observable} from "rxjs";


/**
 * Service fournissant des informations sur la taille de l'écran
 */
@Injectable({
  providedIn: 'root'
})

export class BreakpointService {

  /**
   * Constructeur initialisant BreakpointObserver
   * @param breakpointObserver Observateur de points de rupture pour le responsive design
   */
  constructor(private breakpointObserver: BreakpointObserver) {}

  /**
   * Observable émettant la taille actuelle de l'écran
   */
  screenSize$: Observable<string> = this.breakpointObserver.observe([
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
  ]).pipe(
    map(result => {
      console.log(result)
      if (result.breakpoints[Breakpoints.XSmall]) {
        return 'xsmall';
      } else if (result.breakpoints[Breakpoints.Small]) {
        return 'small';
      } else if (result.breakpoints[Breakpoints.Medium]) {
        return 'medium';
      } else if (result.breakpoints[Breakpoints.Large]) {
        return 'large';
      } else {
        return 'web';
      }
    })
  );
}
