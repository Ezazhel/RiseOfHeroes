import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityBarsMiscellaneousComponent } from './entity-bars-miscellaneous.component';

describe('EntityBarsMiscellaneousComponent', () => {
  let component: EntityBarsMiscellaneousComponent;
  let fixture: ComponentFixture<EntityBarsMiscellaneousComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityBarsMiscellaneousComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityBarsMiscellaneousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
