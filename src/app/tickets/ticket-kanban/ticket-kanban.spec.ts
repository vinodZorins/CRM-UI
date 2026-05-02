import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketKanban } from './ticket-kanban';

describe('TicketKanban', () => {
  let component: TicketKanban;
  let fixture: ComponentFixture<TicketKanban>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketKanban],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketKanban);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
