import {
	createContext,
	type ReactNode,
	useContext,
	useMemo,
	useState,
} from "react";
import { cn } from "cn";

import { useSearch } from "@/components/search";

type ItemKind = "effect" | "ingredient";

type HighlightedItem = {
	id: string;
	kind: ItemKind;
};

type ItemContextValue = {
	highlightedItem: HighlightedItem | null;
	setHighlightedItem: (item: HighlightedItem | null) => void;
};

const ItemContext = createContext<ItemContextValue | null>(null);

type ItemProviderProps = {
	children: ReactNode;
};

export function ItemProvider({ children }: ItemProviderProps) {
	const [highlightedItem, setHighlightedItem] =
		useState<HighlightedItem | null>(null);

	const value = useMemo(
		() => ({
			highlightedItem,
			setHighlightedItem,
		}),
		[highlightedItem],
	);

	return (
		<ItemContext.Provider value={value}>{children}</ItemContext.Provider>
	);
}

type ItemProps = {
	children?: ReactNode;
	className?: string;
	id: string;
	kind: ItemKind;
	name: string;
};

function itemsAreEqual(item: HighlightedItem | null, other: HighlightedItem) {
	return item?.kind === other.kind && item.id === other.id;
}

export function Item({ children, className, id, kind, name }: ItemProps) {
	const context = useContext(ItemContext);
	const { setSearchTerm } = useSearch();

	if (!context) {
		throw new Error("Item must be used within an ItemProvider.");
	}

	const item = { id, kind };
	const isHighlighted = itemsAreEqual(context.highlightedItem, item);

	return (
		<button
			className={cn(
				"-mx-1 inline rounded-sm px-1 text-left text-inherit transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-ring",
				isHighlighted && "bg-primary text-primary-foreground",
				className,
			)}
			onClick={() => setSearchTerm(name)}
			onMouseEnter={() => context.setHighlightedItem(item)}
			onMouseLeave={() => {
				if (itemsAreEqual(context.highlightedItem, item)) {
					context.setHighlightedItem(null);
				}
			}}
			type="button"
		>
			{children ?? name}
		</button>
	);
}
