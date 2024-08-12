const { PanelBody, TextControl } = wp.components;

import { updateStyle } from "@/functions/updateStyle";

type HasGap<T> = 'gap' extends keyof T ? true : false;

type ComponentsWithGap<Block extends keyof StylesProps> = {
    [P in keyof StylesProps[Block]]: HasGap<StylesProps[Block][P]> extends true ? P : never;
}[keyof StylesProps[Block]] extends infer U ? U extends string ? U : never : never;


export const GapPanel = <Block extends keyof StylesProps>({ 
    attributes, 
    setAttributes,
    component, 
} : { 
    attributes: any, 
    setAttributes: Function, 
    block: Block
    component: ComponentsWithGap<Block>, 
}) => (
    <PanelBody title='Gap' initialOpen={false}>
        <TextControl
            label='Gap'
            value={attributes.styles[component]?.gap}
            onChange={(value: string) => updateStyle(attributes, setAttributes, component, 'gap', value)}
        />
    </PanelBody>
)