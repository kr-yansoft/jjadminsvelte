<script>
    import DataTable from "../../../components/common/DataTable.svelte";
    import { onMount } from 'svelte';
    import { fetchAndSetData } from '../../../lib/stores/dataHelpers';
    import { dataStore } from '../../../lib/stores/dataStore';
    const tableColumns = [
        { field:'game', label: '게임'},
        { field:'round', label: '회차'},
        { field:'targetsite', label: '대상사이트'},
        { field:'id', label: '아이디'},
        { field:'ratio', label: '비율'},
        { field:'bettingamount', label: '배팅금액'},
        { field:'winningamount', label: '당첨금액', },
        { field:'bettingfee', label: '배팅 수수료', },
        { field:'status', label: '상태', },
        { field:'processingtime', label: '처리시각', },
        { field:'detailedlog', label: '상세로그', },
    ]
    onMount(() => {
        fetchAndSetData();
    });
</script>
{#if $dataStore.tableData.length > 0}

<DataTable {tableColumns} tableData={$dataStore.tableData} title="카지노/슬롯 보험내역"/>
{:else}
        <p>Loading data...</p>
    {/if}