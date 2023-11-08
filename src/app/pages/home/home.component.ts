import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, Observable, Subject, Subscription, takeUntil} from 'rxjs';
import {OlympicService} from 'src/app/core/services/olympic.service';
import {OlympicCountry} from "../../core/models/Olympic";
import {BreakpointService} from "../../core/services/breakpoint.service";

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

  constructor(private olympicService: OlympicService,
              private breakpointService: BreakpointService) {
  }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.getNumberOfCountry()
    this.getNumberOfJo()
    this.responsiveBreakpoint()
  }

  private getNumberOfCountry() {
    const subscribeFcCountry = this.olympics$?.pipe(
      map(data => data.length),
    ).subscribe(length => this.numberOfCountry = length
    )
    this.subscription.add(subscribeFcCountry)
  }

  private getNumberOfJo() {
    const subscribeFcJo = this.olympics$?.pipe(
      map(data => data.length),
    ).subscribe(length => this.numberOfJo = length)
    this.subscription.add(subscribeFcJo)
  }

  private responsiveBreakpoint() {
    const subscribeResponsive = this.breakpointService.screenSize$
      .subscribe(screenSize => this.screenSize = screenSize)
    this.subscription.add(subscribeResponsive)
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
