import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  integerToRomanForm = new FormGroup({
    integer: new FormControl('', [Validators.required,Validators.pattern(/^\d+$/
      )]),
    roman:  new FormControl(''),
  })

  constructor() { }

  ngOnInit(): void {
  }

  showErrors() {
    const {dirty, touched, errors} = this.integerToRomanForm.controls['integer'];
    return dirty &&touched && errors;
  }

  onSubmit() {
    this.integerToRomanForm.setValue({roman: this.intToRoman(Math.floor(this.integerToRomanForm.value.integer)), integer: this.integerToRomanForm.value.integer})
  }

  intToRoman = (num:number) => {
    const intToRomanMap:any = {
        '1': 'I',
        '4': 'IV',
        '5': 'V',
        '9': 'IX',
        '10': 'X',
        '40': 'XL',
        '50': 'L',
        '90': 'XC',
        '100': 'C',
        '400': 'CD',
        '500': 'D',
        '900': 'CM',
        '1000': 'M'
    }
    
    let resRoman = '';
    let romanArr:Array<number> = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    let symbol:string;
    let maxSymbolCount:number;
    for(let i=0; i<romanArr.length && num>0; i++){
        if(num===0){
            break
        }else if(romanArr[i]>num){
            continue
        } else {
            symbol = intToRomanMap[romanArr[i]];
            maxSymbolCount = Math.floor(num/romanArr[i]);
            resRoman = resRoman + symbol.repeat(maxSymbolCount);
            num = num - romanArr[i]*maxSymbolCount;
        }
     }
    return resRoman
};

}
