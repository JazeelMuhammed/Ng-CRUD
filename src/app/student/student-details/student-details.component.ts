import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';
import { Student } from '../student.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  studentId!: number;
  studentData: any = {};
  selectedSubjects: string[] = [];

  constructor(private activatedRoute: ActivatedRoute, 
    private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
      this.activatedRoute.params.subscribe(res => {
        this.studentId = res['id']
      })

      this.studentService.getSingleStudent(this.studentId).subscribe(res => {
        this.studentData = res;
        console.log(res)
        // Map subjects when data is available
        this.mapSelectedSubjects(); 
      })
  }

  mapSelectedSubjects() {
    // Assuming studentData.subjects is an array of boolean values
    this.selectedSubjects = this.studentData.subjects
      .map((selected: any, index: any) => selected ? this.studentService.subjectList[index] : null)
      .filter((subject: any )=> subject !== null) as string[];
  }

  editNavigator(id: number) {
    this.router.navigate([`update/${id}`])
  }

  homeNavigator() {
    this.router.navigate(['home'])
  }
}
