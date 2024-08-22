// src/mocks/activated-route.mock.ts
import { of } from 'rxjs';

// Mock para ActivatedRoute
export class ActivatedRouteMock {
  params = of({}); // Puedes personalizar este mock para devolver parámetros específicos si es necesario
  snapshot = { params: {} }; // También puedes proporcionar un snapshot simulado si lo necesitas
}
