import React, { memo, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@reactuses/core';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { MenuIcon } from 'lucide-react';
import { Navbar, Dropdown, Tab, Trigger, TabLink, Link } from '@/components/ui/navigation-menu';

interface SubItem {
    label: string;
    link: string;
}

interface Items {
    label: string;
    trigger: boolean
    link: string
    subItems?: SubItem[];
}

interface ComponentProps {
    mode: 'expand' | 'overlay' | undefined;
    items: Items[];
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
                        <Component {...props} mode='expand' />
                    </DrawerContent>
                </Drawer>
            </div>

            <Component {...props} mode='overlay' className={cn((isLoading || !isDesktop) && 'hidden')} />
        </>
    )
})


const Component = memo(({ items, mode, className }: ComponentProps) => {
    return (
        <Navbar mode={mode} className={className}>
            {items.map((item, index) => {
                return (
                    item.trigger ?
                        <Dropdown key={index}>
                            <Trigger>{item.label}</Trigger>
                            <Tab>
                                {item.subItems?.map((subItem, subIndex) => {
                                    return (
                                        <TabLink key={subIndex} href={subItem.link}>
                                            {subItem.label}
                                        </TabLink>
                                    )
                                })}
                            </Tab>
                        </Dropdown>
                    :
                        <Link key={index} href={item.link}>
                            {item.label}
                        </Link>
                )
            })}
        </Navbar>
    );
});

export default Wrapper(Component);