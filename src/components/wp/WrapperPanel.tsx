const { PanelBody } = wp.components;

export const WrapperPanel = ({ title, initialOpen = false, children }: { title: string, initialOpen?: boolean, children: React.ReactNode }) => (
    <PanelBody title={title} initialOpen={initialOpen}>
        <div className='border-solid border-l-[1px] border-r-[1px] border-b-[1px] border-light-blue-500'>
            {children}
        </div>
    </PanelBody>
)