import {Component, OnDestroy, OnInit} from '@angular/core';
import {Participation} from "../../../core/models/Participation";
import {DetailsPageComponent} from "../details-page.component";
import {BreakpointService} from "../../../core/services/breakpoint.service";
import {Subscription} from "rxjs";

/**
 * Composant pour afficher le graphique en ligne des détails de participation
 */
@Component({
  selector: 'app-details-page-line-graph',
  templateUrl: './details-page-line-graph.component.html',
  styleUrls: ['./details-page-line-graph.component.scss']
})
export class DetailsPageLineGraphComponent implements OnInit, OnDestroy {
  dataLineGraph!: { name: string, series: { value: number, name: number }[] }[]
  participation!: Participation[]
  screenSize !: string;
  // ----- Graph Settings -----
  view: [number, number] = [0, 0]
  legend = false
  xAxis = true
  yAxis = true
  autoScale = true
  roundDomains = false
  showXAxisLabel = true
  xAxisLabel = "Date"
  xAxisTicks: number[] = []
  private subscriptions = new Subscription()

  constructor(private detailsInfo: DetailsPageComponent,
              private breakpointService: BreakpointService) {
  }

  /**
   * Initialise le composant et charge les données nécessaires
   */
  ngOnInit() {
    this.participation = this.detailsInfo.participationDetails
    this.getYearForGraph()
    this.getDataForLineGraph()
    this.dataLineGraph = this.getDataForLineGraph()
    this.responsiveBreakpoint()
  }

  /**
   * Calcule les années pour le graphique à partir des données de participation
   */
  private getYearForGraph() {
    return this.xAxisTicks = this.participation.map(element => element.year)
  }

  /**
   * Prépare les données pour le graphique en ligne
   */
  private getDataForLineGraph() {
    return [
      {
        name: this.detailsInfo.countryName ?? "unknow",
        series: this.participation.map(data => ({
          value: data.medalsCount,
          name: data.year,
        }))
      }
    ]
  }

  /**
   * Ajuste la taille du graphique en fonction de la taille de l'écran
   */
  private responsiveBreakpoint() {
    const responsiveSubscription = this.breakpointService.screenSize$
      .subscribe(screenSize => {
        this.screenSize = screenSize
        if (this.screenSize === 'xsmall') {
          this.view = [350, 200]
        } else if (this.screenSize === 'small') {
          this.view = [550, 300]
        } else if (this.screenSize === 'medium') {
          this.view = [650, 400]
        } else if (this.screenSize === 'large') {
          this.view = [750, 450]
        } else {
          this.view = [850, 450]
        }
      })
    this.subscriptions.add(responsiveSubscription)
  }

  /**
   * Nettoie les abonnements lors de la destruction du composant
   */
  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe()
    }
  }
}
