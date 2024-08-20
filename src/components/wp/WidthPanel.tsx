const { PanelBody, TextControl } = wp.components;

import { updateStyle } from "@/functions/updateStyle";

type HasHeight<T> = 'width' extends keyof T ? true : false;

type ComponentsWithHeight<Block extends keyof StylesProps> = {
    [P in keyof StylesProps[Block]]: HasHeight<StylesProps[Block][P]> extends true ? P : never;
}[keyof StylesProps[Block]] extends infer U ? U extends string ? U : never : never;

export const WidthPanel = <Block extends keyof StylesProps>({ 
    attributes, 
    setAttributes,
    component, 
} : { 
    attributes: any, 
    setAttributes: Function,
    block: Block,
    component: ComponentsWithHeight<Block>, 
}) => (
    <PanelBody title='Width' initialOpen={false}>
        <TextControl
            label='Width'
            value={attributes.styles[component]?.width}
            onChange={(value: string) => updateStyle(attributes, setAttributes, component, 'width', value)}
        />
        <TextControl
            label='Min Width'
            value={attributes.styles[component]?.minHeight}
            onChange={(value: string) => updateStyle(attributes, setAttributes, component, 'minWidth', value)}
        />
        <TextControl
            label='Max Width'
            value={attributes.styles[component]?.maxHeight}
            onChange={(value: string) => updateStyle(attributes, setAttributes, component, 'maxWidth', value)}
        />
    </PanelBody>
)