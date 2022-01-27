import { AbstractControl, ValidationErrors } from '@angular/forms';

export function divisableByFive(control: AbstractControl): ValidationErrors | null {
  if (control.value % 5 === 0) {
    return null;
  }
  return { notDivisableByFive: true };
}

