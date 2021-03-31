/**
 * @WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
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
	edit: () => {
		const blockProps = useBlockProps();
		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			allowedBlocks: ['test-blocks/test2-item'],
			template: [['test-blocks/test2-item'], ['test-blocks/test2-item']],
			templateLock: 'all',
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
