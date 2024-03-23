const defaultUrl = 'http://localhost:8800/';

export const getInfo = (url) =>
    fetch(defaultUrl + url)
        .then(response => response.json())
        .then(data =>{return data})
        .catch(error => console.error(error));