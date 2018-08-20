"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var StepperDemo = /** @class */ (function () {
    function StepperDemo(_formBuilder) {
        this._formBuilder = _formBuilder;
        this.isNonLinear = false;
        this.isNonEditable = false;
        this.steps = [
            { label: 'Confirm your name', content: 'Last name, First name.' },
            { label: 'Confirm your contact information', content: '123-456-7890' },
            { label: 'Confirm your address', content: '1600 Amphitheater Pkwy MTV' },
            { label: 'You are now done', content: 'Finished!' }
        ];
    }
    Object.defineProperty(StepperDemo.prototype, "formArray", {
        /** Returns a FormArray with the name 'formArray'. */
        get: function () { return this.formGroup.get('formArray'); },
        enumerable: true,
        configurable: true
    });
    StepperDemo.prototype.ngOnInit = function () {
        this.formGroup = this._formBuilder.group({
            formArray: this._formBuilder.array([
                this._formBuilder.group({
                    firstNameFormCtrl: ['', forms_1.Validators.required],
                    lastNameFormCtrl: ['', forms_1.Validators.required],
                }),
                this._formBuilder.group({
                    emailFormCtrl: ['', forms_1.Validators.email]
                }),
            ])
        });
        this.nameFormGroup = this._formBuilder.group({
            firstNameCtrl: ['', forms_1.Validators.required],
            lastNameCtrl: ['', forms_1.Validators.required],
        });
        this.emailFormGroup = this._formBuilder.group({
            emailCtrl: ['', forms_1.Validators.email]
        });
    };
    StepperDemo = __decorate([
        core_1.Component({selector: 'stepper-demo',
            template: "<mat-checkbox [(ngModel)]=\"isNonLinear\">Disable linear mode</mat-checkbox> <h3>Linear Vertical Stepper Demo using a single form</h3> <form [formGroup]=\"formGroup\"> <mat-vertical-stepper #linearVerticalStepper=\"matVerticalStepper\" formArrayName=\"formArray\" [linear]=\"!isNonLinear\"> <mat-step formGroupName=\"0\" [stepControl]=\"formArray?.get([0])\"> <ng-template matStepLabel>Fill out your name</ng-template> <mat-form-field> <mat-label>First name</mat-label> <input matInput formControlName=\"firstNameFormCtrl\" required> <mat-error>This field is required</mat-error> </mat-form-field> <mat-form-field> <mat-label>Last name</mat-label> <input matInput formControlName=\"lastNameFormCtrl\" required> <mat-error>This field is required</mat-error> </mat-form-field> <div> <button mat-button matStepperNext>Next</button> </div> </mat-step> <mat-step formGroupName=\"1\" [stepControl]=\"formArray?.get([1])\" optional> <ng-template matStepLabel> <div>Fill out your email address</div> </ng-template> <mat-form-field> <mat-label>Email address</mat-label> <input matInput formControlName=\"emailFormCtrl\"> <mat-error>The input is invalid.</mat-error> </mat-form-field> <div> <button mat-button matStepperPrevious>Back</button> <button mat-button matStepperNext>Next</button> </div> </mat-step> <mat-step> <ng-template matStepLabel>Confirm your information</ng-template> Everything seems correct. <div> <button mat-button>Done</button> <button type=\"button\" mat-button (click)=\"linearVerticalStepper.reset()\">Reset</button> </div> </mat-step> </mat-vertical-stepper> </form> <h3>Linear Horizontal Stepper Demo using a different form for each step</h3> <mat-horizontal-stepper #linearHorizontalStepper=\"matHorizontalStepper\" [linear]=\"!isNonLinear\"> <mat-step [stepControl]=\"nameFormGroup\"> <form [formGroup]=\"nameFormGroup\"> <ng-template matStepLabel>Fill out your name</ng-template> <mat-form-field> <mat-label>First name</mat-label> <input matInput formControlName=\"firstNameCtrl\" required> <mat-error>This field is required</mat-error> </mat-form-field> <mat-form-field> <mat-label>Last name</mat-label> <input matInput formControlName=\"lastNameCtrl\" required> <mat-error>This field is required</mat-error> </mat-form-field> <div> <button mat-button matStepperNext>Next</button> </div> </form> </mat-step> <mat-step [stepControl]=\"emailFormGroup\" optional> <form [formGroup]=\"emailFormGroup\"> <ng-template matStepLabel>Fill out your email address</ng-template> <mat-form-field> <mat-label>Email address</mat-label> <input matInput formControlName=\"emailCtrl\"> <mat-error>The input is invalid</mat-error> </mat-form-field> <div> <button mat-button matStepperPrevious>Back</button> <button mat-button matStepperNext>Next</button> </div> </form> </mat-step> <mat-step> <form> <ng-template matStepLabel>Confirm your information</ng-template> Everything seems correct. <div> <button mat-button>Done</button> <button type=\"button\" mat-button (click)=\"linearHorizontalStepper.reset()\">Reset</button> </div> </form> </mat-step> </mat-horizontal-stepper> <h3>Vertical Stepper Demo</h3> <mat-checkbox [(ngModel)]=\"isNonEditable\">Make steps non-editable</mat-checkbox> <mat-vertical-stepper> <mat-step [editable]=\"!isNonEditable\"> <ng-template matStepLabel>Fill out your name</ng-template> <mat-form-field> <mat-label>First name</mat-label> <input matInput> </mat-form-field> <mat-form-field> <mat-label>Last name</mat-label> <input matInput> </mat-form-field> <div> <button mat-button matStepperNext>Next</button> </div> </mat-step> <mat-step [editable]=\"!isNonEditable\"> <ng-template matStepLabel> <div>Fill out your phone number</div> </ng-template> <mat-form-field> <mat-label>Phone number</mat-label> <input matInput> </mat-form-field> <div> <button mat-button matStepperPrevious>Back</button> <button mat-button matStepperNext>Next</button> </div> </mat-step> <mat-step [editable]=\"!isNonEditable\"> <ng-template matStepLabel> <div>Fill out your address</div> </ng-template> <mat-form-field> <mat-label>Address</mat-label> <input matInput> </mat-form-field> <div> <button mat-button matStepperPrevious>Back</button> <button mat-button matStepperNext>Next</button> </div> </mat-step> <mat-step> <ng-template matStepLabel>Confirm your information</ng-template> Everything seems correct. <div> <button mat-button>Done</button> </div> </mat-step> </mat-vertical-stepper> <h3>Horizontal Stepper Demo with Text Label</h3> <mat-horizontal-stepper> <mat-step label=\"Fill out your name\"> <mat-form-field> <mat-label>First name</mat-label> <input matInput> </mat-form-field> <mat-form-field> <mat-label>Last name</mat-label> <input matInput> </mat-form-field> <div> <button mat-button matStepperNext>Next</button> </div> </mat-step> <mat-step label=\"Fill out your phone number\"> <mat-form-field> <mat-label>Phone number</mat-label> <input matInput> </mat-form-field> <div> <button mat-button matStepperPrevious>Back</button> <button mat-button matStepperNext>Next</button> </div> </mat-step> <mat-step label=\"Fill out your address\"> <mat-form-field> <mat-label>Address</mat-label> <input matInput> </mat-form-field> <div> <button mat-button matStepperPrevious>Back</button> <button mat-button matStepperNext>Next</button> </div> </mat-step> <mat-step label=\"Confirm your information\"> Everything seems correct. <div> <button mat-button>Done</button> </div> </mat-step> </mat-horizontal-stepper> <h3>Horizontal Stepper Demo with Templated Label</h3> <mat-horizontal-stepper> <mat-step *ngFor=\"let step of steps\"> <ng-template matStepLabel>{{step.label}}</ng-template> <mat-form-field> <mat-label>Answer</mat-label> <input matInput [(ngModel)]=\"step.content\"> </mat-form-field> <div> <button mat-button matStepperPrevious>Back</button> <button mat-button matStepperNext>Next</button> </div> </mat-step> </mat-horizontal-stepper> <h3>Stepper with autosize textarea</h3> <mat-horizontal-stepper> <mat-step label=\"Step 1\"> <mat-form-field> <mat-label>Autosize textarea</mat-label> <textarea matInput cdkTextareaAutosize>This is an autosize textarea, it should adjust to the size of its content.</textarea> </mat-form-field> </mat-step> </mat-horizontal-stepper> ",
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder])
    ], StepperDemo);
    return StepperDemo;
}());
exports.StepperDemo = StepperDemo;
//# sourceMappingURL=stepper-demo.js.map