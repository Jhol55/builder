import ReactDOMServer from 'react-dom/server';

import { NavigationMenu } from './component';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { useBlockProps } = wp.blockEditor;

import { BlockProps } from './types'
import { Styles } from './styles';
import { Settings } from './settings';

registerBlockType('agency/navigation-menu', {
  title: __('Navigation Menu', 'Navigation Menu'),
  icon: 'menu',
  category: 'agency',
  attributes: {
    items: { type: 'array', default: [] },
    styles: {
      type: 'object',
      default: {}
    },
  },

  edit: ({ attributes, setAttributes }: BlockProps) => (
    <>
      <Settings attributes={attributes} setAttributes={setAttributes} />
      <Styles attributes={attributes} setAttributes={setAttributes} />

      <div {...useBlockProps()}>
        <NavigationMenu
          attributes={attributes}
          mode={undefined}
        />
        {!attributes.items.length && 'Navigation Menu'}
      </div>
    </>
  ),

  save: ({ attributes }: BlockProps) => (
    <>
      <div
        {...useBlockProps.save()}
        id='asd'
        data-attributes={JSON.stringify(attributes)}
        dangerouslySetInnerHTML={{
          __html: ReactDOMServer.renderToString(
            <NavigationMenu
              attributes={attributes}
              mode={undefined}
            />
          )
        }}
      />
    </>
  )
});
