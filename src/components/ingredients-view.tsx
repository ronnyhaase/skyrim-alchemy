import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
	matchesSearch,
	normalizeSearchTerm,
	type IngredientSearchResult,
} from "@/utils/search";

type IngredientsViewProps = {
	rows: IngredientSearchResult[];
	searchTerm: string;
};

export function IngredientsView({ rows, searchTerm }: IngredientsViewProps) {
	const normalizedSearchTerm = normalizeSearchTerm(searchTerm);

	return (
		<Table>
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
									normalizedSearchTerm &&
										!matchesSearch(
											row.ingredient.name,
											normalizedSearchTerm,
										) &&
										"text-muted-foreground",
								)}
							>
								{row.ingredient.name}
							</TableHead>
							<TableCell>
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
											{effect.name}
										</li>
									))}
								</ul>
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
}
