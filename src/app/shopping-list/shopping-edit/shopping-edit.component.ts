import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  units = ['g', 'kg', 'ml', 'L', 'tbsp', 'cup(s)', 'lb', 'piece(s)', 'unit(s)'];

  editIngredientSub: Subscription;
  editMode = false;
  editingIndex;

  @ViewChild('ingredientForm') ingForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
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
      this.editMode = false;
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    ingredientForm.setValue({ name: '', amount: '', unit: 'g' });
  }
  onClear() {
    this.ingForm.setValue({ name: '', amount: '', unit: 'g' });
  }

  ngOnDestroy() {
    this.editIngredientSub.unsubscribe();
  }
}
