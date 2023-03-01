import React from 'react';

export default function (props) {
    const {stores, current} = props;
    return <div className={'stores-switcher'}>
        <ul>

            {stores.map((store, i) => <li key={i}>
                {(current == store.hash) ? store.name : <a href={route('store', {store: store.hash})}>{store.name}</a>}
            </li>)}
        </ul>
        <a href={'#/stores'}>Manage Stores</a>
    </div>
}