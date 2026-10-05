import { CoinsIcon } from "lucide-react";

type ItemValueProps = {
	value: number;
};

export function ItemValue({ value }: ItemValueProps) {
	return (
		<span className="inline-flex items-center gap-1 pl-2 text-amber-500">
			<CoinsIcon className="size-4 text-amber-500" />
			{value}
		</span>
	);
}
