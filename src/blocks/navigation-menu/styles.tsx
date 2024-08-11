const { InspectorControls } = wp.blockEditor;
const { PanelBody, TextControl, ColorPicker } = wp.components;

import { BlockProps, StylesProps } from './types'

export const Styles = ({ attributes, setAttributes }: BlockProps) => {

    const updateStyle = <Key extends keyof StylesProps, Style extends keyof StylesProps[Key]>(key: Key, style: Style, value: string | object) => {
        setAttributes({
            ...attributes, styles: { ...attributes.styles, [key]: { ...attributes.styles[key], [style]: value } }
        });
    };

    return (
        <InspectorControls group='styles'>
            <div className='mt-1'>
                <div className='border-solid border-b-[1px] border-light-blue-500'>
                    <PanelBody title='Navbar' initialOpen={false}>
                        <div className='border-solid border-l-[1px] border-r-[1px] border-b-[1px] border-light-blue-500'>
                            <PanelBody title='Height' initialOpen={false}>
                                <TextControl
                                    label='Height'
                                    value={attributes.styles.navbar?.height}
                                    onChange={(value: string) => updateStyle('navbar', 'height', value)}
                                />
                            </PanelBody>
                            <PanelBody title='Gap' initialOpen={false}>
                                <TextControl
                                    label='Gap'
                                    value={attributes.styles.navbar?.gap}
                                    onChange={(value: string) => updateStyle('navbar', 'gap', value)}
                                />
                            </PanelBody>
                            <PanelBody title='Padding' initialOpen={false}>
                                <TextControl
                                    label='All'
                                    value={attributes.styles.navbar?.padding}
                                    onChange={(value: string) => updateStyle('navbar', 'padding', value)}
                                />
                                <TextControl
                                    label='Padding Top'
                                    value={attributes.styles.navbar?.paddingTop}
                                    onChange={(value: string) => updateStyle('navbar', 'paddingTop', value)}
                                />
                                <TextControl
                                    label='Padding Bottom'
                                    value={attributes.styles.navbar?.paddingBottom}
                                    onChange={(value: string) => updateStyle('navbar', 'paddingBottom', value)}
                                />
                                <TextControl
                                    label='Padding Left'
                                    value={attributes.styles.navbar?.paddingLeft}
                                    onChange={(value: string) => updateStyle('navbar', 'paddingLeft', value)}
                                />
                                <TextControl
                                    label='Padding Right'
                                    value={attributes.styles.navbar?.paddingRight}
                                    onChange={(value: string) => updateStyle('navbar', 'paddingRight', value)}
                                />
                            </PanelBody>
                            <PanelBody title='Background Color' initialOpen={false}>
                                <ColorPicker
                                    color={attributes.styles.navbar?.backgroundColor}
                                    onChangeComplete={(color: { hex: string }) => updateStyle('navbar', 'backgroundColor', color.hex)}
                                    disableAlpha
                                />
                            </PanelBody>
                        </div>
                    </PanelBody>
                    <PanelBody title='Buttons' initialOpen={false}>
                        <div className='border-solid border-l-[1px] border-r-[1px] border-b-[1px] border-light-blue-500'>
                            <PanelBody title='Color' initialOpen={false}>
                                <ColorPicker
                                    color={attributes.styles.buttons?.color}
                                    onChangeComplete={(color: { hex: string }) => updateStyle('buttons', 'color', color.hex)}
                                    disableAlpha
                                />
                            </PanelBody>
                            <PanelBody title='Hover Color' initialOpen={false}>
                                <ColorPicker
                                    color={attributes.styles.buttons?.hoverColor}
                                    onChangeComplete={(color: { hex: string }) => updateStyle('buttons', 'hoverColor', color.hex)}
                                    disableAlpha
                                />
                            </PanelBody>
                            <PanelBody title='Background Color' initialOpen={false}>
                                <ColorPicker
                                    color={attributes.styles.buttons?.backgroundColor}
                                    onChangeComplete={(color: { hex: string }) => updateStyle('buttons', 'backgroundColor', color.hex)}
                                    disableAlpha
                                />
                            </PanelBody>
                            <PanelBody title='Hover Background Color' initialOpen={false}>
                                <ColorPicker
                                    color={attributes.styles.buttons?.hoverBackgroundColor}
                                    onChangeComplete={(color: { hex: string }) => updateStyle('buttons', 'hoverBackgroundColor', color.hex)}
                                    disableAlpha
                                />
                            </PanelBody>
                            <PanelBody title='Padding' initialOpen={false}>
                                <TextControl
                                    label='All'
                                    value={attributes.styles.buttons?.padding}
                                    onChange={(value: string) => updateStyle('buttons', 'padding', value)}
                                />
                                <TextControl
                                    label='Padding Top'
                                    value={attributes.styles.buttons?.paddingTop}
                                    onChange={(value: string) => updateStyle('buttons', 'paddingTop', value)}
                                />
                                <TextControl
                                    label='Padding Bottom'
                                    value={attributes.styles.buttons?.paddingBottom}
                                    onChange={(value: string) => updateStyle('buttons', 'paddingBottom', value)}
                                />
                                <TextControl
                                    label='Padding Left'
                                    value={attributes.styles.buttons?.paddingLeft}
                                    onChange={(value: string) => updateStyle('buttons', 'paddingLeft', value)}
                                />
                                <TextControl
                                    label='Padding Right'
                                    value={attributes.styles.buttons?.paddingRight}
                                    onChange={(value: string) => updateStyle('buttons', 'paddingRight', value)}
                                />
                            </PanelBody>
                        </div>
                    </PanelBody>
                    <PanelBody title='Dropdown' initialOpen={false}>
                        <div className='border-solid border-l-[1px] border-r-[1px] border-b-[1px] border-light-blue-500'>
                            <PanelBody title='Background Color' initialOpen={false}>
                                <ColorPicker
                                    color={attributes.styles.dropdown?.backgroundColor}
                                    onChangeComplete={(color: { hex: string }) => updateStyle('dropdown', 'backgroundColor', color.hex)}
                                    disableAlpha
                                />
                            </PanelBody>
                            <PanelBody title='Padding' initialOpen={false}>
                                <TextControl
                                    label='All'
                                    value={attributes.styles.dropdown?.padding}
                                    onChange={(value: string) => updateStyle('dropdown', 'padding', value)}
                                />
                                <TextControl
                                    label='Padding Top'
                                    value={attributes.styles.dropdown?.paddingTop}
                                    onChange={(value: string) => updateStyle('dropdown', 'paddingTop', value)}
                                />
                                <TextControl
                                    label='Padding Bottom'
                                    value={attributes.styles.dropdown?.paddingBottom}
                                    onChange={(value: string) => updateStyle('dropdown', 'paddingBottom', value)}
                                />
                                <TextControl
                                    label='Padding Left'
                                    value={attributes.styles.dropdown?.paddingLeft}
                                    onChange={(value: string) => updateStyle('dropdown', 'paddingLeft', value)}
                                />
                                <TextControl
                                    label='Padding Right'
                                    value={attributes.styles.dropdown?.paddingRight}
                                    onChange={(value: string) => updateStyle('dropdown', 'paddingRight', value)}
                                />
                            </PanelBody>
                        </div>
                    </PanelBody>
                    <PanelBody title='Link' initialOpen={false}>
                        <div className='border-solid border-l-[1px] border-r-[1px] border-b-[1px] border-light-blue-500'>
                            <PanelBody title='Color' initialOpen={false}>
                                <ColorPicker
                                    color={attributes.styles.link?.color}
                                    onChangeComplete={(color: { hex: string }) => updateStyle('link', 'color', color.hex)}
                                    disableAlpha
                                />
                            </PanelBody>
                            <PanelBody title='Hover Color' initialOpen={false}>
                                <ColorPicker
                                    color={attributes.styles.link?.hoverColor}
                                    onChangeComplete={(color: { hex: string }) => updateStyle('link', 'hoverColor', color.hex)}
                                    disableAlpha
                                />
                            </PanelBody>
                            <PanelBody title='Background Color' initialOpen={false}>
                                <ColorPicker
                                    color={attributes.styles.link?.backgroundColor}
                                    onChangeComplete={(color: { hex: string }) => updateStyle('link', 'backgroundColor', color.hex)}
                                    disableAlpha
                                />
                            </PanelBody>
                            <PanelBody title='Hover Background Color' initialOpen={false}>
                                <ColorPicker
                                    color={attributes.styles.link?.hoverBackgroundColor}
                                    onChangeComplete={(color: { hex: string }) => updateStyle('link', 'hoverBackgroundColor', color.hex)}
                                    disableAlpha
                                />
                            </PanelBody>
                            <PanelBody title='Padding' initialOpen={false}>
                                <TextControl
                                    label='All'
                                    value={attributes.styles.link?.padding}
                                    onChange={(value: string) => updateStyle('link', 'padding', value)}
                                />
                                <TextControl
                                    label='Padding Top'
                                    value={attributes.styles.link?.paddingTop}
                                    onChange={(value: string) => updateStyle('link', 'paddingTop', value)}
                                />
                                <TextControl
                                    label='Padding Bottom'
                                    value={attributes.styles.link?.paddingBottom}
                                    onChange={(value: string) => updateStyle('link', 'paddingBottom', value)}
                                />
                                <TextControl
                                    label='Padding Left'
                                    value={attributes.styles.link?.paddingLeft}
                                    onChange={(value: string) => updateStyle('link', 'paddingLeft', value)}
                                />
                                <TextControl
                                    label='Padding Right'
                                    value={attributes.styles.link?.paddingRight}
                                    onChange={(value: string) => updateStyle('link', 'paddingRight', value)}
                                />
                            </PanelBody>
                        </div>
                    </PanelBody>
                </div>
            </div>
        </InspectorControls>
    )
}