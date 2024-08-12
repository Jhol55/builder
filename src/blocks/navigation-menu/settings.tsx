import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Move } from 'lucide-react'

const { InspectorControls } = wp.blockEditor;
const { PanelBody, ToggleControl, TextControl, Button } = wp.components;
import { BlockProps, ItemProps, SubItemProps } from './types'


export const Settings = ({ attributes, setAttributes }: BlockProps) => {

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const { source, destination } = result;

        if (source.droppableId === 'items' && destination.droppableId === 'items') {
            const newItems = [...attributes.items];
            const [reorderedItem] = newItems.splice(source.index, 1);
            newItems.splice(destination.index, 0, reorderedItem);
            setAttributes({ items: newItems });
        } else if (source.droppableId.startsWith('subItems-') && destination.droppableId.startsWith('subItems-')) {
            const itemIndex = parseInt(source.droppableId.split('-')[1], 10);
            const newItems = [...attributes.items];
            const [reorderedSubItem] = newItems[itemIndex].subItems.splice(source.index, 1);
            newItems[itemIndex].subItems.splice(destination.index, 0, reorderedSubItem);
            setAttributes({ items: newItems });
        }
    };

    const addItem = () => {
        const newItems = [...attributes.items, { label: '', trigger: false, link: '', subItems: [] }];
        setAttributes({ ...attributes, items: newItems });
    };

    const updateItem = (index: number, key: keyof ItemProps, value: string | boolean) => {
        const newItems = [...attributes.items];
        newItems[index] = { ...newItems[index], [key]: value };
        setAttributes({ ...attributes, items: newItems });
    };

    const removeItem = (index: number) => {
        const newItems = attributes.items.filter((_, i) => i !== index);
        setAttributes({ ...attributes, items: newItems });
    };

    const addSubItem = (itemIndex: number) => {
        const newItems = [...attributes.items];
        newItems[itemIndex].subItems.push({ label: '', link: '' });
        setAttributes({ ...attributes, items: newItems });
    };

    const updateSubItem = (itemIndex: number, subItemIndex: number, key: keyof SubItemProps, value: string) => {
        const newItems = [...attributes.items];
        newItems[itemIndex].subItems[subItemIndex] = { ...newItems[itemIndex].subItems[subItemIndex], [key]: value };
        setAttributes({ ...attributes, items: newItems });
    };

    const removeSubItem = (itemIndex: number, subItemIndex: number) => {
        const newItems = [...attributes.items];
        newItems[itemIndex].subItems = newItems[itemIndex].subItems.filter((_, i) => i !== subItemIndex);
        setAttributes({ ...attributes, items: newItems });
    };

    return (
        <InspectorControls group='settings'>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="items">
                    {(provided) => (
                        <div
                            className='mt-1'
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {attributes.items.map((item, index) => (
                                <Draggable
                                    key={index}
                                    draggableId={`item-${index}`}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            className={`relative ${index === attributes.items.length - 1 && 'border-solid border-b-[1px] border-light-blue-500'}`}
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
                                                    <div className='my-2 p-2 border-solid border-[1px] border-light-blue-500'>
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

                                                                                    <div className={`border-solid border-l-[1px] border-r-[1px] ${subIndex === item.subItems.length - 1 && 'border-b-[1px]'} border-light-blue-500`}>
                                                                                        <PanelBody
                                                                                            initialOpen={false}
                                                                                            title={<span className='h-4' />}
                                                                                        >
                                                                                            <div className='p-2 border-solid border-[1px] border-light-blue-500'>
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
                                                        <div className='mt-2'>
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
    )
}