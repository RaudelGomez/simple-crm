import { DashboardComponent } from '../src/app/dashboard/dashboard.component';
import { FirestoreMock } from '../src/mocks/firestore.mock';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../src/app/services/user.service';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRouteMock } from '../src/mocks/activated-route.mock';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


describe('DashboardComponent.cy.ts', () => {
  it('Show count', () => {
    cy.mount(DashboardComponent, {
      imports: [
        BrowserModule,
        HttpClientTestingModule, // Agrega los módulos que tu componente necesita
        CommonModule,
        MatGridListModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule
      ],
      providers: [
        UserService,
        { provide: Firestore, useClass: FirestoreMock }, // Usa el mock para Firestore
        { provide: ActivatedRoute, useClass: ActivatedRouteMock } // Usa el mock para ActivatedRoute
      ],
    });

     // Verifica el contenido del elemento que muestra el conteo de usuarios
    cy.get('mat-card-subtitle').should('contain.text', 'Amount: 2');
    // Puedes agregar assertions aquí para verificar el comportamiento esperado
    // Por ejemplo:
    // cy.get('selector').should('contain.text', 'expected text');
  });
});