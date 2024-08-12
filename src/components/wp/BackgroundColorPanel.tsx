const { PanelBody, ColorPicker } = wp.components;

import { updateStyle } from "@/functions/updateStyle";

type HasBackgroundColor<T> = 'backgroundColor' extends keyof T ? true : false;

type ComponentsWithBackgroundColor<Block extends keyof StylesProps> = {
    [P in keyof StylesProps[Block]]: HasBackgroundColor<StylesProps[Block][P]> extends true ? P : never;
}[keyof StylesProps[Block]] extends infer U ? U extends string ? U : never : never;

export const BackgroundColorPanel = <Block extends keyof StylesProps>({
    attributes, 
    setAttributes, 
    component 
}: { 
    attributes: any, 
    setAttributes: Function,
    block: Block
    component: ComponentsWithBackgroundColor<Block>
}) => (
    <PanelBody title='Background Color' initialOpen={false}>
        <ColorPicker
            color={attributes.styles[component]?.backgroundColor}
            onChangeComplete={(color: { hex: string }) => updateStyle(attributes, setAttributes, component, 'backgroundColor', color.hex)}
            disableAlpha
        />
    </PanelBody>
)