/* eslint import/no-unresolved: 0 */

/**
 * @WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';

import { PanelBody, Button, SelectControl } from '@wordpress/components';

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
	edit: ({ attributes, setAttributes }) => {
		const { mediaId, mediaUrl, mediaType } = attributes;

		const setImage = (media) => {
			setAttributes({
				mediaId: media.id,
				mediaUrl: media.url,
			});
		};

		const removeImage = () => {
			setAttributes({
				mediaId: 0,
				mediaUrl: '',
			});
		};

		let allowedTypes = ['image', 'video'];
		if ('image' === mediaType) {
			allowedTypes = ['image'];
		} else if ('video' === mediaType) {
			allowedTypes = ['video'];
		}

		return (
			<>
				<InspectorControls>
					<PanelBody title='setting'>
						<SelectControl
							label='Media type'
							value={mediaType}
							options={[
								{
									label: 'image & video',
									value: 'image & video',
								},
								{
									label: 'image',
									value: 'image',
								},
								{
									label: 'video',
									value: 'video',
								},
							]}
							onChange={(val) => {
								setAttributes({ mediaType: val });
							}}
						/>
						<MediaUploadCheck>
							<MediaUpload
								value={mediaId}
								onSelect={(media) => {
									if (media) {
										setImage(media);
									} else {
										removeImage();
									}
								}}
								allowedTypes={allowedTypes}
								render={({ open }) => (
									<Button isPrimary onClick={open}>
										{mediaUrl ? 'Change media' : 'Select media'}
									</Button>
								)}
							/>
						</MediaUploadCheck>
						{mediaUrl && (
							<Button
								isSecondary
								onClick={() => {
									removeImage();
								}}
							>
								Delete
							</Button>
						)}
					</PanelBody>
				</InspectorControls>
				<div {...useBlockProps()}>
					<table>
						<tbody>
							<tr>
								<th>mediaUrl</th>
								<td>{mediaUrl || 'Not selected.'}</td>
							</tr>
							<tr>
								<th>mediaType</th>
								<td>{mediaType}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</>
		);
	},

	save: () => {
		return <div {...useBlockProps.save()}>test</div>;
	},
});
