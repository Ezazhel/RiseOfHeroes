import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityBarsComponent } from './entity-bars.component';

describe('EntityBarsComponent', () => {
  let component: EntityBarsComponent;
  let fixture: ComponentFixture<EntityBarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityBarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
