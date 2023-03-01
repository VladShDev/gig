export async function request(url, method = "GET", data, type = "application/json") {
    let json_data = JSON.stringify(data);

    const fetchResponse = await fetch(url, {
        method: method,
        headers: {
            'Accept': type,
            'Content-Type': type,
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').attributes.content.textContent
        },
        body: method == 'POST' ? json_data : null
    });

    const json = await fetchResponse.json();

    if (fetchResponse.status >= 400 && fetchResponse.status < 600) {
        return Promise.reject(json);
    }
    return json;
}

export async function post(url, data, type = "application/json") {

    return await request(url, 'POST', data, type);
}

export async function get(url, data, type = "application/json") {
    return await request(url, 'GET', data, type);
}

export async function DELETE(url, data, type = "application/json") {
    return await request(url, 'DELETE', data, type);
}