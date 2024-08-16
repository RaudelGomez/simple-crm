import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-6ee9d","appId":"1:1053868029107:web:aa63cbbe03fb86bc30ecc6","storageBucket":"simple-crm-6ee9d.appspot.com","apiKey":"AIzaSyDGGQ0hJl0kwIPL61vEYVY2mq9CuvbzVvE","authDomain":"simple-crm-6ee9d.firebaseapp.com","messagingSenderId":"1053868029107"})), provideFirestore(() => getFirestore())]
};

