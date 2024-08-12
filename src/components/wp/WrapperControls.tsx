const { InspectorControls } = wp.blockEditor;

export const WrapperControls = ({ group, children }: { group: string, children: React.ReactNode }) => (
    <InspectorControls group={group}>
        <div className='mt-1 border-solid border-b-[1px] border-light-blue-500'>
            {children}
        </div>
    </InspectorControls>
)