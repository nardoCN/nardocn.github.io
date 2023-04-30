import React, { ReactElement, useEffect, useState } from "react";

export function TypingTextes({
    texts,
    timeSleep,
    timeToShow
}: {
    texts: string
    timeSleep: number
    timeToShow: number
}) {
    const [words, setWords] = useState<string[]>(texts.split(''))
    const [idx, setIdx] = useState<number>(0)

    useEffect(() => {
        function setShowingWord(intervalToShowing: NodeJS.Timer) {
            setIdx((prev) => {
                if(prev === words.length - 1) {
                    clearInterval(intervalToShowing)
                }
                return prev + 1
            })
        }

        const setTimeoutShowing = setTimeout(() => {
            const intervalToShowing = setInterval(() => {
                setShowingWord(intervalToShowing)
            }, timeSleep)
        }, typeof timeToShow !== 'undefined' ? timeToShow : 0)

        return () => {
            clearTimeout(setTimeoutShowing)
        }
    }, [texts])

    return <>
        {words && words.map((word, key) => <>
            <span className={`typing-text__word ${key < idx ? 'active': ''}`} key={key}>{word}</span>{key !== 0 && key !== words.length - 1 && key == idx - 1 ? <span>_</span>: ''}
        </>)}
    </>
}

export default function useTypingText(
    Elements: ReactElement[], 
    settings: {
        delayTime?: number | undefined
        onInited?: (totalTime: number) => void
    }
) {
    const timeSleep = 150
    const {delayTime, onInited} = settings
    const [timeWaitings, setTimeWaitings] = useState<number[]>([])
    const [active, setActive] = useState(false)

    useEffect(() => {
        var timeCalc = 0
        var index = 0
        const datas = Elements.map(() => {
            if(index > 0) {
                timeCalc += Elements[index-1]?.props.children.length * timeSleep
                if(onInited && Elements.length === 1) {
                    onInited(0)
                }else if(index === Elements.length - 1) {
                    onInited(timeCalc + Elements[index]?.props.children.length * timeSleep)
                }
                index++
                return timeCalc
            }
            index++
            return 0
        })

        setTimeWaitings(datas)
    }, [])

    useEffect(() => {
        if(delayTime !== undefined) {
            setTimeout(() => setActive(true), delayTime)
        }
    }, [delayTime])

    return active && timeWaitings && timeWaitings.length && Elements.map((item, index) => {
        let {type, props: {children}} = item
        const el = <TypingTextes texts={children} timeSleep={timeSleep} timeToShow={timeWaitings[index]} />
        return React.createElement(type,{key: index}, el)
    })
}