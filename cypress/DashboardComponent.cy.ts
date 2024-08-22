import { DashboardComponent } from '../src/app/dashboard/dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../src/app/services/user.service';
import { ActivatedRouteMock } from '../src/mocks/activated-route.mock';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserServiceMock } from '../src/mocks/user.service.mock';

describe('DashboardComponent.cy.ts', () => {
  it('Show count', () => {
    cy.mount(DashboardComponent, {
      imports: [
        BrowserModule,
        HttpClientTestingModule, 
        CommonModule,
        MatGridListModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule
      ],
      providers: [
        UserService,
        { provide: UserService, useClass: UserServiceMock },
        { provide: ActivatedRoute, useClass: ActivatedRouteMock }
      ],
    });

    cy.wait(500);

    // Espera que se resuelvan las llamadas asíncronas
    cy.get('mat-card-subtitle').should('contain.text', 'Amount: 2');
  });
});