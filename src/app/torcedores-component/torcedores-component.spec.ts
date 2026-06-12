import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorcedoresComponent } from './torcedores-component';

describe('TorcedoresComponent', () => {
  let component: TorcedoresComponent;
  let fixture: ComponentFixture<TorcedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TorcedoresComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TorcedoresComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
