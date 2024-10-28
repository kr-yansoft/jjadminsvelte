import { writable } from 'svelte/store';

export const dataStore = writable({
    tableData: [],
    tableData2: [],
    totalRecords: 0,
    currentPage: 1,
    itemsPerPage: 10,
    totalPages: 0,
});

export async function fetchTableData(page, size) {
    try {
        const response = await fetch(`http://localhost:5000/api/data?page=${page}&size=${size}`);

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        if (Array.isArray(result.data) && typeof result.totalRecords === 'number') {
            return result;
        } else {
            throw new Error('Invalid API response structure');
        }
    } catch (error) {
        return { data: [], totalRecords: 0 }; 
    }
}


export async function fetchTableData2(page, size) {
    try {
        const response = await fetch(`http://localhost:5000/api/data2?page=${page}&size=${size}`);

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        console.log("API Response (Table 2222222222222222):", result); 
        if (Array.isArray(result.data2) && typeof result.totalRecords === 'number') {

            dataStore.update(store => ({
                ...store,
                tableData2: result.data2,
                totalRecords: result.totalRecords,
            }));
            return result;
        } else {
            throw new Error('Invalid data structure from API');
        }
    } catch (error) {
        return { data2: [], totalRecords: 0 }; 
    }
}

export async function fetchDataForPage(page = 1, size = 10) {
    try {
        const result = await fetchTableData(page, size);

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
    } catch (error) {
        console.error('Error fetching data for the page:', error);
    }
}

export function nextPage() {
    dataStore.update(store => {
        const nextPage = store.currentPage + 1;
        if (nextPage <= store.totalPages) {
            fetchDataForPage(nextPage, store.itemsPerPage); 
            return { ...store, currentPage: nextPage };
        }
        return store; 
    });
}

export function previousPage() {
    dataStore.update(store => {
        const prevPage = store.currentPage - 1;
        if (prevPage > 0) {
            fetchDataForPage(prevPage, store.itemsPerPage); 
            return { ...store, currentPage: prevPage };
        }
        return store; 
    });
}


export function setItemsPerPage(size) {
    dataStore.update(store => {
        fetchDataForPage(1, size); 
        return { ...store, currentPage: 1, itemsPerPage: size };
    });
}
