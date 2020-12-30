import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[validate]'
})
export class VonPrimengValidateDirective {

  @Output('validate')
  customSubmit: EventEmitter<any> = new EventEmitter();

  protected isValid?: boolean;
  protected isFocused?: boolean;

  constructor(protected el: ElementRef) { }

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
