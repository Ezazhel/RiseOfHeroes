import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityPortraitComponent } from './entity-portrait.component';

describe('EntityPortraitComponent', () => {
  let component: EntityPortraitComponent;
  let fixture: ComponentFixture<EntityPortraitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityPortraitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityPortraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
