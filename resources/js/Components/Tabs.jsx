import React, {useState} from 'react';

export default function (props) {

    let active = false;

    const [activeTab, setActiveTab] = useState(0);

    const setTab = (index) => {
        setActiveTab(index);
    }

    return <div className={'tabs ' + props.type}>
        <ul>{props.children.map((tab, id) => <li className={activeTab == id ? "active" : null}>
            <span onClick={e => setTab(id)}>{tab.props.name}</span>
        </li>)}</ul>
        {props.children[activeTab]}
    </div>
}