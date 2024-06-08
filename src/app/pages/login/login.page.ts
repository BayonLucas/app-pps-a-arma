import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonCol, IonButton, IonToast, IonIcon, IonItem, IonInput } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { CustomInputComponent } from 'src/app/shared/components/custom-input/custom-input.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonInput, IonIcon, IonToast, IonButton, IonCol, IonItem,
    IonRow, IonContent, IonHeader, IonTitle, IonToolbar, 
    CommonModule, CustomInputComponent, ReactiveFormsModule, CommonModule
    ]
})
export class LoginPage implements OnInit {
  private authService:AuthService = inject(AuthService);
  private router:Router = inject(Router);

  error: string = '';

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, /*Validators.pattern()*/]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)/*Validators.pattern()*/]),
  });


  constructor() { }

  ingresar(){
    if(this.form.valid){
      let email: string = this.form.get('email')!.value;
      let password: string = this.form.get('password')!.value;

      this.authService.loginUser(email, password)
        .then( () => {
          this.router.navigateByUrl('/home');
          this.error = "Excelente";
        })
        .catch((error) => {
          this.error = '';
          let message: string;
          switch (error.code) {
            case 'auth/invalid-credential':
              message = 'No se encontró una cuenta con este correo electrónico.';
              break;
            default:
              message = 'Ocurrió un error. Por favor, inténtelo de nuevo.';
          }
          this.error = message;
        });
    }
  }



  cargarUsuario(user:string){
    let email:string = '';
    let contraseña:string = '';

    switch(user){
      case 'admin':
        email = 'admin@admin.com';
        contraseña = '111111';
        break;
      case 'invitado':
        email = 'invitado@invitado.com';
        contraseña = '222222';
        break;
      case 'usuario':
        email = 'usuario@usuario.com';
        contraseña = '333333';
        break;
      case 'anonimo':
        email = 'anonimo@anonimo.com';
        contraseña = '444444';
        break;
      case 'tester':
        email = 'tester@tester.com';
        contraseña = '555555';
        break;
    }

    this.form.patchValue({
      email: email,
      password: contraseña
    });
  }


  ngOnInit() {



  }

}
