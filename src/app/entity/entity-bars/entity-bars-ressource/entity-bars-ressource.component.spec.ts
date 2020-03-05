import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityBarsRessourceComponent } from './entity-bars-ressource.component';

describe('EntityBarsRessourceComponent', () => {
  let component: EntityBarsRessourceComponent;
  let fixture: ComponentFixture<EntityBarsRessourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityBarsRessourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityBarsRessourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
