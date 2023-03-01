import React from 'react';

export  function Block (props) {
    const {title} = props;
    return <div className={'tip tip-block'}>
        <p>{props.children}</p>
    </div>
}