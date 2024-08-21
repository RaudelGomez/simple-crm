import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditUserComponent } from './dialog-edit-user.component';
import { UserService } from '../services/user.service';
import { Firestore } from '@angular/fire/firestore';

import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Crear un mock para MatDialogRef
class MatDialogRefMock {
  close() {}
}

describe('DialogEditUserComponent', () => {
  let component: DialogEditUserComponent;
  let fixture: ComponentFixture<DialogEditUserComponent>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('Firestore', ['collection', 'collectionData', 'doc', 'getDoc', 'addDoc', 'deleteDoc', 'updateDoc']);

    await TestBed.configureTestingModule({
      imports: [DialogEditUserComponent, BrowserAnimationsModule],
      providers: [
        UserService,
        { provide: Firestore, useValue: spy }, // Proveer el mock de Firestore
        { provide: MatDialogRef, useClass: MatDialogRefMock }, // Proveer el mock de MatDialogRef
        { provide: MAT_DIALOG_DATA, useValue: {} } // Proveer datos de diálogo, si es necesario
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
