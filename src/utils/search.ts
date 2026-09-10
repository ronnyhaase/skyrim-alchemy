import type { Effect, Ingredient } from "@/types";

export type EffectSearchResult = {
	effect: Effect;
	ingredients: Ingredient[];
};

export type IngredientSearchResult = {
	ingredient: Ingredient;
	effects: Effect[];
};

export function normalizeSearchTerm(searchTerm: string) {
	return searchTerm.trim().toLowerCase();
}

export function matchesSearch(value: string, normalizedSearchTerm: string) {
	return value.toLowerCase().includes(normalizedSearchTerm);
}

function getIngredientsForEffect(effect: Effect, ingredients: Ingredient[]) {
	return ingredients.filter((ingredient) =>
		ingredient.effects.includes(effect.id),
	);
}

function getEffectsForIngredient(ingredient: Ingredient, effects: Effect[]) {
	return effects.filter((effect) => ingredient.effects.includes(effect.id));
}

export function searchByEffect(
	effects: Effect[],
	ingredients: Ingredient[],
	searchTerm: string,
): EffectSearchResult[] {
	const normalizedSearchTerm = normalizeSearchTerm(searchTerm);

	if (!normalizedSearchTerm) {
		return effects.map((effect) => ({
			effect,
			ingredients: getIngredientsForEffect(effect, ingredients),
		}));
	}

	return effects
		.map((effect) => {
			const ingredientsWithEffect = getIngredientsForEffect(
				effect,
				ingredients,
			);
			const effectMatches = matchesSearch(
				effect.name,
				normalizedSearchTerm,
			);
			const matchingIngredients = ingredientsWithEffect.filter(
				(ingredient) =>
					matchesSearch(ingredient.name, normalizedSearchTerm),
			);

			if (!effectMatches && matchingIngredients.length === 0) {
				return null;
			}

			return {
				effect,
				ingredients: effectMatches
					? ingredientsWithEffect
					: matchingIngredients,
			};
		})
		.filter((row) => row !== null);
}

export function searchByIngredient(
	effects: Effect[],
	ingredients: Ingredient[],
	searchTerm: string,
): IngredientSearchResult[] {
	const normalizedSearchTerm = normalizeSearchTerm(searchTerm);

	if (!normalizedSearchTerm) {
		return ingredients.map((ingredient) => ({
			ingredient,
			effects: getEffectsForIngredient(ingredient, effects),
		}));
	}

	return ingredients
		.map((ingredient) => {
			const effectsForIngredient = getEffectsForIngredient(
				ingredient,
				effects,
			);
			const ingredientMatches = matchesSearch(
				ingredient.name,
				normalizedSearchTerm,
			);
			const matchingEffects = effectsForIngredient.filter((effect) =>
				matchesSearch(effect.name, normalizedSearchTerm),
			);

			if (!ingredientMatches && matchingEffects.length === 0) {
				return null;
			}

			return {
				ingredient,
				effects: effectsForIngredient,
			};
		})
		.filter((row) => row !== null);
}
