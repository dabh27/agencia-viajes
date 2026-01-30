import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialclienteReservaComponent } from './historialcliente-reserva.component';

describe('HistorialclienteReservaComponent', () => {
  let component: HistorialclienteReservaComponent;
  let fixture: ComponentFixture<HistorialclienteReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialclienteReservaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialclienteReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
