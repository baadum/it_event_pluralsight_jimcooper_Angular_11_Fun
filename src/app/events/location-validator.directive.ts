import { Directive } from "@angular/core";
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector: '[validateLocation]',
    providers: [{provide: NG_VALIDATORS, useExisting: LocationValidator,
    multi: true}] // multi: true key in this object, allow us to add LocationValidator item to collection NG_VALIDATORS
    // so this the way to add custom validator


})

export class LocationValidator implements Validator {
    validate(formGroup: FormGroup) : { [key:string]: any} {
    let addressControl = formGroup.controls['address'];
    let cityControl = formGroup.controls['city'];
    let countryControl = formGroup.controls['country'];
    let onlineUrlControl = (<FormGroup>formGroup.root).controls['onlineUrl']; //to get access to the sibling
       
    if((addressControl && addressControl.value 
        && cityControl && cityControl.value 
        && countryControl && countryControl.value) 
        || (onlineUrlControl && onlineUrlControl.value)) {
            return null; // null - validation passing and no problem
        } else {
            return {validateLocation : false} // validation error
        }
    }
}