const { PanelBody, TextControl } = wp.components;

import { updateStyle } from "@/functions/updateStyle";

type HasPadding<T> = 'padding' extends keyof T ? true : false;

type ComponentsWithPadding<Block extends keyof StylesProps> = {
    [P in keyof StylesProps[Block]]: HasPadding<StylesProps[Block][P]> extends true ? P : never;
}[keyof StylesProps[Block]] extends infer U ? U extends string ? U : never : never;

export const PaddingPanel = <Block extends keyof StylesProps>({ 
    attributes, 
    setAttributes,
    component, 
} : { 
    attributes: any, 
    setAttributes: Function,
    block: Block
    component: ComponentsWithPadding<Block>, 
}) => (
    <PanelBody title='Padding' initialOpen={false}>
        <TextControl
            label='All'
            value={attributes.styles[component]?.padding}
            onChange={(value: string) => updateStyle(attributes, setAttributes, component, 'padding', value)}
        />
        <TextControl
            label='Padding Top'
            value={attributes.styles[component]?.paddingTop}
            onChange={(value: string) => updateStyle(attributes, setAttributes, component, 'paddingTop', value)}
        />
        <TextControl
            label='Padding Bottom'
            value={attributes.styles[component]?.paddingBottom}
            onChange={(value: string) => updateStyle(attributes, setAttributes, component, 'paddingBottom', value)}
        />
        <TextControl
            label='Padding Left'
            value={attributes.styles[component]?.paddingLeft}
            onChange={(value: string) => updateStyle(attributes, setAttributes, component, 'paddingLeft', value)}
        />
        <TextControl
            label='Padding Right'
            value={attributes.styles[component]?.paddingRight}
            onChange={(value: string) => updateStyle(attributes, setAttributes, component, 'paddingRight', value)}
        />
    </PanelBody>
)