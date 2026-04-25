import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertDialog } from './convert-dialog';

describe('ConvertDialog', () => {
  let component: ConvertDialog;
  let fixture: ComponentFixture<ConvertDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvertDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ConvertDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
