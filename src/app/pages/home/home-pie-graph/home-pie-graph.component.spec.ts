import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePieGraphComponent } from './home-pie-graph.component';

describe('HomePieGraphComponent', () => {
  let component: HomePieGraphComponent;
  let fixture: ComponentFixture<HomePieGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePieGraphComponent]
    });
    fixture = TestBed.createComponent(HomePieGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
