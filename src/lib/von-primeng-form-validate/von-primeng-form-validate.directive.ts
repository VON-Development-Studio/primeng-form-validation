import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { VonFormValidateDirective } from '@von-development-studio/angular-form-validation';

@Directive({
  selector: '[validate]'
})
export class VonPrimengFormValidateDirective extends VonFormValidateDirective {

  constructor(protected el: ElementRef) {
    super(el);
  }

  @HostListener('submit', ['$event'])
  onSubmitEvent = (e: any) => {
    e.preventDefault();
    const elements = this.el.nativeElement.querySelectorAll('[validation]');
    this.isValid = true;
    this.isFocused = false;

    elements.forEach((el: HTMLElement) => {
      el.dispatchEvent(new Event('executeValidation'));
      const elValid = el.getAttribute('validation') === 'true';
      if (this.isValid) {
        this.isValid = elValid;
      }

      const ignoreValidity = this.shouldIgnoreValidity(el.tagName);
      if (!ignoreValidity) {
        const inputEl = this.getInputElement(el);
        if (!elValid && !this.isFocused) {
          this.isFocused = true;
          inputEl.focus();
        }
      }
    });

    if (this.isValid) {
      this.customSubmit.emit(e);
    }
  }

  protected shouldIgnoreValidity = (tagName: string) => {
    return tagName === 'P-DROPDOWN';
  }

  protected getInputElement = (el: any) => {
    if (el.tagName === 'P-CALENDAR'
      || el.tagName === 'P-AUTOCOMPLETE') {
      const inputEl = el.querySelector('input');
      return inputEl;
    }
    return el;
  }

}
