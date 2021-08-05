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

  recipes: Recipe[] = [
    new Recipe(
      'Chicken Parmigiana',
      'Delicious fried chicken with tomato sauce and cheese',
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-202102-airfryerchickenparm-180-ls-1612561654.jpg?crop=1.00xw:1.00xh;0,0&resize=980:*',
      [
        new Ingredient('Chicken', 1, 'kg'),
        new Ingredient('Tomato sauce', 100, 'g'),
      ]
    ),
    new Recipe(
      'Cacio ao Pepe',
      'Simple yet complex pasta',
      'https://img.itdg.com.br/tdg/images/blog/uploads/2018/09/espaguete-cacio-e-pepe.jpg?w=1200',
      [
        new Ingredient('Spaghetti', 100, 'g'),
        new Ingredient('Pecorino cheese', 300, 'g'),
      ]
    ),
  ];

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
}
