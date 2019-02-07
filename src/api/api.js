export const getList = (url) =>
    fetch(`${url}`, {
        method: 'GET',
        mode: 'cors'
    })
        .then(response => response.json())




