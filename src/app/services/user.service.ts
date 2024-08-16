import { inject, Injectable } from '@angular/core';
import { addDoc, collectionData, doc, Firestore } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { User } from '../models/user.class';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public users$: Observable<User[]> = this.usersSubject.asObservable();

  firestore: Firestore = inject(Firestore);

  constructor() { 
    this.loadUsers();
  }

  private loadUsers(){
    //CollectionData is an observable in Firestore. Its not necesary next()
    collectionData(this.getUserRef(), {idField: 'id'}).pipe(
      map((items: any[]) => {
        return items.map(item => this.transformToUser(item)); // Transform data in a User[]
      })
    ).subscribe(users => {
      console.log(users);
      this.usersSubject.next(users); // Update the data to the BehaviourSubject
    });
  }

  /**
   * This function add a user to Firebase
   * @param user User object
   */
  async addUser(user: User){
    await addDoc((this.getUserRef()), {...user}).catch(
      (err)=> {console.error(err);}
    ).then(
      (docRef)=> {console.log(`user created with id:${docRef!.id}`)}
    );
  }

  /**
   * Get the collection User
   * @returns The of the collection
   */
  getUserRef(){
    return collection(this.firestore, 'users');
  }

  /**
   * Get one document in the collection
   * @param colId - Id the collection
   * @param docId - id of the doc
   * @returns A doc in a collection
   */
  getSingleUser(colId:string, docId: string){
    return doc(collection(this.firestore, colId), docId);
  }

  /**
   * This function transfrom the data of firetore in a object type User
   * @param item - Object in raw from Firebase
   * @returns Teturn a object type User
   */
  private transformToUser(item: any): User {
    return {
      id: item.id,
      firstName: item.firstName || '',
      lastName: item.lastName || '',
      street: item.street || '',
      zipCode: item.zipCode || 0,
      birthDate: item.birthDate || 0,
      city: item.city || ''
    };
  }
}
