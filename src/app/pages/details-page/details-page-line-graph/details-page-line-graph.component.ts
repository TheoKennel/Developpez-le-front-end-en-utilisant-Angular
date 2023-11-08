import {Component, OnInit} from '@angular/core';
import {Participation} from "../../../core/models/Participation";
import {DetailsPageComponent} from "../details-page.component";

@Component({
  selector: 'app-details-page-line-graph',
  templateUrl: './details-page-line-graph.component.html',
  styleUrls: ['./details-page-line-graph.component.scss']
})
export class DetailsPageLineGraphComponent implements OnInit{
  dataLineGraph!: { name: string, series: { value: number, name: number }[] }[]
  participation!: Participation[]

  // ----- Graph Settings -----
  view: [number, number] = [700, 300]
  legend = false
  xAxis = true
  yAxis = true
  autoScale = true
  roundDomains = false
  showXAxisLabel = true
  xAxisLabel = "Date"
  xAxisTicks : number[] = []

  constructor(private detailsInfo: DetailsPageComponent) {
  }

  ngOnInit() {
    this.participation = this.detailsInfo.participationDetails
    this.getYearForGraph()
    this.getDataForLineGraph()
    this.dataLineGraph = this.getDataForLineGraph()
  }

  getYearForGraph() {
    return this.xAxisTicks = this.participation.map(element => element.year)
  }
  getDataForLineGraph() {
    return [
      {
          name: this.detailsInfo.countryName ?? "unknow",
          series: this.participation.map(data => ({
          value: data.medalsCount,
          name:data.year,
        }))
      }
    ]
  }
}
