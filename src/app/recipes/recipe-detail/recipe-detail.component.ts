import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
  // @Input() recipe: Recipe;
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    //const id = this.route.snapshot.params['id']; //only works when we first load the page
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']; // casted from string to number (+)
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    )
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../',this.id,'edit'], {relativeTo: this.route});
  }

  onAddToShoppingList() {
    this.recipeService.addIngrdientsToShoppingList(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
