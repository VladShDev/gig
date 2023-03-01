import React from 'react';

export default function (props) {
    const {icon, title, onClick} = props;
    return <>
        <a onClick={onClick} className={'toolbar-button'}>
            {icon ? <i>{icon}</i> : null}
            {title ? <span>{title}</span> : null}
        </a>
    </>
}