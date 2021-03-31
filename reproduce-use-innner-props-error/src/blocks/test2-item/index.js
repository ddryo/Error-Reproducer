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
const { apiVersion, name, title, icon, category, parent } = metadata;
// const ALLOWED_BLOCKS = ['core/paragraph', 'core/list'];

registerBlockType(name, {
	apiVersion,
	title,
	icon,
	category,
	parent,
	attributes: metadata.attributes,
	edit: () => {
		const blockProps = useBlockProps();
		const innerBlocksProps = useInnerBlocksProps(blockProps, {
			allowedBlocks: ['core/paragraph', 'core/list'], // -> Using ALLOWED_BLOCKS seems to prevent the error.
			template: [['core/paragraph']],
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
