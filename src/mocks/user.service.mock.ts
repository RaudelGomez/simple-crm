import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../app/models/user.class'; 

export class UserServiceMock {
  // Simulamos algunos usuarios en la base de datos.
  public usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([
    { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', birthDate: 1990, street: '123 Main St', zipCode: 12345, city: 'Springfield' },
    { id: '2', firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', birthDate: 1992, street: '456 Elm St', zipCode: 67890, city: 'Shelbyville' }
  ]);

  public users$: Observable<User[]> = this.usersSubject.asObservable();

  async loadUsers() {
    // Simula la carga de usuarios
    this.usersSubject.next(this.usersSubject.value);
  }
}
