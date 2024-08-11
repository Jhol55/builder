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

interface PaddingProps {
    padding: string,
    paddingTop: string,
    paddingBottom: string,
    paddingLeft: string,
    paddingRight: string
}

interface ColorProps {
    color: string,
    hoverColor: string,
    backgroundColor: string,
    hoverBackgroundColor: string,
}

export interface StylesProps {
    navbar: {
        height: string,
        gap: string,
        backgroundColor: string,
    } & PaddingProps,
    buttons: {
    } & ColorProps & PaddingProps,
    dropdown: {
        backgroundColor: string,
    } & PaddingProps,
    link: {
    } & ColorProps & PaddingProps
}

export interface AttributesProps {
    items: ItemProps[];
    styles: StylesProps;
}

export interface BlockProps {
    attributes: AttributesProps;
    setAttributes: (newAttributes: Partial<AttributesProps>) => void;
}