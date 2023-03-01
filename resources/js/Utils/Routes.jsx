export function router(name, variables) {
    return route(name, {...variables, store: window.store.hash});
}