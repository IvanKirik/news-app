import { Injectable } from '@angular/core';
import { ARTICLES } from './data';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  async getArticles() {
    await sleep(1000);
    return ARTICLES;
  }

  constructor() {}
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
