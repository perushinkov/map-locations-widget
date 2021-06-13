import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapLocationsComponent } from './map-locations.component';

describe('MapLocationsComponent', () => {
  let component: MapLocationsComponent;
  let fixture: ComponentFixture<MapLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
