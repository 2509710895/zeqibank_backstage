import { useEffect, useState } from "react"

export default function FuncHook() {

    const [obj, setObj] = useState({ count: 1 })
    // useEffect(() => {
    //     setObj({ count: 2 })

    //     console.log("did mount state ", obj.count);
    //     // did mount state data

    //     setTimeout(() => {
    //         setObj({ count: 3 })

    //         console.log("setTimeout ", obj.count);
    //     })
    // }, [])
    setTimeout(() => {
        setObj({ count: 3 })
        console.log("setTimeout ", obj.count);
    }, 1000)
    return (
        <><button id='btn'>点击count:{obj.count}</button></>
    )
}