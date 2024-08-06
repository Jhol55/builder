import React, { memo, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@reactuses/core';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { MenuIcon } from 'lucide-react';
import { Dropdown, Tab, Tabs, Trigger, TriggerWrapper } from '@/components/ui/navigation-menu';

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
    const isDesktop = useMediaQuery('(min-width: 992px)');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, [])

    return (
        <>
            <Drawer noBodyStyles>
                <DrawerTrigger className={cn('p-2 text-sm', isLoading || isDesktop ? 'hidden' : '')}>
                    <MenuIcon />
                </DrawerTrigger>
                <DrawerContent>
                    <Component {...props} mode='expand' />
                </DrawerContent>
            </Drawer>

            <Component {...props} mode='overlay' className={isLoading || !isDesktop ? 'hidden' : ''} />
        </>
    )
})


const Component = memo(({ items, mode, className }: ComponentProps) => {
    return (
        <section className={cn('flex p-2', mode === 'expand' ? 'flex-col' : 'flex-row', className)}>
            {items.map((item, index) => {
                return (item.trigger ?
                    <Dropdown key={index}>
                        <TriggerWrapper>
                            <Trigger>{item.label}</Trigger>
                        </TriggerWrapper>
                        <Tabs mode={mode}>
                            <Tab className='flex flex-col gap-2 !w-auto'>
                                {item.subItems?.map((subItem, subIndex) => {
                                    return (
                                        <a
                                            key={subIndex}
                                            href={subItem.link}
                                            className='p-2 text-sm decoration-none'
                                        >
                                            {subItem.label}
                                        </a>
                                    )
                                })}
                            </Tab>
                        </Tabs>
                    </Dropdown>
                    :
                    <a
                        key={index}
                        href={item.link}
                        className='inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground no-underline'
                    >
                        {item.label}
                    </a>
                )
            })}
        </section>
    );
});

export default Wrapper(Component);