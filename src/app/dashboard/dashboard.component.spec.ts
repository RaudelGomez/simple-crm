import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { UserService } from '../services/user.service';
import { Firestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Mock para ActivatedRoute
class ActivatedRouteStub {
  params = of({}); // Mock de parámetros de la ruta
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('Firestore', ['collection', 'collectionData', 'doc', 'getDoc', 'addDoc', 'deleteDoc', 'updateDoc']);

    await TestBed.configureTestingModule({
      imports: [DashboardComponent, BrowserAnimationsModule],
      providers: [
        UserService,
        { provide: Firestore, useValue: spy }, // Proveer el mock de Firestore
        { provide: ActivatedRoute, useClass: ActivatedRouteStub } // Proveer el mock de ActivatedRoute
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});