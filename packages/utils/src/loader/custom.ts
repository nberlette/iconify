import createDebugger from 'debug';
import type {
	CustomIconLoader,
	IconCustomizations,
	InlineCollection,
} from './types';
import { mergeIconProps } from './utils';

const debug = createDebugger('@iconify-loader:custom');

/**
 * Get custom icon from inline collection or using loader
 */
export async function getCustomIcon(
	custom: CustomIconLoader | InlineCollection,
	collection: string,
	icon: string,
	iconsCustomizations?: IconCustomizations
): Promise<string | undefined> {
	let result: string | undefined | null;

	debug(`${collection}:${icon}`);

	if (typeof custom === 'function') {
		result = await custom(icon);
	} else {
		const inline = custom[icon];
		result = typeof inline === 'function' ? await inline() : inline;
	}

	if (result) {
		if (!result.startsWith('<svg ')) {
			console.warn(
				`Custom icon "${icon}" in "${collection}" is not a valid SVG`
			);
			return result;
		}
		const {
			transform,
			additionalProps = {},
			iconCustomizer,
		} = iconsCustomizations || {};
		return await mergeIconProps(
			transform ? await transform(result) : result,
			collection,
			icon,
			additionalProps,
			undefined,
			iconCustomizer
		);
	}
}
