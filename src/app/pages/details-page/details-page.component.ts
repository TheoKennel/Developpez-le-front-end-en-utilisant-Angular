import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OlympicService} from "../../core/services/olympic.service";
import {OlympicCountry} from "../../core/models/Olympic";
import {Subscription, takeUntil} from "rxjs";
import {Participation} from "../../core/models/Participation";
import {BreakpointService} from "../../core/services/breakpoint.service";
import {HomeComponent} from "../home/home.component";

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit, OnDestroy {

  countryName!: string | null
  totalMedails!: number
  totalAthlete!: number
  screenSize !: string;
  countryData!: OlympicCountry
  participationDetails!: Participation[]
  private subscription = new Subscription()

  constructor(private route: ActivatedRoute,
              private olympicService: OlympicService,
              private router: Router,
              private breakpointService: BreakpointService) {
  }

  ngOnInit() {
    this.countryName = this.route.snapshot.paramMap.get('country')
    this.getOlympicCountryData()
    this.participationDetails = this.countryData.participations
    this.getMedalsTotal()
    this.getTotalAthlete()
    this.responsiveBreakpoint()
  }

  onClickBack() {
    this.router.navigateByUrl('')
  }

  private getOlympicCountryData() {
    const olympicCountryDataSubscription = this.olympicService.getOlympicByCountry(this.countryName)
      .subscribe(data => {
        if (data) {
          this.countryData = data
        } else {
          console.log("No country data retrieved")
        }
      })
    this.subscription.add(olympicCountryDataSubscription)
  }

  private responsiveBreakpoint() {
    const responsiveSubscription = this.breakpointService.screenSize$
      .subscribe(screenSize => this.screenSize = screenSize)
    this.subscription.add(responsiveSubscription)
  }

  private getMedalsTotal() {
    return this.totalMedails = this.participationDetails.reduce((acc, ele) => ele.medalsCount + acc, 0);
  }

  private getTotalAthlete() {
    return this.totalAthlete = this.participationDetails.reduce((acc, ele) => ele.athleteCount + acc, 0);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
