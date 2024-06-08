import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent{
  private router:Router = inject(Router);
  
  constructor(private platform: Platform) {
    this.inicializar();
  }

  inicializar(){
    this.platform.ready().then( async () =>{
      setTimeout(() => {this.router.navigateByUrl("/splash-screen");}, 2000);
    })
  }

  
}
