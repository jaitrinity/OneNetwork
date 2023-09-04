import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphDashbordComponent } from './graph-dashbord.component';

describe('GraphDashbordComponent', () => {
  let component: GraphDashbordComponent;
  let fixture: ComponentFixture<GraphDashbordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphDashbordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
