import { Injectable, inject } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';
import { UserModel } from '../models/user';
import { FstoreService } from './fstore.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth:Auth = inject(Auth);
  private storeService:FstoreService = inject(FstoreService);
  public contrasenia!:string; 

  public user!: UserModel | null;
  userState$ = authState(this.auth);

  constructor() {
    // this.userState$.subscribe(authState => {
    //   if (authState) {
    //     this.user = <UserModel>{
    //       uid: authState?.uid,
    //       nombrecompleto: authState.displayName,
    //       email: authState.email
    //     };
    //   } 
    //   else {
    //     this.user = null;
    //   }
    // });
  }



  // async registerUser(email: string, username: string, password: string){
  //   await createUserWithEmailAndPassword(this.auth, email, password)
  //     .then( data => {
  //       updateProfile(data.user, {displayName: username})
  //       let userCredential: UserModel =  <UserModel>{
  //         uid: data.user.uid,
  //         email: data.user.email,
  //         nombrecompleto: data.user.displayName
  //       }
  //       localStorage.setItem("userCredential", JSON.stringify(userCredential));
  //     })
  //     .catch(e =>{
  //       throw e;
  //     });
  // }

  // async loginUser(email: string, password: string){
  //   return await signInWithEmailAndPassword(this.auth, email, password).then( data => {
  //     let userCredential: UserModel;
      
  //     this.storeService.traerUsuarioPorUid(data.user.uid)?.subscribe( (res) => {
  //       userCredential = res;
  //     });

  //     console.log(userCredential!);

  //     localStorage.setItem("userCredential", JSON.stringify(userCredential!));
  //   });
  // }
  async loginUser(email: string, password: string){
    try {
      const data = await signInWithEmailAndPassword(this.auth, email, password);
      let userCredential:UserModel = {
        id: 0,
        uid:data.user.uid,
        email: data.user.email!,
        role: '',
        sexo: 'No mucho'
      }
      this.contrasenia = password;
      localStorage.setItem("userCredential", JSON.stringify(userCredential!));
      // const userCredential = await lastValueFrom(this.storeService.traerUsuarioPorUid(data.user.uid));  
      
    } catch (error) {
      console.error("Error during login", error);
      throw error;
    }
  }

  async singOutUser(){
    return await signOut(this.auth)
      .then( res => {
        localStorage.removeItem("userCredential");
      });
  }




}
