import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Haptics } from '@capacitor/haptics';
import { Motion } from '@capacitor/motion';
import { CapacitorFlash } from '@capgo/capacitor-flash';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule],
})
export class HomePage implements OnInit{
  private authService:AuthService = inject(AuthService);
  private router:Router = inject(Router);

  activado : boolean = false;
  accelerationX:any = 'Aceleracion X';
  accelerationZ:any = 'Aceleracion Z';
  accelerationY:any = 'Aceleracion Y';

  alarmOnOff: boolean = false;
  showDialog: boolean = false;

  primerIngreso: boolean = true;
  primerIngresoFlash: boolean = true;
 
  posicionActualCelular = 'actual';
  posicionAnteriorCelular = 'anterior'; 
  
  subscription: any;

  //Sonidos
  audioIzquierda = "../../assets/audios/Epa.mp3";
  audioDerecha = "../../assets/audios/hurto.mp3";
  audioVertical = "../../assets/audios/Vertical.mp3 ";
  audioHorizontal = "../../assets/audios/Horizontal.mp3";
  audioError = "../../assets/audios/alarma.mp3";
  audio = new Audio();
  
  constructor() {}
  
  onoff(){
    if(this.activado){
      this.verificarClave();
    }else{
      this.activarAlarma();
    }    
  }

  async cerrarSesion(){
    if(this.activado){
      const result = await this.showVerificarClave();
      if(result){
        this.activado = false;
        this.authService.singOutUser();
        this.router.navigateByUrl('/login');
        this.parar();
      }
    }
    else{
      this.activado = false;
      this.authService.singOutUser();
      this.router.navigateByUrl('/login');
      this.parar();
    }
    
  }
  
  async showVerificarClave(){
    const { value } = await Swal.fire({
      title: 'Ingrese su clave',
      input: 'password',
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#bf2dac',
      background: '#74bcff',
      color: '#bf2dac',
      heightAuto: false,
    });
    Swal.close();

    return value === this.authService.contrasenia;
  }

  async verificarClave(){
    console.log(this.authService.contrasenia);
    const result = await this.showVerificarClave();
    if(result){
      this.activado = false;
      this.audio.pause();
      this.parar();
    }
    else{      
      this.errorApagado();
    }
  }

  activarAlarma() {
    Motion.addListener('orientation', (event) => {
      if (event.gamma > 45) {
        this.posicionActualCelular = 'derecha';
        this.movimientoDerecha();
      } 
      else if (event.gamma < -45) {
        this.posicionActualCelular = 'izquierda';
        this.movimientoIzquierda();
      } 
      else if (event.beta >= 60) {
        this.posicionActualCelular = 'arriba';
        if (this.posicionActualCelular != this.posicionAnteriorCelular) {
          this.audio.src = this.audioVertical;
          this.posicionAnteriorCelular = 'arriba';
        }
        this.audio.play();
        this.movimientoVertical();
      } 
      else if (event.gamma < 10 && this.posicionActualCelular == 'arriba') {

        this.posicionActualCelular = 'plano';
        this.movimientoHorizontal();
      }
    });
    this.activado = true;
  }

  movimientoIzquierda() {
    this.primerIngreso = false;
    this.primerIngresoFlash = true;
    if (this.posicionActualCelular != this.posicionAnteriorCelular) {
      this.posicionAnteriorCelular = 'izquierda';
      this.audio.src = this.audioIzquierda;
    }
    this.audio.play();
  }

  movimientoDerecha() {
    this.primerIngreso = false;
    this.primerIngresoFlash = true;
    if (this.posicionActualCelular != this.posicionAnteriorCelular) {
      this.posicionAnteriorCelular = 'derecha';
      this.audio.src = this.audioDerecha;
    }
    this.audio.play();
  }

  movimientoVertical() {
    if (this.primerIngresoFlash) {
      this.primerIngresoFlash ? CapacitorFlash.switchOn({}) : null;
      setTimeout(() => {
        this.primerIngresoFlash = false;
        CapacitorFlash.switchOff();
      }, 5000);
      this.primerIngreso = false;
    }
  }

  movimientoHorizontal() {
    if (this.posicionActualCelular != this.posicionAnteriorCelular) {
      this.posicionAnteriorCelular = 'plano';
      this.audio.src = this.audioHorizontal;
    }
    if (!this.primerIngreso) {
      this.audio.play();
      Haptics.vibrate({ duration: 5000 });
    }
    this.primerIngreso = true;
    this.primerIngresoFlash = true;
  }

  errorApagado() {
    Motion.removeAllListeners();
    this.audio.src = this.audioError;
    this.audio.play();
    CapacitorFlash.switchOn({})
    Haptics.vibrate({duration: 5000});
    setTimeout(() => {
      this.primerIngresoFlash = false;
      CapacitorFlash.switchOff();
      this.activarAlarma();
    }, 5000);
  }

  parar() {    
    this.primerIngreso = true;
    this.activado = false;
    Motion.removeAllListeners();
  }

  vibracion(){
    Haptics.vibrate({duration: 5000});    
  }

  ngOnInit(): void { }
}
