import React from 'react';

import Loader from "@/Components/Loader";

function loadComponent(component) {
    const Component = React.lazy(() => {
            return import(`@/${component}`)
        }
    );
    return Component;
}

export function PrivateBuilder(props) {

    const {component, id, name, children} = props.configuration;
    let path = props.path;
    if (id) {
        path = (props.path ? props.path : "") + "/" + id;
    }

    const Component = loadComponent(component);

    return <React.Suspense fallback={<></>}>
        <Component {...props} path={path} onChange={props.onChange}/>
    </React.Suspense>
}

export default React.memo(PrivateBuilder, (oldProps, newProps) => {
    if (oldProps.configuration.id != newProps.configuration.id) return false;
    return true;
});
