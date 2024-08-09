import ReactDOMServer from 'react-dom/server';
import Component from "./component";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Move } from 'lucide-react'

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
    icon: 'menu',
    category: 'agency',
    attributes: {
        items: { type: 'array', default: [] }
    },

    edit: ({ attributes, setAttributes }: BlockProps) => {

        const onDragEnd = (result: DropResult) => {
            if (!result.destination) return;

            const { source, destination } = result;

            if (source.droppableId === 'items' && destination.droppableId === 'items') {
                // Reordena os itens principais
                const newItems = [...attributes.items];
                const [reorderedItem] = newItems.splice(source.index, 1);
                newItems.splice(destination.index, 0, reorderedItem);
                setAttributes({ items: newItems });
            } else if (source.droppableId.startsWith('subItems-') && destination.droppableId.startsWith('subItems-')) {
                // Reordena os subitens
                const itemIndex = parseInt(source.droppableId.split('-')[1], 10);
                const newItems = [...attributes.items];
                const [reorderedSubItem] = newItems[itemIndex].subItems.splice(source.index, 1);
                newItems[itemIndex].subItems.splice(destination.index, 0, reorderedSubItem);
                setAttributes({ items: newItems });
            }
        };

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
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="items">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {attributes.items.map((item, index) => (
                                        <Draggable
                                            key={index}
                                            draggableId={`item-${index}`}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div
                                                    className='relative'
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                >
                                                    <div
                                                        className='flex absolute z-50 top-4 left-4'
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <Move className="w-4 h-4" />
                                                    </div>
                                                    <span
                                                        className='absolute top-4 left-1/2 -translate-x-1/2 max-w-[calc(100%-6rem)] font-medium truncate'
                                                    >
                                                        {item.label}
                                                    </span>
                                                    <PanelBody
                                                        initialOpen={false}
                                                        title={<span className='h-4' />}
                                                    >
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
                                                                    onClick={() => removeItem(index)}
                                                                >
                                                                    Remove Button
                                                                </Button>
                                                            </div>

                                                            {item.trigger &&
                                                                <Droppable
                                                                    droppableId={`subItems-${index}`}
                                                                    type="SUBITEM"
                                                                >
                                                                    {(provided) => (
                                                                        <div ref={provided.innerRef} {...provided.droppableProps}>
                                                                            {item.subItems.map((subItem, subIndex) => (
                                                                                <Draggable
                                                                                    key={subIndex}
                                                                                    draggableId={`subItem-${index}-${subIndex}`}
                                                                                    index={subIndex}
                                                                                >
                                                                                    {(provided) => (
                                                                                        <div
                                                                                            className='relative'
                                                                                            ref={provided.innerRef}
                                                                                            {...provided.draggableProps}
                                                                                        >
                                                                                            <div
                                                                                                className='flex absolute z-50 top-4 left-4'
                                                                                                {...provided.dragHandleProps}
                                                                                            >
                                                                                                <Move className="w-4 h-4" />
                                                                                            </div>
                                                                                            <span
                                                                                                className='absolute top-4 left-1/2 -translate-x-1/2 max-w-[calc(100%-6rem)] font-medium truncate'
                                                                                            >
                                                                                                {subItem.label}
                                                                                            </span>

                                                                                            <PanelBody
                                                                                                initialOpen={false}
                                                                                                title={<span className='h-4' />}
                                                                                            >
                                                                                                <div className='p-2 border-solid border-2 border-light-blue-500'>
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
                                                                                            </PanelBody>
                                                                                        </div>
                                                                                    )}
                                                                                </Draggable>
                                                                            ))}
                                                                            {provided.placeholder}
                                                                        </div>
                                                                    )}
                                                                </Droppable>
                                                            }

                                                            {item.trigger &&
                                                                <div className='my-2'>
                                                                    <Button
                                                                        isSecondary
                                                                        onClick={() => addSubItem(index)}
                                                                    >
                                                                        Add SubItem
                                                                    </Button>
                                                                </div>
                                                            }
                                                        </div>
                                                    </PanelBody>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>

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

    save: ({ attributes }: BlockProps) => (
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
});
