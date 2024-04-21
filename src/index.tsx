/**
 * WordPress dependencies
 */
import { registerBlockVariation } from '@wordpress/blocks';
import type { BlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';

import { SinglePostPicker } from './single-post-picker';
const VARIATION_NAME = 'creativeandrew/single-post-query-loop-selector';

interface BlockCoreQueryAttributes extends BlockVariation {
	allowedControls: [];
}

registerBlockVariation( 'core/query', {
	name: VARIATION_NAME,
	title: __( 'Relacionada', 'single-post-query-loop-selector' ),
	description: __(
		'Destaca una notícia relacionada',
		'single-post-query-loop-selector'
	),
	category: 'theme',
	isActive: [ 'namespace' ],
	attributes: {
		namespace: VARIATION_NAME,
		query: {
			perPage: 1,
			postType: 'post',
			sticky: 'exclude',
		},
		className: 'post_destacat',
	},
	allowedControls: [],
	innerBlocks: [
		[
			'core/post-template',
			{},
			[
				[
					'core/columns',
					{
                        style: { color: { background: '#f0f0f0' } }, // Setting a light gray background color
                    },
					[
						[
							'core/column', {width: '25%',verticalAlignment: 'center'},
							[['core/post-featured-image',{isLink: true}]]
						],
						[
							'core/column',
							{ width: '75%' },
							[['core/post-title',{ isLink: true, level: 4 }]],
						],
					]
				]
			]
		],
	],	
	scope: [ 'inserter' ],
} as BlockCoreQueryAttributes );

const isSingePostPicker = ( props: { attributes: { namespace: string } } ) => {
	const {
		attributes: { namespace },
	} = props;
	return namespace && namespace === VARIATION_NAME;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withAdvancedQueryControls = ( BlockEdit: React.FC ) => ( props: any ) => {
	if ( isSingePostPicker( props ) ) {
		const { setAttributes, attributes } = props;
		return (
			<>
				<SinglePostPicker
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
				<BlockEdit { ...props } />
			</>
		);
	}
	return <BlockEdit { ...props } />;
};

addFilter( 'editor.BlockEdit', 'core/query', withAdvancedQueryControls );
