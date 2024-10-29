<script>
    import { onMount } from 'svelte';
    import flatpickr from 'flatpickr';
    import 'flatpickr/dist/flatpickr.css';

    export let tableColumns = [];
    export let tableData = [];
    export let selectedOption = "";
    export let title = 'Default title';
    export let gameOptions = [];

    let selectedDate = new Date();
    let today = formatDate(new Date());
    let flatpickrInstance;


    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    onMount(() => {
        flatpickrInstance = flatpickr("#datePicker", {
            defaultDate: selectedDate,
            onChange: (selectedDates) => {
                selectedDate = selectedDates[0];
                today = formatDate(selectedDate); 
            },
        });
    });

    function goToPrevDay() {
        selectedDate.setDate(selectedDate.getDate() - 1);
        flatpickrInstance.setDate(selectedDate);
        today = formatDate(selectedDate); 
    }

    function goToNextDay() {
        selectedDate.setDate(selectedDate.getDate() + 1);
        flatpickrInstance.setDate(selectedDate);
        today = formatDate(selectedDate); 
    }
</script>

<div class="panel p-4">
    <h1>{title}</h1>
    <div class="d-flex">
        <div class="dropdown">
            <select class="dropdown-select form-select" bind:value={selectedOption}>
                <option value="" disabled selected hidden>전체</option>
                {#each gameOptions as option}
                    <option value={option.value}>{option.label}</option>
                {/each}
            </select>
        </div>
        <div class="date-group ms-2">
            <button type="button" class="btn" on:click={goToPrevDay}>&#10094;</button>
            <input type="text" id="datePicker" class="form-control m-0" />
            <button type="button" class="btn" on:click={goToNextDay}>&#10095;</button>
        </div>
    </div>

    <span class="mt-3" id="today">{today}</span> 

    <table class="table table-hover table-bordered align-middle text-nowrap ">
        <thead>
            <tr>
                {#each tableColumns as column}
                    <th class="text-center">{column.label}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#if tableData.length > 0}
                {#each tableData as row}
                    <tr>
                        {#each tableColumns as column, index}
                            {#if index === 0}
                                <th scope="row" class="text-center">{row[column.field] ?? ''}</th>
                            {:else}
                                <td>{row[column.field] ?? ''}</td>
                            {/if}
                        {/each}
                    </tr>
                {/each}
            {:else}
                <tr>
                    <td colspan={tableColumns.length} class="text-center">
                        No matching records found.
                    </td>
                </tr>
            {/if}
        </tbody>
    </table>
</div>

<style scoped>
    h1{
        color: #415e80;
    }
    th {
        background: #dee2e6;
    }
    .date-group {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .date-group input {
        border-radius: 0;
    }
    .date-group button {
        background:#415e80;
        color: white;
        border-radius: 0;
    }
    .date-group button:first-child {
        border-radius: 5px 0 0 5px;
    }
    .date-group button:last-child {
        border-radius: 0 5px 5px 0;
    }
    .form-control {
        width: 200px;
    }
    #today{
        font-size: 15px;
    }
</style>
