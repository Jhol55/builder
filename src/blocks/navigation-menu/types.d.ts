
export interface RawNavigationMenuProps {
  mode: 'expand' | 'overlay' | undefined;
  attributes: AttributesProps;
  className?: string
}

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

export interface ItemPanelProps {
  item: ItemProps;
  index: number;
  updateItem: (index: number, key: keyof ItemProps, value: string | boolean) => void;
  removeItem: (index: number) => void;
  addSubItem: (index: number) => void;
  subItems: JSX.Element;
}

export interface SubItemPanelProps {
  subItem: SubItemProps;
  itemIndex: number;
  subIndex: number;
  updateSubItem: (itemIndex: number, subItemIndex: number, key: keyof SubItemProps, value: string) => void;
  removeSubItem: (itemIndex: number, subItemIndex: number) => void;
}

