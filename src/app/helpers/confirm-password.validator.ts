import { FormGroup } from "@angular/forms";

export function confirmPasswordValidator(controlName: string, matchControlName: string) {
  return (FormGroup: FormGroup) => {
    const passwordControl = FormGroup.controls[controlName];
    const confirmPasswordControl = FormGroup.controls[matchControlName];

    if(confirmPasswordControl.errors && confirmPasswordControl.errors) {
      return;
    }
    if(passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({
        confirmPasswordValidator: true
      });
    } else {
      confirmPasswordControl.setErrors(null);
    }
  };
}
