import { fetchDataForPage, dataStore } from '../stores/dataStore';
import { get } from 'svelte/store';

export async function fetchAndSetDataForPage(fileName) {
    const storeValues = get(dataStore);
    const { currentPage, itemsPerPage } = storeValues;

    try {
        const result = await fetchDataForPage(fileName, currentPage, itemsPerPage);
        if (result && result.data) {
            dataStore.update(store => ({
                ...store,
                tableData: result.data,
                totalRecords: result.totalRecords,
            }));
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
