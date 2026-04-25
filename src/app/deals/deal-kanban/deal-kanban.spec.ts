import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealKanban } from './deal-kanban';

describe('DealKanban', () => {
  let component: DealKanban;
  let fixture: ComponentFixture<DealKanban>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealKanban],
    }).compileComponents();

    fixture = TestBed.createComponent(DealKanban);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
