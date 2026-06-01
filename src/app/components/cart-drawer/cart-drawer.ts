import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.css'
})
export class CartDrawerComponent {
  protected readonly courseService = inject(CourseService);

  // Promo Code State
  protected readonly promoInput = signal<string>('');
  protected readonly promoDiscount = signal<number>(0); // e.g. 0.5 for 50%
  protected readonly isPromoError = signal<boolean>(false);
  protected readonly promoSuccessMessage = signal<string>('');

  // Computed total with discount
  protected readonly discountedTotal = computed(() => {
    const total = this.courseService.cartTotal();
    const discount = this.promoDiscount();
    return total * (1 - discount);
  });

  applyPromo(): void {
    const code = this.promoInput().trim().toUpperCase();
    if (code === 'LAUNCH50') {
      this.promoDiscount.set(0.50);
      this.isPromoError.set(false);
      this.promoSuccessMessage.set('¡Código LAUNCH50 aplicado! 50% de descuento adicional.');
      this.courseService.showToast('¡Descuento del 50% aplicado con éxito!', 'success');
    } else if (code !== '') {
      this.isPromoError.set(true);
      this.promoSuccessMessage.set('');
      this.courseService.showToast('Código promocional inválido.', 'info');
    }
  }

  clearPromo(): void {
    this.promoInput.set('');
    this.promoDiscount.set(0);
    this.isPromoError.set(false);
    this.promoSuccessMessage.set('');
  }
}
