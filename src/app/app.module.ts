import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {InfiniteScrollDirective} from './directive/infinitescroll.directive';

import { WINDOW_PROVIDERS } from './service/window.service';
import { NewsService } from './news.service';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    InfiniteScrollDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    
  ],
  providers: [WINDOW_PROVIDERS, NewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
