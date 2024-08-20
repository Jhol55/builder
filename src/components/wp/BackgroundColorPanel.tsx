const { PanelBody, ColorPicker, GradientPicker } = wp.components;

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
        />
        <GradientPicker
            value={attributes.styles[component]?.backgroundImage}
            onChange={ ( gradient: string ) => updateStyle(attributes, setAttributes, component, 'backgroundImage', gradient) }
            gradients={ [
                {
                    name: 'JShine',
                    gradient:
                        'linear-gradient(135deg,#12c2e9 0%,#c471ed 50%,#f64f59 100%)',
                    slug: 'jshine',
                },
                {
                    name: 'Moonlit Asteroid',
                    gradient:
                        'linear-gradient(135deg,#0F2027 0%, #203A43 0%, #2c5364 100%)',
                    slug: 'moonlit-asteroid',
                },
                {
                    name: 'Rastafarie',
                    gradient:
                        'linear-gradient(135deg,#1E9600 0%, #FFF200 0%, #FF0000 100%)',
                    slug: 'rastafari',
                },
            ] }
        />
    </PanelBody>
)