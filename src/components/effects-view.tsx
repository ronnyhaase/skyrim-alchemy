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
import { matchesSearch, type EffectSearchResult } from "@/utils/search";

type EffectsViewProps = {
	rows: EffectSearchResult[];
	searchTerm: string;
	normalizedSearchTerm: string;
};

export function EffectsView({
	rows,
	searchTerm,
	normalizedSearchTerm,
}: EffectsViewProps) {
	return (
		<Table className="border border-border bg-background">
			<TableHeader>
				<TableRow>
					<TableHead className="w-1/4">Effect</TableHead>
					<TableHead className="w-3/4">Ingredients</TableHead>
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
						<TableRow key={row.effect.id}>
							<TableHead
								className={cn(
									"align-middle",
									normalizedSearchTerm &&
										!matchesSearch(
											row.effect.name,
											normalizedSearchTerm,
										) &&
										"text-muted-foreground",
								)}
							>
								<span className="flex items-center">
									<Item
										id={row.effect.id}
										kind="effect"
										name={row.effect.name}
									/>
									<ItemValue value={row.effect.valueAt100} />
								</span>
							</TableHead>
							<TableCell className="relative pr-10">
								<ul>
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
										</li>
									))}
								</ul>
								<div className="absolute top-1 right-1">
									<PinButton
										id={row.effect.id}
										kind="effect"
										name={row.effect.name}
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
