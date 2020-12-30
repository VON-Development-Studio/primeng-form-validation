import { ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { FormControl, ValidationErrors, Validator } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { VALIDATION_MESSAGES } from './von-primeng-validation.constant';
import { ValidationMessagesLocalizationModel } from './von-primeng-validation.model';

export abstract class VonPrimengValidationBase implements OnInit, Validator {

  @Input() ngModel?: any;
  @Input() name?: string;
  @Input() customName?: string;

  @Input() required?: boolean;
  @Input() requiredMessage?: string;
  @Input() equalTo?: any;
  @Input() equalIgnoreCase?: boolean;
  @Input() equalToMessage?: string;

  protected validator: ValidationErrors = {};
  protected message = '';
  protected messages: ValidationMessagesLocalizationModel = {
    requiredMessage: '',
    equalToMessage: ''
  };
  protected $label?: HTMLElement;

  constructor(
    protected element: ElementRef,
    protected renderer: Renderer2,
    protected messageService: MessageService
  ) { }

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

  validate(formValue: FormControl): ValidationErrors {
    this.validator = this.getCustomValidators(formValue.value);
    this.runValidation();
    return this.validator;
  }

  @HostListener('executeValidation') executeValidationEvent = () => {
    this.validator = this.getCustomValidators(this.ngModel);
    const labelText = this.getLabelText();
    const { message, valid } = this.verifyValidationMessage();

    if (!valid) {
      this.renderer.addClass(this.element.nativeElement, 'field__error');
      this.messageService.add({ severity: 'error', detail: message.replace('${name}', labelText) });
    } else {
      this.renderer.removeClass(this.element.nativeElement, 'field__error');
    }
    this.element.nativeElement.setAttribute('validation', valid);
  }

  protected abstract verifyValidationMessage(): { message: string, valid: boolean };

  protected abstract getCustomValidators(value: any): ValidationErrors;

  protected abstract fieldNotValid(): boolean;

  protected getClosestForm = (element: HTMLElement): HTMLElement => {
    if (element.tagName === 'FORM' || element.tagName === 'BODY') {
      return element;
    }

    const parent = element.parentElement;
    if (parent) {
      return this.getClosestForm(parent);
    }
    return element;
  }

  protected getLabelText = (): string => {
    let labelText = this.name || '';
    if (this.customName) {
      labelText = this.customName;
    }
    if (this.$label && this.$label.innerText) {
      labelText = this.$label.innerText;
    }
    return labelText;
  }

  protected runValidation = (): void => {
    const isNotValid = this.fieldNotValid();
    if (isNotValid) {
      return;
    }
    this.renderer.removeClass(this.element.nativeElement, 'field__error');
  }

}
