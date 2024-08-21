import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {Firestore } from '@angular/fire/firestore';

describe('UserService', () => {
  let service: UserService;
  let firestoreSpy: jasmine.SpyObj<Firestore>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Firestore', ['collection', 'doc', 'getDoc', 'addDoc', 'deleteDoc', 'updateDoc', 'collectionData']);

    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: Firestore, useValue: spy } // Aquí estamos proporcionando el mock
      ],
    });

    service = TestBed.inject(UserService);
    firestoreSpy = TestBed.inject(Firestore) as jasmine.SpyObj<Firestore>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
