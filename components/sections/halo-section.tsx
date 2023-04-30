import { useState } from "react";
import useTypingText from "../typing-text";

export default function HaloSection() {

    const [timeToShowTable, setTimeToShowTable] = useState<number>()

    const handleInited = (timeToShow: number) => {
        setTimeToShowTable(timeToShow)
    }

    return (
        <section className="container" style={{
            justifyContent: 'center', 
            alignItems: 'center', 
            display: 'flex', 
            flexDirection: 'column'
        }}>
            { useTypingText([
                <h2>Halo everyone!</h2>,
                <h4>My name is Nhan Chu Cong Hoai, you can call me Nardo :))</h4>
            ], { onInited: handleInited, delayTime: 0 }) }
            <br />
            <table style={{maxWidth: 500}}>
                <tbody>
                    <tr>
                        <th style={{width: '40%'}}>
                            Title:
                        </th>
                        <td>
                            {useTypingText([
                                <span>Fullstack Developer</span>
                            ], { delayTime: timeToShowTable })}
                        </td>
                    </tr>
                    <tr>
                        <th style={{width: '40%'}}>
                            Ages:
                        </th>
                        <td>
                            {useTypingText([
                                <span>29</span>
                            ], { delayTime: timeToShowTable })}
                        </td>
                    </tr>
                    <tr>
                        <th style={{width: '40%'}}>
                            Location:
                        </th>
                        <td>
                            {useTypingText([
                                <span>Ho Chi Minh - Viet Nam</span>
                            ], { delayTime: timeToShowTable })}
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}