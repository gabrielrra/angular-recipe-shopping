import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }
  onAddIngredient(nameInputEl: HTMLInputElement, amountInputEl: HTMLInputElement, unitInputEl: HTMLInputElement){
    let name = nameInputEl.value
    let amount = amountInputEl.value
    let unit = unitInputEl.value
    const newIngredient = new Ingredient(name, Number(amount), unit)
    this.shoppingListService.addIngredient(newIngredient)
  }
}
