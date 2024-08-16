import { inject, Injectable } from '@angular/core';
import { collectionData, doc, Firestore } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { User } from '../models/user.class';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public users$: Observable<User[]> = this.usersSubject.asObservable();

  // items$: Observable<any[]>;
  firestore: Firestore = inject(Firestore);

  constructor() { 
    collectionData(this.getUserRef()).pipe(
      map((items: any[]) => {
        return items.map(item => this.transformToUser(item)); // Transformamos los datos a User[]
      })
    ).subscribe(users => {
      this.usersSubject.next(users); // Emitimos los datos transformados al BehaviorSubject
    });

    // this.items$ = collectionData(this.getUserRef());
    // console.log(this.items$);
  }

  getUserRef(){
    return collection(this.firestore, 'users');
  }

  getSingleUser(colId:string, docId: string){
    return doc(collection(this.firestore, colId), docId);
  }

  private transformToUser(item: any): User {
    return {
      firstName: item.firstName || '',
      lastName: item.lastName || '',
      street: item.street || '',
      zipCode: item.zipCode || 0,
      birthDate: item.birthDate || 0,
      city: item.city || ''
    };
  }
}
