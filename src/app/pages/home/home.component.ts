import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, Observable, Subject, takeUntil} from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import {OlympicCountry} from "../../core/models/Olympic";
import {BreakpointService} from "../../core/services/breakpoint.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<OlympicCountry[]> | undefined

  numberOfJo !: number;
  numberOfCountry !: number;
  screenSize !: string;

  private destroy$ = new Subject<void>();
  constructor(private olympicService: OlympicService,
              private breakpointService: BreakpointService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.getNumberOfCountry()
    this.getNumberOfJo()
    this.responsiveBreakpoint()
  }

  getNumberOfCountry() {
    this.olympics$?.pipe(
      map(data => data.length),
      takeUntil(this.destroy$),
    ).subscribe(length => this.numberOfCountry = length
    )
  }

  getNumberOfJo() {
    this.olympics$?.pipe(
      map(data => data.length),
      takeUntil(this.destroy$),
    ).subscribe(length => this.numberOfJo = length)
  }

  responsiveBreakpoint() {
    this.breakpointService.screenSize$.pipe(
       takeUntil(this.destroy$))
      .subscribe(screenSize => this.screenSize = screenSize)
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
