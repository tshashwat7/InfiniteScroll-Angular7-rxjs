import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
// /photos?_page='+page);  
@Injectable()
export class NewsService {

  constructor(private http: Http) { }

  getLatestStories(page: number = 1) {
    return this.http.get(`${BASE_URL}/photos?_page=${page}`);
  }
}
