import { Component } from '@angular/core';
import {NewsService} from './news.service';
import {tap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'infiniteScroll';
  currentPage: number = 1;
  news: Array<any> = [];
  scrollCallback;
  constructor(private ns :NewsService){
    this.scrollCallback = this.getStories.bind(this);
  }
  getStories() {
    return this.ns.getLatestStories(this.currentPage).pipe(tap(this.processData));
  }

  private processData = (news) => {
    this.currentPage++;
    this.news = this.news.concat(news.json());
  }

}
