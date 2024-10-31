<script>
         import FilterField from '../../../components/part/FilterField.svelte';
import Title from '../../../components/part/Title.svelte';
    import Datapicker from '../../../components/part/Datapicker.svelte';
    import Search from '../../../components/part/Search.svelte';
    import { onMount } from 'svelte';
    import { fetchAndSetDataForPage } from '../../../lib/stores/dataHelpers';
    import { dataStore } from '../../../lib/stores/dataStore';
    import DataTable from "../../../components/common/DataTable.svelte";
    let fileName = 'MemberBalanceHistory';

    const tableColumns = [
        { field:'member', label: '회원'},
        { field:'type', label: '타입'},
        { field:'game', label: '게임'},
        { field:'session', label: '회차'},
        { field:'prevbalance', label: '이전 잔고'},
        { field:'balance', label: '잔고'},
        { field:'postbalance', label: '이후 잔고'},
        { field:'accumulationtime', label: '적립 시간'},
        
    ]
    let filterField = "status";
    onMount(() => {
        fetchAndSetDataForPage(fileName);
    });
    $: tableData = $dataStore.tableData;
</script>

<div class="panel panel-inverse px-4 py-4 m-0">
    <Title title="회원 잔고내역" showTitle={true} showPerPage={true} />
    <div class="d-flex justify-content-between align-items-center mt-2">
        <div class="d-flex">
            <FilterField />
            <Datapicker />
            <Search />
        </div>
    </div>
    <DataTable
    {tableData}
    {tableColumns}
    />
</div>
