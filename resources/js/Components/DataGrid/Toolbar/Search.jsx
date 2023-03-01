import React from 'react';

export default function (props) {
    const {title} = props;
    return <>
        <input type={'text'} placeholder={title}/>
    </>
}