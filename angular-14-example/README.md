# Angular 14 Datatrans Secure Fields Example 

Example Project showing how to include and run the Secure Fields widget in Angular 14.

Notes:
- [ScriptService](src/app/script.service.ts): this is used to add the Secure Fields JS file into the Angular App from the URL - https://pay.sandbox.datatrans.com/upp/payment/js/secure-fields-2.0.0.js
- [DatatransWidgetComponent](src/app/datatrans-widget/datatrans-widget.component.ts): this is the main component that contains the logic and UI for the widget, includes a call to the ScriptService in order to add the required JS file to the page.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
