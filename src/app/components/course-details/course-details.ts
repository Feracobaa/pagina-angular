import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css'
})
export class CourseDetailsComponent {
  protected readonly courseService = inject(CourseService);
}
