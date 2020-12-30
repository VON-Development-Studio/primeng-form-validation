import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { NG_VALIDATORS, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { VonPrimengValidationBase } from './von-primeng-validation.base';

@Directive({
  selector: '[validation]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: VonPrimengValidationDirective, multi: true }
  ]
})
export class VonPrimengValidationDirective extends VonPrimengValidationBase {

  constructor(
    protected element: ElementRef,
    protected renderer: Renderer2,
    protected messageService: MessageService
  ) {
    super(element, renderer, messageService);
  }

  protected verifyValidationMessage = () => {
    let message = '';
    let valid = false;

    if (this.validator.isEmpty) {
      message = this.requiredMessage || this.messages.requiredMessage;
    } else if (this.validator.isNotEqual) {
      message = this.equalToMessage || this.messages.equalToMessage;
    } else {
      valid = true;
    }
    return { message, valid };
  }

  protected getCustomValidators = (formValue: any): ValidationErrors => {
    return {
      ...this.validateRequired(formValue),
      ...this.validateEqualTo(formValue)
    };
  }

  protected fieldNotValid = () => {
    return this.validator.isEmpty
      || this.validator.isNotEqual;
  }

  protected validateRequired: ValidatorFn = (value: any): ValidationErrors | null => {
    let validation = {};
    if (!this.required) {
      return {};
    }

    if (this.required && (value == null || value === '')) {
      validation = { isEmpty: true };
    }
    return validation;
  }

  protected validateEqualTo: ValidatorFn = (value: any): ValidationErrors | null => {
    if (!this.equalTo) {
      return {};
    }

    let validation = {};
    const isNotEqual = this.equalIgnoreCase
      ? `${value}`.toLowerCase() !== `${this.equalTo}`.toLowerCase()
      : value !== this.equalTo;
    if (isNotEqual) {
      validation = { isNotEqual: true };
    }
    return validation;
  }

}
