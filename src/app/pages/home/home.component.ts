import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, Observable, Subject, takeUntil} from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import {OlympicCountry} from "../../core/models/Olympic";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<OlympicCountry[]> | undefined

  numberOfJo !: number
  numberOfCountry !: number

  private destroy$ = new Subject<void>();
  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.getNumberOfCountry()
    this.getNumberOfJo()
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

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
