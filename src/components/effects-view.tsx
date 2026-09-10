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
	type EffectSearchResult,
} from "@/utils/search";

type EffectsViewProps = {
	rows: EffectSearchResult[];
	searchTerm: string;
};

export function EffectsView({ rows, searchTerm }: EffectsViewProps) {
	const normalizedSearchTerm = normalizeSearchTerm(searchTerm);

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-1/4">Effect</TableHead>
					<TableHead className="w-3/4">Ingredients</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{rows.length === 0 ? (
					<TableRow>
						<TableCell className="h-48 text-center whitespace-normal" colSpan={2}>
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
									normalizedSearchTerm &&
										!matchesSearch(row.effect.name, normalizedSearchTerm) &&
										"text-muted-foreground",
								)}
							>
								{row.effect.name}
							</TableHead>
							<TableCell>
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
											{ingredient.name}
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
