import { cn } from "cn";

import { Item } from "@/components/item";
import { ItemValue } from "@/components/item-value";
import { PinButton } from "@/components/pin-button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { matchesSearch, type IngredientSearchResult } from "@/utils/search";

type IngredientsViewProps = {
	rows: IngredientSearchResult[];
	searchTerm: string;
	normalizedSearchTerm: string;
};

export function IngredientsView({
	rows,
	searchTerm,
	normalizedSearchTerm,
}: IngredientsViewProps) {
	return (
		<Table className="border border-border bg-background">
			<TableHeader>
				<TableRow>
					<TableHead className="w-1/4">Ingredient</TableHead>
					<TableHead className="w-3/4">Effects</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{rows.length === 0 ? (
					<TableRow>
						<TableCell
							className="h-48 text-center whitespace-normal"
							colSpan={2}
						>
							<p className="text-center text-muted-foreground text-2xl">
								No ingredient or effect matched &quot;
								{searchTerm}
								&quot;.
							</p>
						</TableCell>
					</TableRow>
				) : (
					rows.map((row) => (
						<TableRow key={row.ingredient.id}>
							<TableHead
								className={cn(
									"align-middle",
									normalizedSearchTerm &&
										!matchesSearch(
											row.ingredient.name,
											normalizedSearchTerm,
										) &&
										"text-muted-foreground",
								)}
							>
								<span className="flex items-center">
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
								</span>
							</TableHead>
							<TableCell className="relative pr-10">
								<ul>
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
								<div className="absolute top-1 right-1">
									<PinButton
										id={row.ingredient.id}
										kind="ingredient"
										name={row.ingredient.name}
									/>
								</div>
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}
