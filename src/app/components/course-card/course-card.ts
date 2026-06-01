import { Component, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course, CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCardComponent {
  course = input.required<Course>();
  protected readonly courseService = inject(CourseService);
}
