const { PanelBody, ColorPicker } = wp.components;

import { updateStyle } from "@/functions/updateStyle";

type HasColor<T> = 'color' extends keyof T ? true : false;

type ComponentsWithColor<Block extends keyof StylesProps> = {
    [P in keyof StylesProps[Block]]: HasColor<StylesProps[Block][P]> extends true ? P : never;
}[keyof StylesProps[Block]] extends infer U ? U extends string ? U : never : never;

export const ColorPanel = <Block extends keyof StylesProps>({
    attributes, 
    setAttributes, 
    component
} : { 
    attributes: any, 
    setAttributes: Function, 
    block: Block
    component: ComponentsWithColor<Block>
}) => (
    <PanelBody title='Color' initialOpen={false}>
        <ColorPicker
            color={attributes.styles[component]?.color}
            onChangeComplete={(color: { hex: string }) => updateStyle(attributes, setAttributes, component, 'color', color.hex)}
            disableAlpha
        />
    </PanelBody>
);
