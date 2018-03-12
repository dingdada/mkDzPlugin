export function parseQuery(search) {
    const query = search.substring(1);
    const items = query.split('&');
    const args = {};
    items.forEach(item => {
        const keyValue = item.split('=');
        args[keyValue[0]] = keyValue[1] || '';
    });

    return args;
}

export function parseUrlParams() {
    const index = window.location.href.indexOf('?');
    const params = window.location.href.slice(index + 1);
    return params.split('&').reduce(
        (params, kv) => {
            kv = kv.split('=').map(decodeURIComponent);
            params[kv[0]] = kv[1] || '';
            return params;
        },
        {}
    );
}
