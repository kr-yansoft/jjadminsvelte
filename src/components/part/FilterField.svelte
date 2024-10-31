<script>
    import { locale } from 'svelte-i18n';
    import { t } from '../../i18n/i18n';
    import initializeDataTable from '../common/DataTable.svelte';
    import { writable } from 'svelte/store'; 
   
export let tableData = [];
    export let selectedFilters = [];
    let tableColumns = [];
    export const isDropdownOpen = writable(false); // Change to writable store

    export function applyFilters() {
        initializeDataTable();
        isDropdownOpen.set(false); 
    }

    export function clearFilters() {
        selectedFilters = [];
        initializeDataTable();
        isDropdownOpen.set(false);
    }

    export let filterField = "";

    export function toggleDropdown() {
        isDropdownOpen.update(value => !value); 
    }

    export function getUniqueColumnValues(columnField, translate) {
        const uniqueValues = [...new Set(tableData.map(row => row[columnField]))];
        return uniqueValues.map(value => ({ value, label: translate(value) }));
    }

    export function handleCheckboxChange(value, event) {
        if (event.target.checked) {
            if (!selectedFilters.includes(value)) {
                selectedFilters = [...selectedFilters, value];
            }
        } else {
            selectedFilters = selectedFilters.filter(v => v !== value);
        }
    }
</script>


{#if $locale}
<input type="text" class="form-control">
<div class="filter-select me-2">
    <button class="btn btn-select first-option text-nowrap" on:click={toggleDropdown}>
        Select
    </button>
    {#if $isDropdownOpen} <!-- Access store value with $isDropdownOpen -->
    <div class="dropdown-content">
        {#each getUniqueColumnValues(filterField, t) as { value, label }, index}
            <div class="checkbox-option checkbox-wrapper-13">
                <input
                    type="checkbox"
                    id={`checkbox-${index}`}
                    checked={selectedFilters.includes(value)}
                    class="substituted"
                    on:change={(e) => handleCheckboxChange(value, e)}
                />
                <label for={`checkbox-${index}`}>{label}</label>
            </div>
        {/each}
        <div class="btn-wrap text-center my-2">
            <button type="button" class="btn btn-primary" on:click={applyFilters}>{$t('button.save')}</button>
            <button type="button" class="btn btn-danger" on:click={clearFilters}>{$t('button.clear')}</button>
        </div>
    </div>
    {/if}
</div>
{/if}
<style scoped>
    .dropdown-content {
         display: block;
         position: absolute;
         background-color: #f9f9f9;
         min-width: 160px;
         border: 1px solid #ddd;
         z-index: 1;
         box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
     }
     .dropdown-content label{
        width: 100%;
        text-align: left;
        padding-left: 5px;
     }
 
     .checkbox-option {
         padding: 5px;
         display: flex;
         align-items: center;
     }
 
     .checkbox-option input[type="checkbox"] {
         margin-right: 10px;
     }
</style>