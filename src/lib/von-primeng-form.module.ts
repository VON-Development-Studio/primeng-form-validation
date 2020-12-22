import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VonPrimengFormValidateDirective } from './von-primeng-form-validate/von-primeng-form-validate.directive';
import { VonPrimengFormValidationDirective } from './von-primeng-form-validation/von-primeng-form-validation.directive';

@NgModule({
  declarations: [
    VonPrimengFormValidateDirective,
    VonPrimengFormValidationDirective
  ],
  imports: [
    FormsModule
  ],
  exports: [
    FormsModule,
    VonPrimengFormValidateDirective,
    VonPrimengFormValidationDirective
  ],
  providers: []
})
export class VonPrimengFormModule { }
