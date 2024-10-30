import { writable } from 'svelte/store';

export const dataStore = writable({
    tableData: [],
    totalRecords: 0,
    currentPage: 1,
    itemsPerPage: 10,
    totalPages: 0,
});

export async function fetchTableData(fileName, page = 1, size = 10) {
    try {
        const response = await fetch(`http://localhost:5000/api/data/${fileName}?page=${page}&size=${size}`);

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching data:', error);
        return { data: [], totalRecords: 0 };
    }
}

export async function fetchDataForPage(fileName, page = 1, size = 10) {
    const result = await fetchTableData(fileName, page, size);

    dataStore.update(store => {
        const totalPages = Math.ceil(result.totalRecords / size);
        return {
            ...store,
            tableData: result.data,
            totalRecords: result.totalRecords,
            totalPages: totalPages,
            currentPage: page,
        };
    });

    return result;
}
