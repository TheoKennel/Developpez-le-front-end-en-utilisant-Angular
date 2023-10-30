import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {OlympicCountry} from "../../../core/models/Olympic";
import {Participation} from "../../../core/models/Participation";
import {OlympicService} from "../../../core/services/olympic.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home-pie-graph',
  templateUrl: './home-pie-graph.component.html',
  styleUrls: ['./home-pie-graph.component.scss']
})


export class HomePieGraphComponent implements OnInit, OnDestroy {

  olympic!: OlympicCountry[]
  countryParticipation!: Participation[]
  dataGraph!: {}
  obervableSubscription$!: Subscription
// Graph Setting
  showLegend = false;
  showLabels = true;
  // legendPosition = 'right';

  constructor(private olympicService: OlympicService,
              private router: Router) {
  }

  ngOnInit() {

    this.obervableSubscription$ = this.olympicService.getOlympics().subscribe(data => {
      console.log('Observable actif');
      this.olympic = data;
      this.dataGraph = this.olympic.map((olympicCountry, index) => {
        this.countryParticipation = olympicCountry.participations;
        return {
          name: olympicCountry.country,
          value: olympicCountry.participations.reduce((acc, element) => acc + element.medalsCount, 0),
        }
      })
    })
  }

  onClickRedirect(country: string) {
    let redirectGraph = this.olympic.find(olympic => olympic.country === country)
    this.router.navigateByUrl(`/detailsPage/${redirectGraph?.country}`)
  }

  ngOnDestroy() {
    if (this.obervableSubscription$) {
      this.obervableSubscription$.unsubscribe()
    }
  }
}
