import {Component, Input, OnInit, Optional, Self} from '@angular/core';
import {ControlValueAccessor, NgControl, ValidatorFn, Validators} from '@angular/forms';
@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit, ControlValueAccessor {
  @Input() label!: string;
  @Input() id!: string;
  @Input() isRequired!: boolean;
  @Input() isEmail!: boolean;
  @Input() requiredDate!: boolean;
  @Input() placeholder!: string;
  @Input() type!: string;
  // @Input() hasQuestionTag!: boolean;
  @Input() ngClass: any;
  @Input() errorMsg!: string;
  @Input() invalidErrorMsg!: string;
  @Input() pattern: string = "";
  @Input() for!: string;
  @Input() class!: string;
  @Input() blur: any;
  @Input() focus: any;
  // @Input() rows: any;
  // @Input() cols: any;
  submitted: any;
  fieldTextType!: boolean;
  value: any;

  constructor(
    @Self()
    @Optional()
    public ngControl: NgControl
  ) {
    this.ngControl.valueAccessor = this;
  }

  toggleFieldType() {
    this.fieldTextType = !this.fieldTextType;
  }

  ngOnInit() {
    const control = this.ngControl.control;
    const validators: ValidatorFn[] = control?.validator ? [control.validator] : [];
    if (this.isRequired) {
      validators.push(Validators.required);
    }
    if (this.isEmail) {
      validators.push(Validators.email);
    }
    control?.setValidators(validators);
    control?.updateValueAndValidity();
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    // Store the provided function as an internal method.
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // Store the provided function as an internal method.
    this.onTouched = fn;
  }

  onChange(event: Event) {
    const target = event.target as HTMLInputElement;
  }

  onTouched() {
  }
}

