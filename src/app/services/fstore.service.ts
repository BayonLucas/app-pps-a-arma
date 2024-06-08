import { Injectable, inject } from '@angular/core';
import { CollectionReference, Firestore, collectionData, doc, query } from '@angular/fire/firestore';
import { collection, where } from '@firebase/firestore';
import { UserModel } from '../models/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FstoreService {
  private db: Firestore = inject(Firestore);
  private users: CollectionReference;



  constructor(){
    this.users = collection(this.db, 'users');
  }

  traerUsuarioPorUid(uid: string){
    let qry = query(this.users, where("uid", "==", uid));
    return collectionData(qry).pipe(
      map(users => users[0] as UserModel)
    );    
  }




}
