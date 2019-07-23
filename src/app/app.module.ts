import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BoardModule } from './board/board.module';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BoardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
