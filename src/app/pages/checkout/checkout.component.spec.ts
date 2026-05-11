import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutComponent } from './checkout.component';

import { provideMockStore } from '@ngrx/store/testing';

import { ActivatedRoute } from '@angular/router';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutComponent],
      providers: [
        provideMockStore({}),

        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  if (key === 'hotelId') return '1';
                  if (key === 'roomName') return 'Luxo';
                  return null;
                },
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve iniciar formulário inválido', () => {
    expect(component.checkoutForm.valid).toBeFalse();
  });

  it('deve invalidar email incorreto', () => {
    const emailControl = component.checkoutForm.get('contactEmail');

    emailControl?.setValue('email-invalido');

    expect(emailControl?.valid).toBeFalse();
  });

  it('deve validar email correto', () => {
    const emailControl = component.checkoutForm.get('contactEmail');

    emailControl?.setValue('isabela@email.com');

    expect(emailControl?.valid).toBeTrue();
  });

  it('deve invalidar telefone incorreto', () => {
    const phoneControl = component.checkoutForm.get('contactPhone');

    phoneControl?.setValue('123');

    expect(phoneControl?.valid).toBeFalse();
  });

  it('deve validar telefone correto', () => {
    const phoneControl = component.checkoutForm.get('contactPhone');

    phoneControl?.setValue('(11) 99999-9999');

    expect(phoneControl?.valid).toBeTrue();
  });

  it('deve validar formulário completo', () => {
    component.checkoutForm.patchValue({
      contactName: 'Isabela',
      contactEmail: 'isabela@email.com',
      contactPhone: '(11) 99999-9999',
    });

    component.guests.push(component['createGuest']());

    component.guests.at(0).patchValue({
      firstName: 'Isabela',
      lastName: 'Silva',
    });

    expect(component.checkoutForm.valid).toBeTrue();
  });
});
