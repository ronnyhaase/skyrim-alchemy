import type { Effect, Ingredient } from "@/types";

export type EffectSearchResult = {
	effect: Effect;
	ingredients: Ingredient[];
};

function matchesSearch(value: string, normalizedSearchTerm: string) {
	return value.toLowerCase().includes(normalizedSearchTerm);
}

function getIngredientsForEffect(effect: Effect, ingredients: Ingredient[]) {
	return ingredients.filter((ingredient) =>
		ingredient.effects.includes(effect.id),
	);
}

export function searchByEffect(
	effects: Effect[],
	ingredients: Ingredient[],
	searchTerm: string,
): EffectSearchResult[] {
	const normalizedSearchTerm = searchTerm.trim().toLowerCase();

	if (!normalizedSearchTerm) {
		return effects.map((effect) => ({
			effect,
			ingredients: getIngredientsForEffect(effect, ingredients),
		}));
	}

	return effects
		.map((effect) => {
			const ingredientsWithEffect = getIngredientsForEffect(effect, ingredients);
			const effectMatches = matchesSearch(effect.name, normalizedSearchTerm);
			const matchingIngredients = ingredientsWithEffect.filter((ingredient) =>
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
