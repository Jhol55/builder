export interface SubItemProps {
    label: string;
    link: string;
}

export interface ItemProps {
    label: string;
    trigger: boolean;
    link: string;
    subItems: SubItemProps[];
}

export interface AttributesProps {
    items: ItemProps[];
    styles: StylesProps.navigationMenu;
}

export interface BlockProps {
    attributes: AttributesProps;
    setAttributes: (newAttributes: Partial<AttributesProps>) => void;
}

