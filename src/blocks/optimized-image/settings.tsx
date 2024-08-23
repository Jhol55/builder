import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Move } from 'lucide-react';

const { PanelBody, Button, TextControl, ToggleControl } = wp.components;
const { InspectorControls, MediaUpload, MediaUploadCheck } = wp.blockEditor;

import { BlockProps } from './types';

export const Settings = ({ attributes, setAttributes }: BlockProps) => {
  const { altText, imageVersions } = attributes;

  const onSelectImage = (media: any, width: number) => {
    const updatedVersions = [...(imageVersions || [])];
    const existingIndex = updatedVersions.findIndex(v => v.width === width);
    const mediaUrl = media.url.replace(/^http:/, 'https:');

    if (existingIndex >= 0) {
      updatedVersions[existingIndex] = { ...updatedVersions[existingIndex], url: mediaUrl };
    } else {
      updatedVersions.push({ url: mediaUrl, width, isImageFallback: false });
    }

    setAttributes({ imageVersions: updatedVersions });
  };

  const handleWidthChange = (index: number, width: number) => {
    const updatedVersions = [...(imageVersions || [])];
    updatedVersions[index] = { ...updatedVersions[index], width };
    setAttributes({ imageVersions: updatedVersions });
  };

  const handleFallbackChange = (index: number, isImageFallback: boolean) => {
    const updatedVersions = [...(imageVersions || [])];
    updatedVersions[index] = { ...updatedVersions[index], isImageFallback };
    setAttributes({ imageVersions: updatedVersions });
  };

  const removeImageVersion = (index: number) => {
    const updatedVersions = imageVersions.filter((_, i) => i !== index);
    setAttributes({ imageVersions: updatedVersions });
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === 'images' && destination.droppableId === 'images') {
      const newImageVersions = [...(attributes.imageVersions || [])];
      const [reorderedImageVersion] = newImageVersions.splice(source.index, 1);
      newImageVersions.splice(destination.index, 0, reorderedImageVersion);
      setAttributes({ imageVersions: newImageVersions });
    }
  };

  return (
    <InspectorControls>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="images">
          {(provided) => (
            <div className='mt-1' {...provided.droppableProps} ref={provided.innerRef}>
              {(imageVersions || []).map((version, index) => (
                <Draggable key={index} draggableId={`image-${index}`} index={index}>
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
                        className='absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-[calc(100%-6rem)] font-medium truncate'
                      >
                        {`Image ${index + 1} (${version.url.split('/').pop() || 'No file'}, ${version.width}px)`}
                      </span>
                      <PanelBody
                        title={<span className='h-4' />}
                        initialOpen={false}
                      >
                        <TextControl
                          label={`Max width media query (px)`}
                          value={version.width}
                          onChange={(width: string) => handleWidthChange(index, parseInt(width, 10))}
                          type="number"
                        />
                        <ToggleControl
                          label="Image Fallback"
                          checked={version.isImageFallback || false}
                          onChange={() => handleFallbackChange(index, !version.isImageFallback)}
                        />
                        <div className='flex gap-2'>
                          <div className='mb-4'>
                            <MediaUploadCheck>
                              <MediaUpload
                                onSelect={(media: any) => onSelectImage(media, version.width)}
                                allowedTypes={['image/jpg', 'image/jpeg', 'image/png', 'image/webp']}
                                value={version.url}
                                render={({ open }: { open: () => void }) => (
                                  <Button onClick={open} isPrimary>
                                    Change Image
                                  </Button>
                                )}
                              />
                            </MediaUploadCheck>
                          </div>
                          <div className='mb-2 bg-red-500 hover:bg-red-400 w-fit h-fit rounded-[2px]'>
                            <Button onClick={() => removeImageVersion(index)} isDestructive>
                              <span className='text-white'>Remove</span>
                            </Button>
                          </div>
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
      <div className='p-2'>
        <Button
          onClick={() => setAttributes({
            imageVersions: [...(imageVersions || []), { url: '', width: 300, isImageFallback: false }]
          })}
          isPrimary
          className='mb-4'
        >
          Add Image
        </Button>
        <TextControl
          label="Image Alt Text"
          value={altText}
          onChange={(altText: string) => setAttributes({ altText })}
        />
      </div>
    </InspectorControls>
  );
};
