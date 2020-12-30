import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { VonPrimengValidationDirective } from './von-primeng-form-validation/von-primeng-validation.directive';
import { VonPrimengValidateDirective } from './von-primeng-validate/von-primeng-validate.directive';

@NgModule({
  declarations: [
    VonPrimengValidateDirective,
    VonPrimengValidationDirective
  ],
  imports: [
    FormsModule
  ],
  exports: [
    FormsModule,
    VonPrimengValidateDirective,
    VonPrimengValidationDirective
  ],
  providers: [
    MessageService
  ]
})
export class VonPrimengFormModule { }
