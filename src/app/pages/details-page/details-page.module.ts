import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsPageRoutingModule } from './details-page-routing.module';
import { DetailsPageComponent } from './details-page.component';
import { DetailsPageLineGraphComponent } from './details-page-line-graph/details-page-line-graph.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";


@NgModule({
  declarations: [
    DetailsPageComponent,
    DetailsPageLineGraphComponent
  ],
  imports: [
    CommonModule,
    DetailsPageRoutingModule,
    NgxChartsModule
  ]
})
export class DetailsPageModule { }
