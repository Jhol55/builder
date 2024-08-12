import React, { memo, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@reactuses/core';
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle } from '@/components/ui/drawer';
import { MenuIcon } from 'lucide-react';
import { Navbar, Dropdown, Tab, Trigger, Link, Button } from '@/components/ui/navigation-menu';

import { AttributesProps } from './types'

interface ComponentProps {
    mode: 'expand' | 'overlay' | undefined;
    attributes: AttributesProps;
    className?: string
}

const Wrapper = (Component: React.ComponentType<ComponentProps>) => memo((props: ComponentProps) => {
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setIsLoading(false);
    }, [])

    return (
        <>
            <div className='flex w-full h-auto justify-end'>
                <Drawer
                    open={!isDesktop && open}
                    onClose={() => setOpen(false)}
                    noBodyStyles
                >
                    <DrawerTrigger
                        onClick={() => setOpen(true)}
                        className={cn('p-2 text-sm', (isLoading || isDesktop) && 'hidden')}
                    >
                        <MenuIcon />
                    </DrawerTrigger>
                    <DrawerContent
                        aria-describedby={undefined}
                        onInteractOutside={() => setOpen(false)}
                    >
                        <DrawerTitle className='hidden' />
                        <Component {...props} mode='expand' />
                    </DrawerContent>
                </Drawer>
            </div>

            <Component {...props} mode='overlay' className={cn((isLoading || !isDesktop) && 'hidden')} />
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