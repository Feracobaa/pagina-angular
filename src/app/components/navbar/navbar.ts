import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  protected readonly courseService = inject(CourseService);

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.courseService.searchQuery.set(value);
  }
}
