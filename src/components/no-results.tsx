import { cn } from "cn";

type NoResultsProps = {
	className?: string;
};

export function NoResults({ className }: NoResultsProps) {
	return (
		<p
			className={cn(
				"text-2xl text-center text-muted-foreground",
				className,
			)}
		>
			No ingredient or effect matched your search and filters.
		</p>
	);
}
