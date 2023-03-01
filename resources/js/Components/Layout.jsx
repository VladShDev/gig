import React from 'react';

export  function Row (props) {
    const {center} = props;

    let _class = [
        "row"
    ];
    if (center)
        _class.push('flex-center');

    return <div className={_class.join(' ')}>
        {props.children}
    </div>
}

export  function Col (props) {
    const {center} = props;

    let _class = [
        "col"
    ];
    if (center)
        _class.push('flex-center');

    return <div className={_class.join(' ')}>
        {props.children}
    </div>
}