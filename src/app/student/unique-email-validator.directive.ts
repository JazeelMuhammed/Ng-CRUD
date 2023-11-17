
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { StudentService } from './student.service';
import { Observable, of, map, catchError } from 'rxjs';

export class UniqueEmailValidator {
  static createValidator(
    studentService: StudentService,
    currentEmail: string | null = null // Add currentEmail parameter
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      // Check if the current email matches the control's value
      if (control.value === currentEmail) {
        return of(null); // If it's the same as the current email, no need to check
      }

      return studentService.checkemailExist(control.value).pipe(
        map((result: boolean) =>
          result ? { emailAlreadyExists: true } : null
        ),
        catchError(() => of(null)) // Handle errors if necessary
      );
    };
  }
}