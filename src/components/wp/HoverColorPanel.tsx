const { PanelBody, ColorPicker } = wp.components;

import { updateStyle } from "@/functions/updateStyle";

type HasHoverColor<T> = 'hoverColor' extends keyof T ? true : false;

type ComponentsWithHoverColor<Block extends keyof StylesProps> = {
    [P in keyof StylesProps[Block]]: HasHoverColor<StylesProps[Block][P]> extends true ? P : never;
}[keyof StylesProps[Block]] extends infer U ? U extends string ? U : never : never;

export const HoverColorPanel = <Block extends keyof StylesProps>({ 
    attributes,
    setAttributes, 
    component, 
} : { 
    attributes: any, 
    setAttributes: Function, 
    block: Block
    component: ComponentsWithHoverColor<Block>
}) => (
    <PanelBody title='Hover Color' initialOpen={false}>
        <ColorPicker
            color={attributes.styles[component]?.hoverColor}
            onChangeComplete={(color: { hex: string }) => updateStyle(attributes, setAttributes, component, 'hoverColor', color.hex)}
            disableAlpha
        />
    </PanelBody>
)