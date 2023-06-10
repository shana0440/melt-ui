import { elementDerived } from '$lib/internal/helpers';
import { derived, writable } from 'svelte/store';

type CreateCollapsibleArgs = {
	open?: boolean;
	onChange?: (open: boolean) => void;
	disabled?: boolean;
};

const defaults = {
	open: false,
	disabled: false,
} satisfies CreateCollapsibleArgs;

export function createCollapsible(args?: CreateCollapsibleArgs) {
	const options = { ...defaults, ...args };

	const open = writable(options.open);
	open.subscribe((open) => {
		options.onChange?.(open);
	});

	const root = derived(open, ($open) => ({
		'data-state': $open ? 'open' : 'closed',
		'data-disabled': options.disabled ? 'true' : 'undefined',
	}));

	const trigger = elementDerived(open, ($open, attach) => {
		if (!options.disabled) {
			attach('click', () => open.set(!$open));
		}

		return {
			'data-state': $open ? 'open' : 'closed',
			'data-disabled': options.disabled ? 'true' : undefined,
		};
	});

	const content = derived(open, ($open) => ({
		'data-state': $open ? 'open' : 'closed',
		'data-disabled': options.disabled ? 'true' : undefined,
		hidden: $open ? undefined : true,
	}));

	return {
		root,
		trigger,
		content,
		open,
	};
}