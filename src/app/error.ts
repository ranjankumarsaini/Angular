
import {FormGroup } from '@angular/forms';
import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms/src/model';
import { ValidatorFn } from '@angular/forms/src/directives/validators';


export class Utils {


  private static readonly errorMessages = {
    'required':  '##FIELD## is required',
    'minlength': (params) => '##FIELD## should be minimum ' + params.requiredLength + ' characters',
    'maxlength': (params) => '##FIELD## should not be greater then ' + params.requiredLength + ' characters',
    'pattern':  'Should be valid ##FIELD##',
    'email': 'Should be vaild email',
    'mobile': 'Should be a valid number',
    'numeric': 'Only numeric values allowed',
    'alphanumeric': 'Only numbers and characters allowed',
    'endDateNotValid': 'End Date cannot be less than start date.',
    'startDateandLessthan': 'Start date and end date cannot be same.',
    'startDateNotValid': 'Start Date cannot be greater than end date.',
    'characters': 'Only characters are allowed',
    'phoneNumber': 'Only numbers and characters like  (,+,- & ) are allowed'
  };

 public static showError(formName: FormGroup, field: string): boolean {

     return formName.controls[field].errors &&
       (!formName.controls[field].pristine || formName.controls[field].touched);
   }

   public static getError(formName: FormGroup, field: string, labelName: string): string {
    // console.log("show",formName.controls[field].errors);
    const errors = Object.keys(formName.controls[field].errors)
     .map(errortype => Utils.getMessage(errortype, labelName, formName.controls[field].errors[errortype]));
    return errors[0];
  }

  private static getMessage(type: string, lableName: string, params: any) {
    let msg = '';
    if (type.includes('length')) {
      msg = Utils.errorMessages[type](params);
    } else {
      msg = Utils.errorMessages[type];
    }
    return msg.replace('##FIELD##', lableName);
  }

  public static validateForm(formName: FormGroup): boolean {
    if (formName.invalid) {
       Object.keys(formName.controls).forEach(key => {
         formName.get(key).markAsDirty();
       });
       return false;
     } else {
       return true;
     }
    }
}