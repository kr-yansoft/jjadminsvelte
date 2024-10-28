
import { fetchTableData, fetchTableData2, dataStore } from '../stores/dataStore';
import { get } from 'svelte/store'; 


export async function fetchAndSetData() {
  try {
      const storeValues = get(dataStore);
      const { currentPage, itemsPerPage } = storeValues;
      const result = await fetchTableData(currentPage, itemsPerPage); 
      if (result && result.data) {
          dataStore.update(store => ({
              ...store,
              tableData: result.data,
              totalRecords: result.totalRecords,
          }));
          return result; 
      } else {
          return null; 
      }
  } catch (error) {
      return null; 
  }
}

export async function fetchAndSetData2() {
    try {
        const storeValues = get(dataStore);
        const { currentPage, itemsPerPage } = storeValues;
        const result = await fetchTableData2(currentPage, itemsPerPage);
        if (result && result.data2) {
            dataStore.update(store => {
                const updatedStore = {
                    ...store,
                    tableData2: result.data2,
                    totalRecords: result.totalRecords,
                };
                return updatedStore;
            });
        } else {
            // console.error('Invalid data structure:', result);
        }
    } catch (error) {
        // console.error('Error fetching data:', error);
    }
}

