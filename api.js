const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const getDataAsync = async (endpoint, onDataRetrieved) => {
    const rawData = await fetch(BASE_URL + endpoint);
    const jsonData = await rawData.json();
    onDataRetrieved(jsonData);
}