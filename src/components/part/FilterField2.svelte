<script>
    import { locale } from 'svelte-i18n';
    import { t } from '../../i18n/i18n';
    import { writable } from 'svelte/store'; 
   export let tableColumns = [];
    export let tableData = [];
    export let selectedFilters = [];
    export const isDropdownOpen = writable(false); 

    export function applyFilters() {
        isDropdownOpen.set(false); 
    }

    export function clearFilters() {
        selectedFilters = [];
        isDropdownOpen.set(false);
    }

    export let filterField2 = "";

    export function toggleDropdown() {
        isDropdownOpen.update(value => !value); 
    }

    export function getUniqueColumnValues(columnField) {
    const uniqueValues = [...new Set(tableData.map(row => row[columnField]))];
    console.log("Unique values for", columnField, uniqueValues);
    return uniqueValues.map(value => ({
        value,
        label: $t(value) || value  
    }));
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
<div class="filter-select me-2">
        <button class="btn btn-select first-option text-nowrap" on:click={toggleDropdown}>
            {$t(tableColumns.find(col => col.field === filterField2)?.label || filterField2)}
            <i class=" fa-solid fa-chevron-down"></i>
        </button>
    {#if $isDropdownOpen} 
    <div class="dropdown-content">
        {#each getUniqueColumnValues(filterField2, t) as { value, label }, index}
            <div class="checkbox-option checkbox-wrapper-13">
                <input
                    type="checkbox"
                    id={`checkbox-${index}`}
                    checked={selectedFilters.includes(value)}
                    class="substituted  "
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
        .btn-select{
         border: 1px solid lightgray;
     }
 
     .btn-select i{
         color:black;
         font-weight: bold;
     }
    input {
        width: 200px;
        height: 30px;
        padding: 0 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
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
 
     .checkbox-wrapper-13 input[type=checkbox] {
      --active: #275EFE;
      --active-inner: #fff;
      --focus: 2px rgba(39, 94, 254, .3);
      --border: #BBC1E1;
      --border-hover: #275EFE;
      --background: #fff;
      --disabled: #F6F8FF;
      --disabled-inner: #E1E6F9;
      height: 18px;
      outline: none;
      display: inline-block;
      vertical-align: top;
      position: relative;
      margin: 0;
      cursor: pointer;
      border: 1px solid var(--bc, var(--border));
      background: var(--b, var(--background));
      transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
    }
    .checkbox-wrapper-13 input[type=checkbox]:after {
      content: "";
      display: block;
      left: 0;
      top: 0;
      position: absolute;
      transition: transform var(--d-t, 0.3s) var(--d-t-e, ease), opacity var(--d-o, 0.2s);
    }
    .checkbox-wrapper-13 input[type=checkbox]:checked {
      --b: var(--active);
      --bc: var(--active);
      --d-o: .3s;
      --d-t: .6s;
      --d-t-e: cubic-bezier(.2, .85, .32, 1.2);
    }
    .checkbox-wrapper-13 input[type=checkbox]:disabled {
      --b: var(--disabled);
      cursor: not-allowed;
      opacity: 0.9;
    }
    .checkbox-wrapper-13 input[type=checkbox]:disabled:checked {
      --b: var(--disabled-inner);
      --bc: var(--border);
    }
    .checkbox-wrapper-13 input[type=checkbox]:disabled + label {
      cursor: not-allowed;
    }
    .checkbox-wrapper-13 input[type=checkbox]:hover:not(:checked):not(:disabled) {
      --bc: var(--border-hover);
    }
    .checkbox-wrapper-13 input[type=checkbox]:focus {
      box-shadow: 0 0 0 var(--focus);
    }
    .checkbox-wrapper-13 input[type=checkbox]:not(.switch) {
      width: 21px;
    }
    .checkbox-wrapper-13 input[type=checkbox]:not(.switch):after {
      opacity: var(--o, 0);
    }
    .checkbox-wrapper-13 input[type=checkbox]:not(.switch):checked {
      --o: 1;
    }
    .checkbox-wrapper-13 input[type=checkbox] + label {
      display: inline-block;
      vertical-align: middle;
      cursor: pointer;
      margin-left: 4px;
    }
    .checkbox-wrapper-13 input[type=checkbox]:not(.switch) {
      border-radius: 3px;
    }
    .checkbox-wrapper-13 input[type=checkbox]:not(.switch):after {
      width: 5px;
      height: 9px;
      border: 2px solid var(--active-inner);
      border-top: 0;
      border-left: 0;
      left: 6px;
      top: 2px;
      transform: rotate(var(--r, 20deg));
    }
    .checkbox-wrapper-13 input[type=checkbox]:not(.switch):checked {
      --r: 43deg;
    }
    .checkbox-wrapper-13 * {
        box-sizing: inherit;
    }
    .checkbox-wrapper-13 *:before,
    .checkbox-wrapper-13 *:after {
        box-sizing: inherit;
    }
</style>