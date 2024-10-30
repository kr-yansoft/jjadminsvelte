<script>
    export let tableColumns = []; // Table column definitions
    export let tableData = []; // JSON data for the table

    let expandedRows = new Set(); // Track expanded rows by index

    // Toggle function to expand or collapse sub-rows
    function toggleSubRows(rowIndex) {
        console.log(`Toggling row at index: ${rowIndex}`); // Debug log
        console.log('Expanded rows before toggle:', Array.from(expandedRows)); // Debug log

        if (expandedRows.has(rowIndex)) {
            console.log(`Collapsing row at index: ${rowIndex}`); // Debug log
            expandedRows.delete(rowIndex); // Collapse the row
        } else {
            console.log(`Expanding row at index: ${rowIndex}`); // Debug log
            expandedRows.add(rowIndex); // Expand the row
        }

        console.log('Expanded rows after toggle:', Array.from(expandedRows)); // Debug log
    }

    // Helper to check if a row is expanded
    function isExpanded(rowIndex) {
        const expanded = expandedRows.has(rowIndex);
        console.log(`Is row ${rowIndex} expanded?`, expanded); // Debug log
        return expanded;
    }
</script>

<!-- Main Table -->
<table class="table table-bordered">
    <thead>
        <tr>
            {#each tableColumns as col}
                <th class="text-center">{col.label}</th>
            {/each}
        </tr>
    </thead>
    <tbody>
        {#if tableData.length > 0}
            {#each tableData as row, rowIndex}
                <!-- Parent Row -->
                <tr>
                    {#each tableColumns as column}
                        <td>
                            {#if column.type === 'button-row'}
                                <button 
                                    class="btn btn-link p-0"
                                    on:click={() => toggleSubRows(rowIndex)}
                                >
                                    {isExpanded(rowIndex) ? '▼ Hide' : '▲ Show'} SubRows
                                </button>
                            {:else}
                                {row[column.field] ?? ''}
                            {/if}
                        </td>
                    {/each}
                </tr>

                <!-- Render Main Headquarters (Nested Rows) -->
                {#if isExpanded(rowIndex) && row.mainheadquarters}
                    {#each row.mainheadquarters as main, mainIndex}
                        <tr class="table-secondary">
                            <td colspan={tableColumns.length}>
                                <strong>Main: {main.mainheadquarters}</strong>

                                <!-- Render Subheadquarters in a Nested Table -->
                                {#if main.subheadquarters?.length > 0}
                                    <table class="table table-sm sub-table">
                                        <thead>
                                            <tr>
                                                <th>Sub Headquarters</th>
                                                <th>Distributor</th>
                                                <th>Store</th>
                                                <th>User</th>
                                                <th>7 Levels</th>
                                                <th>Admin Deposits</th>
                                                <th>Personal Deposits</th>
                                                <th>Subordinate Deposits</th>
                                                <th>Total Deposits</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {#each main.subheadquarters as sub}
                                                <tr>
                                                    <td>{sub.subheadquarters}</td>
                                                    <td>{sub.distributor || '-'}</td>
                                                    <td>{sub.store || '-'}</td>
                                                    <td>{sub.user || '-'}</td>
                                                    <td>{sub['7levels'] || '-'}</td>
                                                    <td>{sub.admindepositswithdrawals || '-'}</td>
                                                    <td>{sub.personaldepositswithdrawals || '-'}</td>
                                                    <td>{sub.subordinatedepositswithdrawals || '-'}</td>
                                                    <td>{sub.totaldepositswithdrawals || '-'}</td>
                                                </tr>
                                            {/each}
                                        </tbody>
                                    </table>
                                {:else}
                                    <p>No Sub Headquarters available</p>
                                {/if}
                            </td>
                        </tr>
                    {/each}
                {/if}
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

<style>
    .table-secondary {
        background-color: #f8f9fa;
    }

    .btn-link {
        text-decoration: none;
        color: inherit;
        cursor: pointer;
    }

    .sub-table {
        width: 100%;
        margin-top: 5px;
        border-collapse: collapse;
    }

    .sub-table th, .sub-table td {
        padding: 8px;
        border: 1px solid #ddd;
    }
</style>
