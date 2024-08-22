import { DashboardComponent } from '../src/app/dashboard/dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../src/app/services/user.service';
import { ActivatedRouteMock } from '../src/mocks/activated-route.mock';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserServiceMock } from '../src/mocks/user.service.mock';
import { UserComponent } from '../src/app/user/user.component';
import { UserDetailComponent } from '../src/app/user-detail/user-detail.component';

// const routes: Routes = [
//   { path: 'user', component: UserComponent }, // Asegúrate de definir `UserComponent`
//   {path: 'user', component: UserComponent},
//   {path: 'user/:id', component: UserDetailComponent}
// ];

describe('DashboardComponent.cy.ts', () => {
  it('Show count', () => {
     // Crear un espía para el router
    // const routerSpy = cy.spy().as('routerSpy');

    cy.mount(DashboardComponent, {
      imports: [
        BrowserModule,
        HttpClientTestingModule, 
        CommonModule,
        MatGridListModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        // RouterModule.forRoot(routes) // Configura las rutas para la prueba
      ],
      providers: [
        UserService,
        { provide: UserService, useClass: UserServiceMock },
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        // { provide: Router, useValue: { navigate: routerSpy } }
      ],
    });  

    // Espera que se resuelvan las llamadas asíncronas
    cy.get('[data-cy=amount]').should('contain.text', 'Amount: 2');

    //Test go to page users
    //cy.get('[data-cy=go-users-click]').click();
    // Asumiendo que 'users' es el path al que debe redirigir, verifica que la URL ha cambiado
     // Verifica si la función `navigate` del router fue llamada con el path esperado
    //  cy.get('@routerSpy').should('be.calledWith', ['/user']);

  });
});