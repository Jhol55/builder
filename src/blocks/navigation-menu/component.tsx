import React, { memo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@reactuses/core';
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle } from '@/components/ui/drawer';
import { MenuIcon } from 'lucide-react';
import { Navbar, Dropdown, Tab, Trigger, Link, Button } from '@/components/custom/ui/navigation-menu';

import { AttributesProps } from './types'
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { ScrollBar } from '@/components/ui/scroll-area';

interface ComponentProps {
    mode: 'expand' | 'overlay' | undefined;
    attributes: AttributesProps;
    className?: string
}

const Wrapper = (Component: React.ComponentType<ComponentProps>) => memo(({ attributes }: ComponentProps) => {
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setIsLoading(false);
    }, [])

    return (
        <>
            <div
                className='flex w-full justify-end'
                style={{
                    ...attributes.styles.navbar,
                    height: !isDesktop && !isLoading ? attributes.styles.navbar?.height || 'auto' : 'auto'
                }}
            >
                <Drawer
                    open={!isDesktop && open}
                    onClose={() => setOpen(false)}   
                    noBodyStyles
                >
                    <DrawerTrigger
                        onClick={() => setOpen(true)}
                        className={cn('p-2 text-sm', (isLoading || isDesktop) && 'hidden')}
                        aria-label="show menu"
                        style={{ color: attributes.styles.buttons?.color }}
                    >
                        <MenuIcon />
                    </DrawerTrigger>
                    <DrawerContent
                        aria-describedby={undefined}
                        onInteractOutside={() => setOpen(false)}
                        style={{
                            backgroundColor: attributes.styles.navbar?.backgroundColor,
                            backgroundImage: attributes.styles.navbar?.backgroundImage
                        }}
                    >
                        <div className='mb-10 overflow-auto'>
                            <DrawerTitle className='hidden' />
                            <ScrollArea className='max-h-[100vh-3rem-1px] overflow-auto'>
                                <Component attributes={attributes} mode='expand' />
                                <ScrollBar orientation='vertical' />
                            </ScrollArea>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>

            <Component attributes={attributes} mode='overlay' className={cn((isLoading || !isDesktop) && 'hidden')} />
        </>
    )
});

const Component = memo(({ attributes, mode, className }: ComponentProps) => {
    return (
        <Navbar
            mode={mode}
            className={className}
            style={attributes.styles.navbar}
        >
            {attributes.items.map((item, index) => (
                item.trigger ? (
                    <Dropdown key={index}>
                        <Trigger style={attributes.styles.buttons}>
                            {item.label}
                        </Trigger>
                        <Tab style={attributes.styles.dropdown}>
                            {item.subItems?.map((subItem, subIndex) => (
                                <Link
                                    key={subIndex}
                                    href={subItem.link}
                                    style={attributes.styles.link}
                                >
                                    {subItem.label}
                                </Link>
                            ))}
                        </Tab>
                    </Dropdown>
                ) : (
                    <Button
                        key={index}
                        href={item.link}
                        style={attributes.styles.buttons}
                    >
                        {item.label}
                    </Button>
                )
            ))}
        </Navbar>
    );
});

export default Wrapper(Component);