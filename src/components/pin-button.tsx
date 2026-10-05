import { PinIcon } from "lucide-react";

import { type ItemKind, useItemPin } from "@/components/item";
import { Button } from "@/components/ui/button";

type PinButtonProps = {
	id: string;
	kind: ItemKind;
	name: string;
};

export function PinButton({ id, kind, name }: PinButtonProps) {
	const { isPinned, togglePinned } = useItemPin(id, kind);
	const label = `${isPinned ? "Unpin" : "Pin"} ${name}`;

	return (
		<Button
			aria-label={label}
			aria-pressed={isPinned}
			onClick={togglePinned}
			size="icon-sm"
			title={label}
			type="button"
			variant={isPinned ? "secondary" : "ghost"}
		>
			<PinIcon className={isPinned ? "fill-current" : undefined} />
		</Button>
	);
}
