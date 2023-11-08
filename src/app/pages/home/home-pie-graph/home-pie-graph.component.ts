import {Component, OnDestroy, OnInit} from '@angular/core';
import {OlympicCountry} from "../../../core/models/Olympic";
import {Participation} from "../../../core/models/Participation";
import {OlympicService} from "../../../core/services/olympic.service";
import {Router} from "@angular/router";
import {Subscription, takeUntil} from "rxjs";
import {BreakpointObserver} from "@angular/cdk/layout";
import {BreakpointService} from "../../../core/services/breakpoint.service";

@Component({
  selector: 'app-home-pie-graph',
  templateUrl: './home-pie-graph.component.html',
  styleUrls: ['./home-pie-graph.component.scss']
})

export class HomePieGraphComponent implements OnInit, OnDestroy {

  olympic!: OlympicCountry[]
  countryParticipation!: Participation[]
  dataGraph!: {}
  screenSize !: string;
// ---- Graph Setting ----
  showLegend = false;
  showLabels = true;

  private subscriptions = new Subscription()

  constructor(private olympicService: OlympicService,
              private router: Router,
              private breakpointService : BreakpointService) {
  }

  ngOnInit() {
    this.getDataForGraph()
    this.responsiveBreakpoint()
  }

  getDataForGraph() {
    const graphSubscription = this.olympicService.getOlympics().subscribe(data => {
      this.olympic = data;
       this.dataGraph = this.olympic.map((olympicCountry, index) => {
        this.countryParticipation = olympicCountry.participations;
        return {
          name: olympicCountry.country,
          value: olympicCountry.participations.reduce((acc, element) => acc + element.medalsCount, 0),
        }
      })
    })
    this.subscriptions.add(graphSubscription)
  }

  onClickRedirect(country: string) {
    let redirectGraph = this.olympic.find(olympic => olympic.country === country)
    this.router.navigateByUrl(`/detailsPage/${redirectGraph?.country}`)
  }

  setTooltipText(item: any): string {
    return `${item.data.name}   <br> 🏅 ${item.value}`;
  }

  responsiveBreakpoint() {
    const responsiveSubscription = this.breakpointService.screenSize$
      .subscribe(screenSize => this.screenSize = screenSize)
    this.subscriptions.add(responsiveSubscription)
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe()
    }
  }
}
