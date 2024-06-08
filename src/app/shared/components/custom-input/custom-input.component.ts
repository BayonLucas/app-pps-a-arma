import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  standalone: true,
  imports: [ IonicModule, ReactiveFormsModule, CommonModule]
})
export class CustomInputComponent  implements OnInit {
  @Input() control!: FormControl | any;
  @Input() type!: string;
  @Input() label!: string;
  @Input() autocomplete!: string;
  @Input() icon!: string;

  isPassword!: Boolean;
  hide: Boolean = true;


  constructor(){ }
  

  ngOnInit() {
    this.type == 'password' ? this.isPassword = true : this.isPassword = false;
  }

  showOrHidePassword(){
    this.hide = !this.hide;
    if(this.hide){
      this.type = "password";
    }
    else{
      this.type = "text";
    }
  }



}
