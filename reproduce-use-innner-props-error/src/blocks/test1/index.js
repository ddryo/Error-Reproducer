/**
 * @WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import {
	InnerBlocks,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';

/**
 * registerBlockType
 */
import metadata from './block.json';
const { apiVersion, name, title, icon, category } = metadata;

registerBlockType(name, {
	apiVersion,
	title,
	icon,
	category,
	attributes: metadata.attributes,
	edit: ({ clientId }) => {
		// Only the first insertion will result in an infinite loop.
		const childBlocks = useSelect((select) => select('core/block-editor').getBlocks(clientId), [
			clientId,
		]);

		// Check the console.
		console.log('childBlocks:', childBlocks);

		// Block Props
		const blockProps = useBlockProps();
		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			allowedBlocks: ['test-blocks/test1-item'],
			template: [['test-blocks/test1-item'], ['test-blocks/test1-item']],
			templateLock: false,
		});

		return <div {...innerBlocksProps} />;
	},

	save: () => {
		const blockProps = useBlockProps.save();
		return (
			<div {...blockProps}>
				<InnerBlocks.Content />
			</div>
		);
	},
});
