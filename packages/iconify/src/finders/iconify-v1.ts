import type { IconifyFinder } from './interface';
import type { IconifyElement } from '../modules/element';
import type { IconifyIconCustomisations } from '@iconify/utils/lib/customisations';
import { rotateFromString } from '@iconify/utils/lib/customisations/rotate';
import {
	flipFromString,
	alignmentFromString,
} from '@iconify/utils/lib/customisations/shorthand';

/**
 * Check if attribute exists
 */
function hasAttribute(element: IconifyElement, key: string) {
	return element.hasAttribute(key);
}

/**
 * Get attribute value
 */
function getAttribute(element: IconifyElement, key: string): string {
	return element.getAttribute(key) as string;
}

/**
 * Get attribute value
 */
function getBooleanAttribute(
	element: IconifyElement,
	key: string
): boolean | null {
	const value = element.getAttribute(key) as string;
	if (value === key || value === 'true') {
		return true;
	}
	if (value === '' || value === 'false') {
		return false;
	}
	return null;
}

/**
 * Boolean attributes
 */
const booleanAttributes: (keyof IconifyIconCustomisations)[] = [
	'inline',
	'hFlip',
	'vFlip',
];

/**
 * String attributes
 */
const stringAttributes: (keyof IconifyIconCustomisations)[] = [
	'width',
	'height',
];

/**
 * Class names
 */
const mainClass = 'iconify';

/**
 * Selector combining class names and tags
 */
const selector = 'i.' + mainClass + ', span.' + mainClass;

/**
 * Export finder for:
 *  <span class="iconify" />
 *  <i class="iconify" />
 *  <span class="iconify-inline" />
 *  <i class="iconify-inline" />
 */
const finder: IconifyFinder = {
	/**
	 * Find all elements
	 */
	find: (root: HTMLElement): NodeList => root.querySelectorAll(selector),

	/**
	 * Get icon name from element
	 */
	name: (element: IconifyElement): string | null => {
		if (hasAttribute(element, 'data-icon')) {
			return getAttribute(element, 'data-icon');
		}
		return null;
	},

	/**
	 * Get customisations list from element
	 */
	customisations: (
		element: IconifyElement,
		defaultValues: IconifyIconCustomisations = {
			inline: true,
		}
	): IconifyIconCustomisations => {
		const result: IconifyIconCustomisations = defaultValues;

		// Rotation
		if (hasAttribute(element, 'data-rotate')) {
			const value = rotateFromString(
				getAttribute(element, 'data-rotate')
			);
			if (value) {
				result.rotate = value;
			}
		}

		// Shorthand attributes
		if (hasAttribute(element, 'data-flip')) {
			flipFromString(result, getAttribute(element, 'data-flip'));
		}
		if (hasAttribute(element, 'data-align')) {
			alignmentFromString(result, getAttribute(element, 'data-align'));
		}

		// Boolean attributes
		booleanAttributes.forEach((attr) => {
			if (hasAttribute(element, 'data-' + attr)) {
				const value = getBooleanAttribute(element, 'data-' + attr);
				if (typeof value === 'boolean') {
					(result as Record<string, boolean>)[attr] = value;
				}
			}
		});

		// String attributes
		stringAttributes.forEach((attr) => {
			if (hasAttribute(element, 'data-' + attr)) {
				const value = getAttribute(element, 'data-' + attr);
				if (value !== '') {
					(result as Record<string, string>)[attr] = value;
				}
			}
		});

		return result;
	},

	/**
	 * Filter classes
	 */
	classFilter: (classList: string[]): string[] => {
		const result: string[] = [];
		classList.forEach((className) => {
			if (
				className !== 'iconify' &&
				className !== '' &&
				className.slice(0, 9) !== 'iconify--'
			) {
				result.push(className);
			}
		});
		return result;
	},
};

export { finder };
