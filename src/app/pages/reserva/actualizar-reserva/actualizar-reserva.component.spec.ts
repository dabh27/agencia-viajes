import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarReservaComponent } from './actualizar-reserva.component';

describe('ActualizarReservaComponent', () => {
  let component: ActualizarReservaComponent;
  let fixture: ComponentFixture<ActualizarReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarReservaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
