import React, { memo } from 'react';
import { useMediaQuery } from '@reactuses/core';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { MenuIcon } from 'lucide-react';
import { Dropdown, Tab, Tabs, Trigger, TriggerWrapper } from '@/components/ui/dropdown';

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
    items: Items[]
}

const Wrapper = (Component: React.ComponentType<ComponentProps>) => (props: ComponentProps) => {
    const isDesktop = useMediaQuery('(min-width: 992px)')

    return (
        <>
            {!isDesktop ?
                <Drawer noBodyStyles>
                    <DrawerTrigger>
                        <MenuIcon />
                    </DrawerTrigger>
                    <DrawerContent>
                        <Component {...props} />
                    </DrawerContent>
                </Drawer>
                : <Component {...props} />
            }
        </>
    )
}


const Component = memo(({
    items
}: ComponentProps) => {
    return (
        <section className='flex p-2'>
            {items.map((item, index) => {
                return (item.trigger ?
                    <Dropdown key={index}>
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
                                            className='p-2'
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