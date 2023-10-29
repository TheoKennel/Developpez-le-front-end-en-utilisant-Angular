import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {

  countryName !: string | null

  constructor(private route : ActivatedRoute) {}

  ngOnInit() {
    this.countryName = this.route.snapshot.paramMap.get("country")
    console.log(this.countryName)
  }
}
