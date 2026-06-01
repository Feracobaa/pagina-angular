import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class FooterComponent {
  protected readonly courseService = inject(CourseService);
  protected readonly newsletterEmail = signal<string>('');

  subscribeNewsletter(event: Event): void {
    event.preventDefault();
    if (this.newsletterEmail().trim() && this.newsletterEmail().includes('@')) {
      this.courseService.showToast('¡Gracias por suscribirte a nuestro boletín!', 'success');
      this.newsletterEmail.set('');
    } else {
      this.courseService.showToast('Por favor introduce un correo válido.', 'info');
    }
  }
}
