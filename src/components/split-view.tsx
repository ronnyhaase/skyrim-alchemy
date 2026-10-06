import { cn } from "cn";

import { Item } from "@/components/item";
import { ItemValue } from "@/components/item-value";
import { PinButton } from "@/components/pin-button";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	type EffectSearchResult,
	type IngredientSearchResult,
	matchesSearch,
} from "@/utils/search";

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
			<ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 content-start list-none m-0 p-0">
				{ingredientRows.map((row) => (
					<li key={row.ingredient.id}>
						<Card size="sm">
							<CardHeader>
								<CardTitle
									className={cn(
										"flex items-center",
										normalizedSearchTerm &&
											!matchesSearch(
												row.ingredient.name,
												normalizedSearchTerm,
											) &&
											"text-muted-foreground",
									)}
								>
									<span>
										<Item
											id={row.ingredient.id}
											kind="ingredient"
											name={row.ingredient.name}
										/>
										{row.ingredient.addon && (
											<sup className="pl-1 text-muted-foreground">
												{row.ingredient.addon}
											</sup>
										)}
									</span>
									<ItemValue value={row.ingredient.value} />
								</CardTitle>
								<CardAction>
									<PinButton
										id={row.ingredient.id}
										kind="ingredient"
										name={row.ingredient.name}
									/>
								</CardAction>
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
											<Item
												id={effect.id}
												kind="effect"
												name={effect.name}
											/>
										</li>
									))}
								</ul>
							</CardContent>
						</Card>
					</li>
				))}
			</ul>
			<ul className="grid grid-cols-1 gap-2 content-start list-none m-0 p-0">
				{effectRows.map((row) => (
					<li key={row.effect.id}>
						<Card size="sm">
							<CardHeader>
								<CardTitle
									className={cn(
										"flex items-center",
										normalizedSearchTerm &&
											!matchesSearch(
												row.effect.name,
												normalizedSearchTerm,
											) &&
											"text-muted-foreground",
									)}
								>
									<Item
										id={row.effect.id}
										kind="effect"
										name={row.effect.name}
									/>
									<ItemValue value={row.effect.valueAt100} />
								</CardTitle>
								<CardAction>
									<PinButton
										id={row.effect.id}
										kind="effect"
										name={row.effect.name}
									/>
								</CardAction>
							</CardHeader>
							<CardContent>
								<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 list-none m-0 p-0">
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
											<Item
												id={ingredient.id}
												kind="ingredient"
												name={ingredient.name}
											/>
											{ingredient.addon && (
												<sup className="pl-1 text-muted-foreground">
													{ingredient.addon}
												</sup>
											)}
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
