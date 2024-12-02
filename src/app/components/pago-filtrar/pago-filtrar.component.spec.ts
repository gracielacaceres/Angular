import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoFiltrarComponent } from './pago-filtrar.component';

describe('PagoFiltrarComponent', () => {
  let component: PagoFiltrarComponent;
  let fixture: ComponentFixture<PagoFiltrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagoFiltrarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoFiltrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
