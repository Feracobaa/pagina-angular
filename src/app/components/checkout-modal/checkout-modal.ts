import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-checkout-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout-modal.html',
  styleUrl: './checkout-modal.css'
})
export class CheckoutModalComponent {
  protected readonly courseService = inject(CourseService);

  // Form Fields State
  protected readonly cardName = signal<string>('');
  protected readonly cardEmail = signal<string>('');
  protected readonly cardNumber = signal<string>('');
  protected readonly cardExpiry = signal<string>('');
  protected readonly cardCvv = signal<string>('');

  // Processing State
  protected readonly isProcessing = signal<boolean>(false);
  protected readonly formSubmitted = signal<boolean>(false);

  // Form errors computation
  isFormValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cardRegex = /^\d{16}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvRegex = /^\d{3}$/;

    return (
      this.cardName().trim().length >= 3 &&
      emailRegex.test(this.cardEmail()) &&
      cardRegex.test(this.cardNumber().replace(/\s/g, '')) &&
      expiryRegex.test(this.cardExpiry()) &&
      cvvRegex.test(this.cardCvv())
    );
  }

  // Format credit card spaces
  onCardNumberInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 16) {
      value = value.substring(0, 16);
    }
    
    // Group in 4s
    const parts = [];
    for (let i = 0; i < value.length; i += 4) {
      parts.push(value.substring(i, i + 4));
    }
    
    const formatted = parts.join(' ');
    this.cardNumber.set(formatted);
    input.value = formatted;
  }

  // Format expiry MM/YY
  onExpiryInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 4) {
      value = value.substring(0, 4);
    }
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2);
    }
    this.cardExpiry.set(value);
    input.value = value;
  }

  // Format CVV to 3 digits max
  onCvvInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '').substring(0, 3);
    this.cardCvv.set(value);
    input.value = value;
  }

  onSubmit(): void {
    this.formSubmitted.set(true);
    if (!this.isFormValid()) {
      this.courseService.showToast('Por favor rellena correctamente los campos de pago.', 'info');
      return;
    }

    this.isProcessing.set(true);
    
    // Simulate API call for payment processing
    setTimeout(() => {
      this.isProcessing.set(false);
      this.courseService.completeCheckout();
    }, 2000);
  }
}
