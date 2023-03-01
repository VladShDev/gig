import React from 'react';

export default function (props) {

    return <div className={'data-grid-tabs tabs'}>
        <ul>{props.children}</ul>
    </div>
}