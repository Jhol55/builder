const { PanelBody, TextControl, SelectControl, ColorPicker } = wp.components;

import { updateStyle } from "@/functions/updateStyle";

type HasBorder<T> = 'borderWidth' extends keyof T ? true : false;

type ComponentsWithBorder<Block extends keyof StylesProps> = {
    [P in keyof StylesProps[Block]]: HasBorder<StylesProps[Block][P]> extends true ? P : never;
}[keyof StylesProps[Block]] extends infer U ? U extends string ? U : never : never;

export const BorderPanel = <Block extends keyof StylesProps>({
    attributes,
    setAttributes,
    component
}: {
    attributes: any,
    setAttributes: Function,
    block: Block
    component: ComponentsWithBorder<Block>
}) => (
    <PanelBody title='Border' initialOpen={false}>
        <TextControl
            label='Width'
            value={attributes.styles[component]?.borderWidth}
            onChange={(value: string) => updateStyle(attributes, setAttributes, component, 'borderWidth', value)}
        />
        <TextControl
            label='Top Width'
            value={attributes.styles[component]?.borderTopWidth}
            onChange={(value: string) => updateStyle(attributes, setAttributes, component, 'borderTopWidth', value)}
        />
        <TextControl
            label='Bottom Width'
            value={attributes.styles[component]?.borderBottomWidth}
            onChange={(value: string) => updateStyle(attributes, setAttributes, component, 'borderBottomWidth', value)}
        />
        <TextControl
            label='Right Width'
            value={attributes.styles[component]?.borderRightWidth}
            onChange={(value: string) => updateStyle(attributes, setAttributes, component, 'borderRightWidth', value)}
        />
        <TextControl
            label='Left Width'
            value={attributes.styles[component]?.borderLeftWidth}
            onChange={(value: string) => updateStyle(attributes, setAttributes, component, 'borderLeftWidth', value)}
        />
        <SelectControl
            label="Style"
            value={attributes.styles[component]?.borderStyle}
            options={[
                { label: 'Solid', value: 'solid' },
                { label: 'Dashed', value: 'dashed' },
                { label: 'Dotted', value: 'dotted' },
                { label: 'Double', value: 'double' },
                { label: 'Groove', value: 'groove' },
                { label: 'Ridge', value: 'ridge' },
                { label: 'Inset', value: 'inset' },
                { label: 'Outset', value: 'outset' },
                { label: 'None', value: 'none' },
                { label: 'Hidden', value: 'hidden' }
            ]}
            onChange={(value: string) => updateStyle(attributes, setAttributes, component, 'borderStyle', value)}
        />
        <TextControl
            label='Radius'
            value={attributes.styles[component]?.borderRadius}
            onChange={(value: string) => updateStyle(attributes, setAttributes, component, 'borderRadius', value)}
        />
        <ColorPicker
            color={attributes.styles[component]?.borderColor}
            onChangeComplete={(color: { hex: string }) => updateStyle(attributes, setAttributes, component, 'borderColor', color.hex)}
            disableAlpha
        />
    </PanelBody>
);
