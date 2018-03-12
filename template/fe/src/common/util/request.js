export function createFetchParams(params) {
    return Object.keys(params).map(
        key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    ).join('&');
}

export function post(url, data) {

    return fetch(url, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: createFetchParams(data)
    })
    .then(response => response.json());
}

export function get(url, params = {}) {

    return fetch(`${url}&${createFetchParams(params)}`, {credentials: 'include'})
    .then(response => response.json());
}
