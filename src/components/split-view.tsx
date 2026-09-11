import type {
	EffectSearchResult,
	IngredientSearchResult,
} from "@/utils/search";

type SplitViewProps = {
	ingredientRows: IngredientSearchResult[];
	effectRows: EffectSearchResult[];
};

export function SplitView({ ingredientRows, effectRows }: SplitViewProps) {
	return (
		<div className="grid grid-cols-2 gap-4">
			<ul>
				{ingredientRows.map((row) => (
					<li key={row.ingredient.id}>{row.ingredient.name}</li>
				))}
			</ul>
			<ul>
				{effectRows.map((row) => (
					<li key={row.effect.id}>{row.effect.name}</li>
				))}
			</ul>
		</div>
	);
}
