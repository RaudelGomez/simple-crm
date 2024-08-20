import { inject, Injectable } from '@angular/core';
import { addDoc, collectionData, doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../models/user.class';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  //All Users
  public usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public users$: Observable<User[]> = this.usersSubject.asObservable();

  loading:boolean = false;

  firestore: Firestore = inject(Firestore);

  constructor() {}

  async loadUsers(){
    //CollectionData is an observable in Firestore. Its not necesary next()
    collectionData(this.getUserRef(), {idField: 'id'}).pipe(
      map((items: any[]) => {
        return items.map(item => this.toJSON(item)); // Transform data in a User[]
      })
    ).subscribe(users => {
      // console.log(users);
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
      (docRef)=> {
        console.log(`user created with id:${docRef!.id}`); 
      }
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
  getSingleUserRef(colId:string, docId: string){
    return doc(collection(this.firestore, colId), docId);
  }

  async getUserDataBase(colId:string, docId: string){
    const docRef = this.getSingleUserRef(colId, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      return
    }
  }

  async updateUser(colId:string, docId: string, user: User){
    this.loading = true;
    const docRef = this.getSingleUserRef(colId, docId);
    let userJSON = this.toJSON(user);
    //console.log(userJSON);
    await updateDoc(docRef, {...userJSON, id: docId});
    this.loadUsers();
    this.loading = false;
  }

  /**
   * This function transfrom the data of firetore in a JSON type User
   * @param item - Object in raw from Firebase
   * @returns Teturn a object type User
   */
  private toJSON(item: any): User {
    return {
      id: item.id,
      firstName: item.firstName || '',
      lastName: item.lastName || '',
      email: item.email || '',
      street: item.street || '',
      zipCode: item.zipCode || 0,
      birthDate: item.birthDate || 0,
      city: item.city || ''
    };
  }
}
