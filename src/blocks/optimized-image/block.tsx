import * as React from 'react';
import { OptimizedImage } from './component';
import { Settings } from './settings';

const { registerBlockType } = wp.blocks;
import { BlockProps } from './types';

registerBlockType('my-plugin/optimized-image', {
  title: 'Optimized Image',
  icon: 'format-image',
  category: 'media',
  attributes: {
    imageVersions: {
      type: 'array',
      default: [],
      items: {
        type: 'object',
        properties: {
          url: { type: 'string' },
          width: { type: 'number' },
          isImageFallback: { type: 'boolean', default: false }
        }
      }
    },
    altText: {
      type: 'string',
      default: '',
    },
  },
  edit: ({ attributes, setAttributes }: BlockProps) => {
    return (
      <>
        <Settings attributes={attributes} setAttributes={setAttributes} />

        <div
          id='optimized-image'
          data-attributes={JSON.stringify(attributes)}
        >
          <OptimizedImage
            imageVersions={attributes.imageVersions}
            alt={attributes.altText}
          />
          <>
          {!attributes.imageVersions?.length && 'Optimized Image'}
          </>
        </div>
      </>
    );
  },
  save: ({ attributes }: BlockProps) => {
    return (
      <div
        id='optimized-image'
        data-attributes={JSON.stringify(attributes)}
      >
        <OptimizedImage
          imageVersions={attributes.imageVersions}
          alt={attributes.altText}
        />
      </div>
    );
  },
});
