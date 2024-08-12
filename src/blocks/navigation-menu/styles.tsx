import { PaddingPanel } from '@/components/wp/PaddingPanel';
import { BlockProps } from './types'
import { GapPanel } from '@/components/wp/GapPanel';
import { HeightPanel } from '@/components/wp/HeightPanel';
import { BackgroundColorPanel } from '@/components/wp/BackgroundColorPanel';
import { WrapperPanel } from '@/components/wp/WrapperPanel';
import { ColorPanel } from '@/components/wp/ColorPanel';
import { HoverColorPanel } from '@/components/wp/HoverColorPanel';
import { HoverBackgroundColorPanel } from '@/components/wp/HoverBackgroundColor';
import { WrapperControls } from '@/components/wp/WrapperControls';

export const Styles = ({ attributes, setAttributes }: BlockProps) => {
    return (
        <WrapperControls group='styles'>
            <WrapperPanel title='Navbar' >
                <HeightPanel
                    attributes={attributes}
                    setAttributes={setAttributes}
                    block='navigationMenu'
                    component='navbar' />
                <GapPanel
                    attributes={attributes}
                    setAttributes={setAttributes}
                    block='navigationMenu'
                    component='navbar' />
                <PaddingPanel
                    attributes={attributes}
                    setAttributes={setAttributes}
                    block='navigationMenu'
                    component='navbar' />
                <BackgroundColorPanel
                    attributes={attributes}
                    setAttributes={setAttributes}
                    block='navigationMenu'
                    component='navbar' />
            </WrapperPanel>
            <WrapperPanel title='Buttons'>
                <ColorPanel
                    attributes={attributes}
                    setAttributes={setAttributes}
                    block='navigationMenu'
                    component='buttons' />
                <HoverColorPanel
                    attributes={attributes}
                    setAttributes={setAttributes}
                    block='navigationMenu'
                    component='buttons' />
                <BackgroundColorPanel
                    attributes={attributes}
                    setAttributes={setAttributes}
                    block='navigationMenu'
                    component='buttons' />
                <HoverBackgroundColorPanel
                    attributes={attributes}
                    setAttributes={setAttributes}
                    block='navigationMenu'
                    component='buttons' />
                <PaddingPanel
                    attributes={attributes}
                    setAttributes={setAttributes}
                    block='navigationMenu'
                    component='buttons' />
            </WrapperPanel>
            <WrapperPanel title='Dropdown'>
                <BackgroundColorPanel
                    attributes={attributes}
                    setAttributes={setAttributes}
                    block='navigationMenu'
                    component='dropdown' />
                <PaddingPanel
                    attributes={attributes}
                    setAttributes={setAttributes}
                    block='navigationMenu'
                    component='dropdown' />
            </WrapperPanel>
            <WrapperPanel title='Link'>
                <ColorPanel
                    attributes={attributes}
                    setAttributes={setAttributes}
                    block='navigationMenu'
                    component='link' />
                <HoverColorPanel
                    attributes={attributes}
                    setAttributes={setAttributes}
                    block='navigationMenu'
                    component='link' />
                <BackgroundColorPanel
                    attributes={attributes}
                    setAttributes={setAttributes}
                    block='navigationMenu'
                    component='link' />
                <HoverBackgroundColorPanel
                    attributes={attributes}
                    setAttributes={setAttributes}
                    block='navigationMenu'
                    component='link' />
                <PaddingPanel
                    attributes={attributes}
                    setAttributes={setAttributes}
                    block='navigationMenu'
                    component='link' />
            </WrapperPanel>
        </WrapperControls>
    )
}