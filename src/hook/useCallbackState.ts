
import { useState, useEffect, useRef } from 'react'

export const useCallbackState = (od: any) => {
    const cbRef = useRef();
    const [data, setData] = useState(od);

    useEffect(() => {
        cbRef.current && (cbRef.current as Function)(data);
    }, [data]);

    return [data, function (d: any, callback: any) {
        cbRef.current = callback;
        setData(d);
    }];
}