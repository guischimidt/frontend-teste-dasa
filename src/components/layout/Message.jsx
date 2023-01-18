import { useState, useEffect } from 'react';
import '../../styles/components/layout/message.sass'
import bus from '../../utils/bus';

function Message() {
    const [visibility, setVisibility] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        bus.addListener('flash', ({ message, type }) => {
            setVisibility(true);
            setMessage(message);
            setType(type);

            setTimeout(() => {
                setVisibility(false)
            }, 5000);
        })

    }, []);

    return (
        visibility && (
            <div className={`message ${type}`}>
                {message}
            </div>
        )


    );
};

export default Message;