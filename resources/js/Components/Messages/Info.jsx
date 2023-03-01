import React from 'react';

export default function ({messages, type = 'info'}) {
    const getMessages = () => {
        if (typeof messages != 'object') {
            return [messages]
        }
        return messages;
    }

    if (!messages) return null;
    return <div className={'flash-messages ' + type}>
        <ul>{getMessages().map(message => <li>{message}</li>)}</ul>
    </div>
}