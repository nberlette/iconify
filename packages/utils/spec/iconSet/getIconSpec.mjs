import { getIconData } from '@iconify/utils/lib/icon-set/get-icon';

describe('Testing getting icon data', () => {
	it('Simple icon', () => {
		// Short icon
		const result1 = getIconData(
			{
				prefix: 'foo',
				icons: {
					bar: {
						body: '<g />',
						width: 24,
					},
				},
			},
			'bar',
			false
		);
		expect(result1).toEqual({
			body: '<g />',
			width: 24,
		});

		// Full icon
		const result2 = getIconData(
			{
				prefix: 'foo',
				icons: {
					bar: {
						body: '<g />',
						width: 24,
					},
				},
			},
			'bar',
			true
		);
		expect(result2).toEqual({
			body: '<g />',
			left: 0,
			top: 0,
			width: 24,
			height: 16,
			rotate: 0,
			vFlip: false,
			hFlip: false,
		});
	});

	it('Minified icon set', () => {
		// Short icon
		const result1 = getIconData(
			{
				prefix: 'foo',
				icons: {
					bar: {
						body: '<g />',
					},
				},
				width: 24,
				height: 24,
			},
			'bar',
			false
		);
		expect(result1).toEqual({
			body: '<g />',
			width: 24,
			height: 24,
		});

		// Full icon
		const result2 = getIconData(
			{
				prefix: 'foo',
				icons: {
					bar: {
						body: '<g />',
					},
				},
				width: 24,
				height: 24,
			},
			'bar',
			true
		);
		expect(result2).toEqual({
			body: '<g />',
			left: 0,
			top: 0,
			width: 24,
			height: 24,
			rotate: 0,
			vFlip: false,
			hFlip: false,
		});
	});
});
