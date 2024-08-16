import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';


import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-f78a3","appId":"1:1025832021229:web:1569519abe3ea1146770e4","storageBucket":"simple-crm-f78a3.appspot.com","apiKey":"AIzaSyAFFmJurut8Kh57bOxt0rNXcFFjQd66xc0","authDomain":"simple-crm-f78a3.firebaseapp.com","messagingSenderId":"1025832021229"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};

