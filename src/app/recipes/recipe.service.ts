import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";


@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    
    //recipeSelected = new EventEmitter<Recipe>(); implemented communication on routing
    
    private recipes: Recipe[] = [
        new Recipe('Mutton gravy', 'Tasty South Indian mutton gravy',
         'https://www.eastcoastdaily.in/wp-content/uploads/2018/09/dhaba-style-mutton-gravy.jpg',
         [ new Ingredient('Meat', 1), new Ingredient('Tomato', 5) ]),
        new Recipe('Mutton briyani', 'Authentic South Tamil mutton briyani', 
         'https://starbriyani.files.wordpress.com/2018/07/mutton-biryani.jpg',
         [ new Ingredient('Rice', 1), new Ingredient('Onion', 5) ])
    ];

    constructor(private slService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }  

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngrdientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice()); //returns a updated copy of array
    }

    updateRecipe(index: number,newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}