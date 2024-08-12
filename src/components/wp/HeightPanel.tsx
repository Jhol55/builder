const { PanelBody, TextControl } = wp.components;

import { updateStyle } from "@/functions/updateStyle";

type HasHeight<T> = 'height' extends keyof T ? true : false;

type ComponentsWithHeight<Block extends keyof StylesProps> = {
    [P in keyof StylesProps[Block]]: HasHeight<StylesProps[Block][P]> extends true ? P : never;
}[keyof StylesProps[Block]] extends infer U ? U extends string ? U : never : never;

export const HeightPanel = <Block extends keyof StylesProps>({ 
    attributes, 
    setAttributes,
    component, 
} : { 
    attributes: any, 
    setAttributes: Function,
    block: Block,
    component: ComponentsWithHeight<Block>, 
}) => (
    <PanelBody title='Height' initialOpen={false}>
        <TextControl
            label='Height'
            value={attributes.styles[component]?.height}
            onChange={(value: string) => updateStyle(attributes, setAttributes, component, 'height', value)}
        />
        <TextControl
            label='Min Height'
            value={attributes.styles[component]?.minHeight}
            onChange={(value: string) => updateStyle(attributes, setAttributes, component, 'minHeight', value)}
        />
        <TextControl
            label='Max Height'
            value={attributes.styles[component]?.maxHeight}
            onChange={(value: string) => updateStyle(attributes, setAttributes, component, 'maxHeight', value)}
        />
    </PanelBody>
)