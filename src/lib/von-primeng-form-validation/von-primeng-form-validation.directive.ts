import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { VALIDATION_MESSAGES, VonFormValidationDirective } from '@von-development-studio/angular-form-validation';
import { MessageService } from 'primeng/api';

@Directive({
  selector: '[validation]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: VonPrimengFormValidationDirective, multi: true }
  ]
})
export class VonPrimengFormValidationDirective extends VonFormValidationDirective {

  constructor(
    protected element: ElementRef,
    protected renderer: Renderer2,
    protected messageService: MessageService
  ) {
    super(element, renderer);
  }

  ngOnInit(): void {
    const $closestFormEl = this.element.nativeElement.form || this.getClosestForm(this.element.nativeElement);
    const isValidationEn = !$closestFormEl.hasAttribute('validation-es');
    this.messages = isValidationEn
      ? VALIDATION_MESSAGES.EN
      : VALIDATION_MESSAGES.ES;
    this.$label = $closestFormEl.querySelector(`label[for='${this.name}']`);
    if (this.required && this.$label) {
      this.$label.classList.add('field__label--required');
    }
    this.element.nativeElement.setAttribute('validation', true);
  }

  @HostListener('executeValidation') executeValidationEvent = () => {
    this.validator = this.getCustomValidators(this.ngModel);
    const labelText = this.getLabelText();
    let message = '';
    let valid = false;

    if (this.validator.isEmpty) {
      message = this.requiredMessage || this.messages.requiredMessage;
    } else if (this.validator.isNotEqual) {
      message = this.equalToMessage || this.messages.equalToMessage;
    } else {
      valid = true;
    }

    if (!valid) {
      this.renderer.addClass(this.element.nativeElement, 'field__error');
      message = message.replace('${name}', labelText);
      this.messageService.add({ severity: 'error', detail: message });
    } else {
      this.renderer.removeClass(this.element.nativeElement, 'field__error');
    }
    this.element.nativeElement.setAttribute('validation', valid);
  }

}
