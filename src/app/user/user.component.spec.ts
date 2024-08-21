import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { UserService } from '../services/user.service';
import { Firestore } from '@angular/fire/firestore';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;


  beforeEach(async () => {
    const spy = jasmine.createSpyObj('Firestore', ['collection', 'collectionData', 'doc', 'getDoc', 'addDoc', 'deleteDoc', 'updateDoc']);

    await TestBed.configureTestingModule({
      imports: [UserComponent],
      providers: [
        UserService,
        { provide: Firestore, useValue: spy } // Proveer el mock de Firestore
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
