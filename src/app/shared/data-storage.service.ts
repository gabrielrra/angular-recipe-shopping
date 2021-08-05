import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  private baseUrl =
    'https://angular-first-app-e46a1-default-rtdb.firebaseio.com';
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http
      .put(`${this.baseUrl}/posts.json`, recipes)
      .subscribe((response) => {
        console.log(response);
      });
  }
  fetchRecipes() {
    return this.http.get<Recipe[]>(`${this.baseUrl}/posts.json`).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
    // .subscribe((response) => {
    //   this.recipeService.setRecipes(response);
    // });
  }
}
