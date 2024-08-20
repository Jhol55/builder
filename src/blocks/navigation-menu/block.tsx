import ReactDOMServer from 'react-dom/server';

import Component from './component';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { useBlockProps } = wp.blockEditor;

import { BlockProps } from './types'
import { Styles } from './styles';
import { Settings } from './settings';

registerBlockType('agency/navigation-menu', {
    title: __('Navigation Menu', 'Navigation Menu'),
    icon: 'menu',
    category: 'agency',
    attributes: {
        items: { type: 'array', default: [] },
        styles: {
            type: 'object',
            default: {}
        },
    },

    edit: ({ attributes, setAttributes }: BlockProps) => (
        <>
            <Settings attributes={attributes} setAttributes={setAttributes} />
            <Styles attributes={attributes} setAttributes={setAttributes} />

            <div {...useBlockProps()}>
                <Component
                    attributes={attributes}
                    mode={undefined}
                />
                {!attributes.items.length && 'Navigation Menu'}
            </div>
        </>
    ),

    save: ({ attributes }: BlockProps) => (
        <>
            <div
                {...useBlockProps.save()}
                id='asd'
                data-attributes={JSON.stringify(attributes)}
                dangerouslySetInnerHTML={{
                    __html: ReactDOMServer.renderToString(
                        <Component
                            attributes={attributes}
                            mode={undefined}
                        />
                    )
                }}
            />
            {/* <div className='absolute inset-0 -z-10 h-screen w-screen'>
                <div className="relative h-full w-full bg-black">
                    <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
                    <div className="absolute left-0 right-0 top-0 h-full w-full bg-[linear-gradient(to_bottom,#000000,#3347AB36)]" />
                </div>
            </div> */}
        </>
    )
});
