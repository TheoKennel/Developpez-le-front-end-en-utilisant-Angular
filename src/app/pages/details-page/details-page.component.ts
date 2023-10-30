import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OlympicService} from "../../core/services/olympic.service";
import {OlympicCountry} from "../../core/models/Olympic";
import {find, Observable, Subscription} from "rxjs";
import {Participation} from "../../core/models/Participation";

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit, OnDestroy {


  observableData$!: Subscription
  countryData!: OlympicCountry
  participationDetails!: Participation[]
  totalMedails!: number
  totalAthlete!: number

  constructor(private route: ActivatedRoute,
              private olympicService: OlympicService) {
  }

  ngOnInit() {
    let name = this.route.snapshot.paramMap.get("country")
    this.observableData$ = this.olympicService.getOlympics().subscribe(country => {
      const findCountry = country.find(country => country.country === name)
      if(findCountry) {
        this.countryData = findCountry
        this.participationDetails = this.countryData.participations
        console.log(this.participationDetails)
      }
    })
    // for(let i = 0; i <= this.participationDetails.length; i++) {
    //   totalMedails += this.participationDetails[i].medalsCount
    //   console.log(this.participationDetails[i].medalsCount)
    // }
    this.totalMedails = this.participationDetails.reduce((acc, ele) => ele.medalsCount + acc , 0)
    this.totalAthlete = this.participationDetails.reduce((acc, ele) => ele.athleteCount + acc, 0)
    console.log(this.totalMedails)
    console.log(this.totalAthlete)
    console.log(this.countryData)
  }

  ngOnDestroy() {
    if(this.observableData$) {
      this.observableData$.unsubscribe()
    }
  }
}
