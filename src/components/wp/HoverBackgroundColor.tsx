const { PanelBody, ColorPicker } = wp.components;

import { updateStyle } from "@/functions/updateStyle";

type HasHoverBackgroundColor<T> = 'hoverBackgroundColor' extends keyof T ? true : false;

type ComponentsWithHoverBackGroundColor<Block extends keyof StylesProps> = {
    [P in keyof StylesProps[Block]]: HasHoverBackgroundColor<StylesProps[Block][P]> extends true ? P : never;
}[keyof StylesProps[Block]] extends infer U ? U extends string ? U : never : never;

export const HoverBackgroundColorPanel = <Block extends keyof StylesProps>({ 
    attributes, 
    setAttributes,
    component, 
} : { 
    attributes: any, 
    setAttributes: Function,
    block: Block
    component: ComponentsWithHoverBackGroundColor<Block>, 
}) => (
    <PanelBody title='Hover Background Color' initialOpen={false}>
        <ColorPicker
            color={attributes.styles[component]?.hoverBackgroundColor}
            onChangeComplete={(color: { hex: string }) => updateStyle(attributes, setAttributes, component, 'hoverBackgroundColor', color.hex)}
        />
    </PanelBody>
)