import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  selectedRecipe = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();
  units: string[] = [
    'g',
    'kg',
    'ml',
    'L',
    'tbsp',
    'cup(s)',
    'lb',
    'piece(s)',
    'unit(s)',
  ];

  recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getUnits() {
    return this.units.slice();
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipeById(id: number) {
    if (id > this.recipes.length - 1) {
      return new Recipe(
        'Recipe not found',
        'The recipe you are trying to access does not exist :(',
        'not-found',
        []
      );
    } else {
      return this.recipes.slice()[id];
    }
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(newRecipe: Recipe, index: number) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
  setRecipes(newRecipes: Recipe[]) {
    this.recipes = newRecipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
