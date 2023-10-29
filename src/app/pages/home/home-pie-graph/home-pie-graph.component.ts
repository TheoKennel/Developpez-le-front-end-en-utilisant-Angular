import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {OlympicCountry} from "../../../core/models/Olympic";
import {Participation} from "../../../core/models/Participation";
import {OlympicService} from "../../../core/services/olympic.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home-pie-graph',
  templateUrl: './home-pie-graph.component.html',
  styleUrls: ['./home-pie-graph.component.scss']
})


export class HomePieGraphComponent implements OnInit, OnDestroy{

  olympicCountry !: OlympicCountry | undefined;

  olympic!: OlympicCountry[]
  countryParticipation!: Participation[]
    dataGraph!: {}

  constructor(private olympicService: OlympicService,
              private router : Router) {
  }

  ngOnInit() {


        this.olympicService.getOlympics().subscribe(data=> {
          this.olympic = data;
          this.dataGraph = this.olympic.map((olympicCountry, index) => {
            this.countryParticipation = olympicCountry.participations;
            return {
              name : olympicCountry.country,
              value : olympicCountry.participations.reduce((acc, element) => acc + element.medalsCount, 0),
            }
          })
        })

}


ngOnDestroy() {
      this.olympicService
}

    showLegend = false;
    showLabels = true;
    legendPosition = 'right';

    onClickRedirect(country : string) {
        this.olympicCountry = this.olympic.find(olympic => olympic.country === country)
        this.router.navigateByUrl(`/detailsPage/${this.olympicCountry}`)
    }


}
