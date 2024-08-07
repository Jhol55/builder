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
                        className={cn('p-2 text-sm', isLoading || isDesktop ? 'hidden' : '')}
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

            <Component {...props} mode='overlay' className={isLoading || !isDesktop ? 'hidden' : ''} />
        </>
    )
})


const Component = memo(({ items, mode, className }: ComponentProps) => {
    return (
        <section className={cn('flex p-2 justify-end', mode === 'expand' ? 'flex-col' : 'flex-row', className)}>
            {items.map((item, index) => {
                return (item.trigger ?
                    <Dropdown key={index} mode={mode}>
                        <TriggerWrapper>
                            <Trigger>{item.label}</Trigger>
                        </TriggerWrapper>
                        <Tabs>
                            <Tab className='flex flex-col gap-2 !w-auto'>
                                {item.subItems?.map((subItem, subIndex) => {
                                    return (
                                        <a
                                            key={subIndex}
                                            href={subItem.link}
                                            className={cn(
                                                'p-2 text-sm decoration-none',
                                                mode === 'expand' ? 'ml-2' : ''
                                            )}
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
                        className={cn(
                            mode === 'expand' ? 'w-full' : 'w-auto items-center justify-center',
                            'inline-flex h-10 rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground no-underline')}
                    >
                        {item.label}
                    </a>
                )
            })}
        </section>
    );
});

export default Wrapper(Component);