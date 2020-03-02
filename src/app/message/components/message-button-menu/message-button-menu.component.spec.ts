import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageButtonMenuComponent } from './message-button-menu.component';

describe('MessageButtonMenuComponent', () => {
  let component: MessageButtonMenuComponent;
  let fixture: ComponentFixture<MessageButtonMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageButtonMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageButtonMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
