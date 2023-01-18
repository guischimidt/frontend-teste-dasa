import { useState, useEffect } from 'react';
import '../../styles/components/layout/loading.sass'
import bus from '../../utils/bus';

function Loading() {
    const [visibility, setVisibility] = useState(false);

    useEffect(() => {
        bus.addListener('loading', ({ show }) => {
            setVisibility(show);
        })
    }, []);

    return (
        visibility && (
            <div className='loader-container' >
                <div className='spinner'></div>
            </div>
        )
    );
};

export default Loading;