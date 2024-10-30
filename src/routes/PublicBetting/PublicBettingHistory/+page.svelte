<script>
    import { onMount } from 'svelte';
    import { fetchAndSetDataForPage } from '../../../lib/stores/dataHelpers';
    import { dataStore } from '../../../lib/stores/dataStore';
    import DataTable from "../../../components/common/DataTable.svelte";
    
    let fileName = 'PublicBettingHistory';
    const tableColumns = [
        { field:'id', label: '아이디/닉네임'},
        { field:'type', label: '타입'},
        { field:'gameprovider', label: '게임사'},
        { field:'game', label: '게임'},
        { field:'round', label: '회차'},
        { field:'transactionumber', label: '트랜잭션번호'},
        { field:'bettingamount', label: '배팅금'},
        { field:'commissionrate', label: '수수료율'},
        { field:'commission ', label: '수수료'},
        { field:'accumulationtime', label: '적립시간'},
        { field:'payment ', label: '지급'}
       
        
    ]
    let filterField = "status";
    onMount(() => {
        fetchAndSetDataForPage(fileName);
    });
    $: tableData = $dataStore.tableData;
</script>

<DataTable
{tableData}
{tableColumns} showDatePicker={true} {filterField} showButtons={true} title="공배팅 내역"/>
