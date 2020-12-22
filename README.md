# PrimeNG Form Validation

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.3.

## Installing

1. Add NPM package into your project:

  ```node
  npm i @von-development-studio/primeng-form-validation -S
  ```

2. Add _**VonPrimengFormModule**_ into `imports` section

  ```typescript
  import { VonPrimengFormModule } from '@von-development-studio/primeng-form-validation';

  ...

  @NgModule({
    imports: [
      ...
      VonPrimengFormModule,
      ...
    ]
  })
  export class AppModule { }
  ```

## Usage

1. Add attribute _**(validate)**_ (instead of _**submit**_ or _**ngSubmit**_) & _**novalidate**_ in form tag:

  ```html
  <form (validate)="login()" novalidate>
  ```

2. In each field you want to add a _**validation**_:

  ```html
  <input pInputText validation type="text" name="username" [(ngModel)]="login.username" [required]="true" />
  ```

  * You need to include the component [```<p-toast></p-toast>```](https://www.primefaces.org/primeng/#/toast) in your html

3.  Your button type should be _**submit**_:

  ```html
  <button type="submit">Login</button>
  ```

## Directives

* _**required:**_ Checks null value

  ```html
  <input name="requiredField" [(ngModel)]="value" [required]="true" validation />
  ```

* _**equalTo:**_ Checks a value is equal to (value or variable)

  ```html
  <input name="eqField01" [(ngModel)]="value01" equalTo="TEST" validation />
  ```

  ```html
  <input name="eqField02" [(ngModel)]="value02" [equalTo]="value01" validation />
  ```

## Default validation messages

* _**requiredMessage:**_ `The field '${name}' is required`
* _**equalToMessage:**_ `The field '${name}' is not equal`

<hr>

###### _[By Von Development Studio](https://www.von-development-studio.com/)_
