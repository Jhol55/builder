

export const updateStyle = (
    attributes: any, 
    setAttributes: Function, 
    key: string, 
    style: string, 
    value: string
) => {
    setAttributes({
        ...attributes, 
        styles: { 
            ...attributes.styles, 
            [key]: { 
                ...attributes.styles[key], 
                [style]: value 
            } 
        }
    });
};

