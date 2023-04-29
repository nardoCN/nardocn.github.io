export interface IPageScrollerProps {
    height?: number;
    children: JSX.Element
}

export interface EPageScroller extends React.ReactElement {}

PageScroller.defaultProps = {
    height: 0
}

export default function PageScroller({
    height,
    children
}: IPageScrollerProps): EPageScroller {
    return (
        <div className="pages-scroller-page" style={{height: height ? height : 'auto'}}>
            {children}
        </div>
    )
}