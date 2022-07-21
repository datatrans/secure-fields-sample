import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DatatransWidgetComponent } from './datatrans-widget/datatrans-widget.component';

@NgModule({
  declarations: [	
    AppComponent,
      DatatransWidgetComponent
   ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
