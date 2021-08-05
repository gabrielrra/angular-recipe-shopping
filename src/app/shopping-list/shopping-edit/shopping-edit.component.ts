import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  units = [];

  editIngredientSub: Subscription;
  editMode = false;
  editingIndex;

  @ViewChild('ingredientForm') ingForm: NgForm;

  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.units = this.recipeService.getUnits();
    this.editIngredientSub =
      this.shoppingListService.editingIngredient.subscribe((index) => {
        this.editMode = true;
        this.editingIndex = index;

        let { name, amount, unit } =
          this.shoppingListService.getIngredient(index);
        this.ingForm.setValue({ name, amount, unit });
      });
  }
  onSubmit(ingredientForm: NgForm) {
    let { name = '-', amount = 0, unit = '-' } = ingredientForm.value;
    const newIngredient = new Ingredient(name, Number(amount), unit);
    if (this.editMode) {
      this.shoppingListService.editIngredient(newIngredient, this.editingIndex);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.clearForm();
  }
  clearForm() {
    this.ingForm.reset();
    this.ingForm.setValue({ name: '', amount: '', unit: 'g' });
    this.editMode = false;
  }
  onDelete() {
    this.shoppingListService.deleteIngredient(this.editingIndex);
    this.clearForm();
  }

  ngOnDestroy() {
    this.editIngredientSub.unsubscribe();
  }
}
