import ReactDOMServer from 'react-dom/server';
import Component from "./component";

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { useBlockProps, InspectorControls } = wp.blockEditor;
const { PanelBody, ToggleControl, TextControl, Button } = wp.components;

interface SubItem {
    label: string;
    link: string;
}

interface Item {
    label: string;
    trigger: boolean;
    link: string;
    subItems: SubItem[];
}

interface AttributesProps {
    items: Item[];
}

interface BlockProps {
    attributes: AttributesProps;
    setAttributes: (newAttributes: Partial<AttributesProps>) => void;
}

registerBlockType('agency/navigation-menu', {
    title: __('Navigation Menu', 'Navigation Menu'),
    icon: 'menu', // https://developer.wordpress.org/resource/dashicons/.
    category: 'agency',
    attributes: {
        items: { type: 'array', default: [] }
    },

    edit: ({ attributes, setAttributes }: BlockProps) => {
        const addItem = () => {
            const newItems = [...attributes.items, { label: 'New Item', trigger: false, link: '', subItems: [] }];
            setAttributes({ items: newItems });
        };

        const updateItem = (index: number, key: keyof Item, value: string | boolean) => {
            const newItems = [...attributes.items];
            newItems[index] = { ...newItems[index], [key]: value };
            setAttributes({ items: newItems });
        };

        const removeItem = (index: number) => {
            const newItems = attributes.items.filter((_, i) => i !== index);
            setAttributes({ items: newItems });
        };

        const addSubItem = (itemIndex: number) => {
            const newItems = [...attributes.items];
            newItems[itemIndex].subItems.push({ label: '', link: '' });
            setAttributes({ items: newItems });
        };

        const updateSubItem = (itemIndex: number, subItemIndex: number, key: keyof SubItem, value: string) => {
            const newItems = [...attributes.items];
            newItems[itemIndex].subItems[subItemIndex] = { ...newItems[itemIndex].subItems[subItemIndex], [key]: value };
            setAttributes({ items: newItems });
        };

        const removeSubItem = (itemIndex: number, subItemIndex: number) => {
            const newItems = [...attributes.items];
            newItems[itemIndex].subItems = newItems[itemIndex].subItems.filter((_, i) => i !== subItemIndex);
            setAttributes({ items: newItems });
        };

        return (
            <>
                <InspectorControls>
                    {attributes.items.map((item, index) => (
                        <PanelBody key={index} initialOpen={false} title={item.label}>
                            <div className='my-2'>
                                <div className='my-2 p-2 border-solid border-2 border-light-blue-500'>
                                    <TextControl
                                        label='Item Label'
                                        value={item.label}
                                        onChange={(value: string) => updateItem(index, 'label', value)}
                                    />
                                    <ToggleControl
                                        label='Trigger'
                                        checked={item.trigger}
                                        onChange={(value: boolean) => updateItem(index, 'trigger', value)}
                                    />
                                    {!item.trigger && 
                                        <TextControl
                                            label='Item Link'
                                            value={item.link}
                                            onChange={(value: string) => updateItem(index, 'link', value)}
                                        />
                                    }
                                    <Button
                                        isPrimary
                                        label="Remove Button"
                                        onClick={() => removeItem(index)}
                                    >
                                        Remove Button
                                    </Button>
                                </div>

                                {item.subItems && item.trigger && item.subItems.map((subItem, subIndex) => (
                                    <div key={subIndex} className='my-2 p-2 border-solid border-2 border-light-blue-500'>
                                        <TextControl
                                            label='SubItem Label'
                                            value={subItem.label}
                                            onChange={(value: string) => updateSubItem(index, subIndex, 'label', value)}
                                        />
                                        <TextControl
                                            label='SubItem Link'
                                            value={subItem.link}
                                            onChange={(value: string) => updateSubItem(index, subIndex, 'link', value)}
                                        />
                                        <Button
                                            isPrimary
                                            onClick={() => removeSubItem(index, subIndex)}
                                        >
                                            Remove Subitem
                                        </Button>
                                    </div>
                                ))}
                                {item.trigger &&
                                    <Button
                                        isSecondary
                                        onClick={() => addSubItem(index)}
                                    >
                                        Add SubItem
                                    </Button>}
                            </div>
                        </PanelBody>
                    ))}
                    <div className='my-2 ml-4'>
                        <Button
                            isPrimary
                            onClick={addItem}
                        >
                            Add Item
                        </Button>
                    </div>
                </InspectorControls>
                

                <div {...useBlockProps()}>
                    <Component
                        items={attributes.items}
                        mode={undefined}
                    />
                </div>
            </>
        );
    },

    save: ({ attributes }: BlockProps) => {
        return (
            <div
                {...useBlockProps.save()}
                id='asd'
                data-items={JSON.stringify(attributes.items)}
                dangerouslySetInnerHTML={{
                    __html: ReactDOMServer.renderToString(
                        <Component
                            items={attributes.items}
                            mode={undefined}
                        />
                    )
                }}
            />
        )
    }
});
