import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityBarsHealthComponent } from './entity-bars-health.component';

describe('EntityBarsHealthComponent', () => {
  let component: EntityBarsHealthComponent;
  let fixture: ComponentFixture<EntityBarsHealthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityBarsHealthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityBarsHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
