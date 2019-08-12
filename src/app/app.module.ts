import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LaminationBuilderComponent } from './lamination-builder/lamination-builder.component';
import { LaminationViewerComponent } from './lamination-viewer/lamination-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    LaminationBuilderComponent,
    LaminationViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
