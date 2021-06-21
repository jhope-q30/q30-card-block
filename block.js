( function( blocks, blockEditor, i18n, element, components, _ ) {

	var el               = element.createElement;
	var RichText         = blockEditor.RichText;
	var MediaUpload      = blockEditor.MediaUpload;
	var AlignmentToolbar = blockEditor.AlignmentToolbar;
    var BlockControls    = blockEditor.BlockControls;

	blocks.registerBlockType( 'q30-card-block/q30-card-style', {
		title: i18n.__( 'Card layout style', 'q30-card-block' ),
		icon: 'index-card',
		category: 'layout',
		attributes: {
			mediaID: {
				type:      'number',
			},
			mediaURL: {
				type:      'string',
				source:    'attribute',
				selector:  'img',
				attribute: 'src',
			},
			mediaALT: {
				type:      'string',
				source:    'attribute',
				selector:  'img',
				attribute: 'alt',
				default:   '',
			},
			alignment: {
                type:      'string',
                default:   'none',
            },
			cardtext: {
				type:      'array',
				source:    'children',
				selector:  '.card-text',
			},
		},
		edit: function( props ) {
			
			var attributes = props.attributes;

			var onSelectImage = function( media ) {
				return props.setAttributes( {
					mediaURL: media.url,
					mediaID:  media.id,
					mediaALT: media.alt,
				} );
			};
			var onChangeAlignment = function( newAlignment ) {
                props.setAttributes( {
                    alignment:
                        newAlignment === undefined ? 'none' : newAlignment,
                } );
            }

			return (
				el( 'div', { className: props.className },
					el(
						BlockControls,
						{ key: 'controls' },
						el( AlignmentToolbar, {
							value: attributes.alignment,
							onChange: onChangeAlignment,
						} )
					),
					el( 'div', { className: 'card-image' },
						el( MediaUpload, {
							onSelect: onSelectImage,
							allowedTypes: 'image',
							value: attributes.mediaID,
							render: function( obj ) {
								return el( components.Button, {
										className: attributes.mediaID ? 'image-button' : 'button button-large',
										onClick: obj.open
									},
									! attributes.mediaID ? i18n.__( 'Upload Image', 'q30-card-block' ) : el( 'img', { src: attributes.mediaURL, alt: attributes.mediaALT } )
								);
							}
						} )
					),
					el( RichText, {
						placeholder: i18n.__( 'Add card text', 'q30-card-block' ),
						multiline: 'p',
						formattingControls: ['bold', 'italic', 'link'],
						isSelected: true,
						style: { textAlign: attributes.alignment },
						value: attributes.cardtext,
						onChange: function( value ) {
							props.setAttributes( { cardtext: value } );
						},
					} )
				)
			);
		},
		save: function( props ) {

			var attributes = props.attributes;

			return (
				el( 'div', { className: props.className },
					attributes.mediaURL &&
						el( 'div', { className: 'card-image' },
							el( 'img', { src: attributes.mediaURL, alt: attributes.mediaALT } ),
						),
					el( 'div', { className: 'card-content' },
						el( 'div', { className: 'card-text' }, attributes.cardtext ),
					),
				)
			);

		},

	} );

} )(
	window.wp.blocks,
	window.wp.blockEditor,
	window.wp.i18n,
	window.wp.element,
	window.wp.components,
	window._,
);
