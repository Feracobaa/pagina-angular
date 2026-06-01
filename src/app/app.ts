import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from './services/course.service';
import { NavbarComponent } from './components/navbar/navbar';
import { HeroComponent } from './components/hero/hero';
import { CourseCardComponent } from './components/course-card/course-card';
import { CourseDetailsComponent } from './components/course-details/course-details';
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer';
import { CheckoutModalComponent } from './components/checkout-modal/checkout-modal';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    CourseCardComponent,
    CourseDetailsComponent,
    CartDrawerComponent,
    CheckoutModalComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly courseService = inject(CourseService);
}
