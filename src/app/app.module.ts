import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearchDogComponent } from './components/search-dog/search-dog.component';
import { FoundDogComponent } from './components/found-dog/found-dog.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PostComponent } from './components/post/post.component';
import { ImageSliderComponent } from './components/image-slider/image-slider.component';
import { FormComponent } from './components/form/form.component';

import { AngularFireModule } from '@angular/fire/compat';
import {
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';

import { environment } from '../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AuthService } from './services/auth.service';
import { EditpostComponent } from './components/editpost/editpost.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToUpperCasePipe } from './pipes/to-uppercase.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchDogComponent,
    FoundDogComponent,
    HeaderComponent,
    FooterComponent,
    PostComponent,
    FormComponent,
    ImageSliderComponent,
    AuthDialogComponent,
    EditpostComponent,
    ToUpperCasePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    FlexLayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [ScreenTrackingService, UserTrackingService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
