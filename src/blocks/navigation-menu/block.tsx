import ReactDOMServer from 'react-dom/server';
import Component from "./component";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { useBlockProps } = wp.blockEditor;

import { BlockProps } from './types'
import { Styles } from './styles';
import { Settings } from './settings';

const padding = {
    padding: '',
    paddingTop: '',
    paddingBottom: '',
    paddingLeft: '',
    paddingRight: ''
}

const colors = {
    color: '',
    hoverColor: '',
    backgroundColor: '',
    hoverBackgroundColor: '',
}

registerBlockType('agency/navigation-menu', {
    title: __('Navigation Menu', 'Navigation Menu'),
    icon: 'menu',
    category: 'agency',
    attributes: {
        items: { type: 'array', default: [] },
        styles: {
            type: 'object',
            default: {
                navbar: {
                    gap: '',
                    padding,
                    backgroundColor: '',             
                },
                buttons: {
                    colors,
                    padding
                },
                dropdown: {
                    backgroundColor: '',
                    padding
                },
                link: {
                    colors,
                    padding
                }

            }
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
    )
});
