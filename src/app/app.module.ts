import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { WeatherDataService } from './Services/weather-data.service';
import { DebugApiComponent } from './debug-api/debug-api.component';
import { ContainerComponent } from './container/container.component';
import { TemperaturePipe } from './Pipes/temperature.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputTextModule } from 'primeng/inputtext'
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressBarModule } from 'primeng/progressbar';
import { ListboxModule } from 'primeng/listbox';

@NgModule({
  declarations: [
    AppComponent,
    DebugApiComponent,
    ContainerComponent,
    TemperaturePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    RippleModule,
    ButtonModule,
    OverlayPanelModule,
    InputTextModule,
    SkeletonModule,
    ProgressBarModule,
    ListboxModule
  ],
  providers: [WeatherDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
