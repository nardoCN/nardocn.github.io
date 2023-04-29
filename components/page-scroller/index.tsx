import { useEffect, useRef, useState } from "react"
import PageScroller, { EPageScroller } from "./components/page"

export interface IPageJump {
    /** @params percentToJump to jump must be a number and from 0 to 100 */
    percentToJump: number
}

export interface IPagesScrollerProps {
    children: EPageScroller[]
    pageJump?: IPageJump
    onScroll?: (page: number, currentY: number, height: number) => void
    onNext?: (page: number, currentY: number, height: number) => void
    onPrev?: (page: number, currentY: number, height: number) => void
}

export default function PagesScroller({
    children,
    pageJump,
    onNext,
    onPrev,
    onScroll
}: IPagesScrollerProps) {

    const rootRef = useRef<HTMLDivElement>()
    const [pages, setPages] = useState<JSX.Element[]>(children)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [currentY, setCurrentY] = useState<number>(0)
    const [rootHeight, setRootHeight] = useState<number>()

    /**
     * check if page scroller is already
     * @returns boolean
     */
    const isReady = (): boolean => pages.length && rootRef.current ? true : false

    /**
     * Jump to Page by page number
     * @param pageNumber start from 0
     */
    const jumpToPage = (pageNumber: number) => {
        if(isReady()) {
            setCurrentY(pageNumber * rootHeight)
            setCurrentPage(pageNumber)
        }
    }

    /**
     * scroll to next page
     * @returns void
     */
    const nextPage = () => {
        if(currentPage + 1 < pages.length){
            jumpToPage(currentPage + 1)
            if(onNext) onNext(currentPage, currentY, rootHeight)
        }
    }

    /**
     * scroll to previous page
     * @returns void
     */
    const prevPage = () => {
        if(currentPage - 1 >= 0) {
            jumpToPage(currentPage - 1)
            if(onPrev) onPrev(currentPage, currentY, rootHeight)
        }
    }

    /**
     * Check state to jump to the next page
     * @param page 
     * @param deltaY 
     * @returns boolean
     */
    const isValidToNextPage = (page: number, deltaY: number): boolean => {
        if(deltaY < 0 || page == pages.length - 1) {
            return false
        }
        if((currentY - page * rootHeight) * 100 / rootHeight >= pageJump.percentToJump) {
            return true
        }
        return false
    }

    /**
     * Check state to jump to the prev page
     * @param page 
     * @param deltaY 
     * @returns boolean
     */
    const isValidToPrevPage = (page: number, deltaY: number): boolean => {
        if(deltaY > 0 || page == 0) {
            return false
        }
        if((rootHeight - (currentY - (page - 1) * rootHeight)) * 100 / rootHeight >= pageJump.percentToJump) {
            return true
        }
        return false
    }

    const handleWheel = (e: WheelEvent) => {
        if(isReady()) {
            let newY = currentY + e.deltaY

            if(newY > (pages.length - 1) * rootHeight ) {
                setCurrentY((pages.length - 1) * rootHeight)
            } else if(newY < 0) {
                setCurrentY(0)
            } else {
                setCurrentY(currentY + e.deltaY / 5)
            }

            if(pageJump) {
                if(isValidToNextPage(currentPage, e.deltaY)) { 
                    nextPage()
                    return
                }
                if(isValidToPrevPage(currentPage, e.deltaY)) { 
                    prevPage()
                    return
                }
            }

            if(onScroll) onScroll(currentPage, currentY, rootHeight)
        }
    }

    useEffect(() => {
        setPages(children)
        if(rootRef.current) {
            setRootHeight(rootRef.current.offsetHeight)
        }
    }, [])

    return (
        <div className="pages-scroller" ref={rootRef}>
            <div className="pages-scroller-wrapper" onWheel={(e: any) => handleWheel(e)} style={{transform: `translateY(${-1 * currentY}px)`}}>
                {children.map((page, key) => <PageScroller key={key} {...page.props} height={rootHeight}/>)}
            </div>
        </div>
    )
}