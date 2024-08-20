

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

interface WidthProps {
    width: string,
    minWidth: string,
    maxWidth: string,
}

interface BorderProps {
    borderWidth: string
    borderTopWidth: string
    borderBottomWidth: string
    borderRightWidth: string
    borderLeftWidth: string
    borderStyle: string
    borderRadius: string
    borderColor: string
}

declare interface StylesProps {
    navigationMenu: {
        navbar: {
            gap: string,
            backgroundColor: string,
            color: string
        } & HeightProps & PaddingProps & BorderProps,
        buttons: {
        } & ColorProps & WidthProps & HeightProps & PaddingProps & BorderProps,
        dropdown: {
            gap: string
            backgroundColor: string,
        } & PaddingProps & WidthProps & BorderProps,
        link: {
        } & ColorProps & PaddingProps & BorderProps
    }
}
