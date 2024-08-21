import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async () => {
    const activatedRouteStub = {
      params: of({ id: 'someId' })
    };

    const userServiceStub = {
      users$: of([{ id: 'someId', firstName: 'Test', lastName: 'User', email: 'test@example.com' }]),
      getUserDataBase: jasmine.createSpy('getUserDataBase').and.returnValue(Promise.resolve({
        id: 'someId',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com'
      }))
    };

    const matDialogStub = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [UserDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: UserService, useValue: userServiceStub },
        { provide: MatDialog, useValue: matDialogStub }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});