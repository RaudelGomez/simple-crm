// src/mocks/firestore.mock.ts
import { of } from 'rxjs';
import { User } from '../app/models/user.class';
import { collection } from '@angular/fire/firestore';

export class FirestoreMock {
  collection(name: string) {
    if (name === 'users') {
      return {
        valueChanges: () => of([
          new User({
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            birthDate: 1980,
            street: '123 Main St',
            zipCode: 12345,
            city: 'Anytown'
          }),
          new User({
            id: '2',
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane.doe@example.com',
            birthDate: 1990,
            street: '456 Elm St',
            zipCode: 67890,
            city: 'Othertown'
          })
        ]) // Retorna un observable con una lista de usuarios mockeados
      };
    }
    return {}; // Para otras colecciones, devuelve un objeto vacío
  }

  // Mock para `doc` y `getDoc` si es necesario en otras partes
  doc() {
    return {
      get: () => of({ exists: () => false, data: () => ({}), id: '' })
    };
  }

  // Otros métodos de Firestore si son utilizados
  async getDoc() {
    return { exists: () => false, data: () => ({}) };
  }

  async updateDoc() {}
  async deleteDoc() {}
  async addDoc() { return { id: 'mock-id' }; }
}
