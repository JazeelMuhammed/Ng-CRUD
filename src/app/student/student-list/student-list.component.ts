import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  studentList: Student[]= [];

  constructor(private studentService: StudentService, 
    private router: Router) {}

  ngOnInit(): void {
      this.studentService.getStudents().subscribe((res: Student[]) => {
        this.studentList = res;
      })
      // this.studentService.getStudentsAndDistricts().subscribe(res => {
      //   console.log('Studets', res)
      //   this.studentList = res
      // })
  }

  getStudentDetailsNavigator(studentId: number) {
    this.router.navigate([`details/${studentId}`]);
  }

  editNavigator(stdId: number) {
    this.router.navigate([`update/${stdId}`]);
  }

  addStudentNavigator() {
    this.router.navigate(['create'])
  }

  onDeleteStudent(studentId: number) {
    // Ask for confirmation using SweetAlert
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Confirm button clicks, then proceed to delete
        this.studentService.deleteStudent(studentId).subscribe(
          () => {
            // Update the student list without reloa after deletion
            this.studentList = this.studentList.filter(
              (student) => student.id !== studentId
            );

            // Show success message using SweetAlert
            Swal.fire({
              title: 'Deleted!',
              text: 'Student deleted successfully.',
              icon: 'success',
            });
          },
          (error) => {
            console.error('Error deleting student', error);
          }
        );
      } else {
        // User canceled, show cancellation message
        Swal.fire('Deletion canceled', 'Your student is safe :)', 'info');
      }
    });
  }
  

}
