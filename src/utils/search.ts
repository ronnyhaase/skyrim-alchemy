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

function putPinnedFirst<Result>(
	results: Result[],
	isPinned: (result: Result) => boolean,
) {
	return [
		...results.filter(isPinned),
		...results.filter((result) => !isPinned(result)),
	];
}

export function searchByEffect(
	effects: Effect[],
	ingredients: Ingredient[],
	normalizedSearchTerm: string,
	isPinned: (id: string) => boolean = () => false,
): EffectSearchResult[] {
	if (!normalizedSearchTerm) {
		return putPinnedFirst(
			effects.map((effect) => ({
				effect,
				ingredients: getIngredientsForEffect(effect, ingredients),
			})),
			(result) => isPinned(result.effect.id),
		);
	}

	const results = effects
		.map((effect) => {
			const ingredientsWithEffect = getIngredientsForEffect(
				effect,
				ingredients,
			);
			const effectMatches = matchesSearch(
				effect.name,
				normalizedSearchTerm,
			);
			const effectIsPinned = isPinned(effect.id);
			const matchingIngredients = ingredientsWithEffect.filter(
				(ingredient) =>
					matchesSearch(ingredient.name, normalizedSearchTerm),
			);

			if (
				!effectIsPinned &&
				!effectMatches &&
				matchingIngredients.length === 0
			) {
				return null;
			}

			return {
				effect,
				ingredients:
					effectIsPinned || effectMatches
						? ingredientsWithEffect
						: matchingIngredients,
			};
		})
		.filter((row) => row !== null);

	return putPinnedFirst(results, (result) => isPinned(result.effect.id));
}

export function searchByIngredient(
	effects: Effect[],
	ingredients: Ingredient[],
	normalizedSearchTerm: string,
	isPinned: (id: string) => boolean = () => false,
): IngredientSearchResult[] {
	if (!normalizedSearchTerm) {
		return putPinnedFirst(
			ingredients.map((ingredient) => ({
				ingredient,
				effects: getEffectsForIngredient(ingredient, effects),
			})),
			(result) => isPinned(result.ingredient.id),
		);
	}

	const results = ingredients
		.map((ingredient) => {
			const effectsForIngredient = getEffectsForIngredient(
				ingredient,
				effects,
			);
			const ingredientMatches = matchesSearch(
				ingredient.name,
				normalizedSearchTerm,
			);
			const ingredientIsPinned = isPinned(ingredient.id);
			const matchingEffects = effectsForIngredient.filter((effect) =>
				matchesSearch(effect.name, normalizedSearchTerm),
			);

			if (
				!ingredientIsPinned &&
				!ingredientMatches &&
				matchingEffects.length === 0
			) {
				return null;
			}

			return {
				ingredient,
				effects: effectsForIngredient,
			};
		})
		.filter((row) => row !== null);

	return putPinnedFirst(results, (result) => isPinned(result.ingredient.id));
}
