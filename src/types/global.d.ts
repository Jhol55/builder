

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

interface HeightProps {
    height: string,
    minHeight: string,
    maxHeight: string,
}

interface WidthProps { //CRIAR O PANEL DESSE ----------------------------------------------------------------------------------
    width: string,
    minWidth: string,
    maxWidth: string,
}

declare interface StylesProps {
    navigationMenu: {
        navbar: {
            gap: string,
            backgroundColor: string,
            color: string
        } & HeightProps & PaddingProps,
        buttons: {
        } & ColorProps & WidthProps & PaddingProps,
        dropdown: {
            backgroundColor: string,
        } & PaddingProps,
        link: {
        } & ColorProps & PaddingProps
    }
}
