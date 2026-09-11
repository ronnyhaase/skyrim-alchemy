import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "cn";
import type {
	EffectSearchResult,
	IngredientSearchResult,
} from "@/utils/search";
import { matchesSearch } from "@/utils/search";

type SplitViewProps = {
	ingredientRows: IngredientSearchResult[];
	effectRows: EffectSearchResult[];
	searchTerm: string;
	normalizedSearchTerm: string;
};

export function SplitView({
	ingredientRows,
	effectRows,
	searchTerm,
	normalizedSearchTerm,
}: SplitViewProps) {
	if (ingredientRows.length === 0 && effectRows.length === 0) {
		return (
			<p className="py-24 text-center text-muted-foreground text-2xl">
				No ingredient or effect matched &quot;
				{searchTerm}
				&quot;.
			</p>
		);
	}

	return (
		<div className="grid grid-cols-2 gap-4">
			<ul className="grid gap-2 content-start list-none m-0 p-0">
				{ingredientRows.map((row) => (
					<li key={row.ingredient.id}>
						<Card size="sm">
							<CardHeader>
								<CardTitle
									className={cn(
										normalizedSearchTerm &&
											!matchesSearch(
												row.ingredient.name,
												normalizedSearchTerm,
											) &&
											"text-muted-foreground",
									)}
								>
									{row.ingredient.name}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className="list-none m-0 p-0">
									{row.effects.map((effect) => (
										<li
											className={cn(
												normalizedSearchTerm &&
													!matchesSearch(
														effect.name,
														normalizedSearchTerm,
													) &&
													"text-muted-foreground",
											)}
											key={effect.id}
										>
											{effect.name}
										</li>
									))}
								</ul>
							</CardContent>
						</Card>
					</li>
				))}
			</ul>
			<ul className="grid gap-2 content-start list-none m-0 p-0">
				{effectRows.map((row) => (
					<li key={row.effect.id}>
						<Card size="sm">
							<CardHeader>
								<CardTitle
									className={cn(
										normalizedSearchTerm &&
											!matchesSearch(
												row.effect.name,
												normalizedSearchTerm,
											) &&
											"text-muted-foreground",
									)}
								>
									{row.effect.name}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className="list-none m-0 p-0">
									{row.ingredients.map((ingredient) => (
										<li
											className={cn(
												normalizedSearchTerm &&
													!matchesSearch(
														ingredient.name,
														normalizedSearchTerm,
													) &&
													"text-muted-foreground",
											)}
											key={ingredient.id}
										>
											{ingredient.name}
										</li>
									))}
								</ul>
							</CardContent>
						</Card>
					</li>
				))}
			</ul>
		</div>
	);
}
