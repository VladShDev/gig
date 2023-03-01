import React from 'react';

export default function (props) {
    const {item, field} = props;
    return <>
        {item[field] ? <div>ACTIVE</div> : <div className={'not-xactive'}>NOT ACTIVE</div>}
    </>
}