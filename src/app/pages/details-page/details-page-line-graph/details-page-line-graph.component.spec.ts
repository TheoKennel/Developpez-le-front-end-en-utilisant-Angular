import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPageLineGraphComponent } from './details-page-line-graph.component';

describe('DetailsPageLineGraphComponent', () => {
  let component: DetailsPageLineGraphComponent;
  let fixture: ComponentFixture<DetailsPageLineGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsPageLineGraphComponent]
    });
    fixture = TestBed.createComponent(DetailsPageLineGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
