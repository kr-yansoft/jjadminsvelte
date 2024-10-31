<script>
     import FilterField from '../../../components/part/FilterField.svelte';
import Title from '../../../components/part/Title.svelte';
    import Datapicker from '../../../components/part/Datapicker.svelte';
    import Search from '../../../components/part/Search.svelte';
        import { onMount } from 'svelte';
    import { fetchAndSetDataForPage } from '../../../lib/stores/dataHelpers';
    import { dataStore } from '../../../lib/stores/dataStore';
    import DataTable from "../../../components/common/DataTable.svelte";
    let fileName = 'CasinoSlotMemberSettlement';

    const tableColumns = [
        { field:'member', label: '회원'},
        { field:'casinobettingamount', label: '카지노 배팅금액'},
        { field:'casinowinningamount', label: '카지노 당첨금액'},
        { field:'casinocommission', label: '카지노 수수료'},
        { field:'casinobetswins', label: '카지노 배팅횟수 / 당첨횟수'},
        { field:'casinosettlement', label: '카지노 정산'},
        { field:'slotbettingamount', label:'슬롯 배팅금액'},
        { field:'slotwinningamount', label: '슬롯 당첨금액'},
        { field:'slotcommission', label: '슬롯 수수료'},
        { field:'slotbetswins', label: '슬롯 배팅횟수 / 당첨횟수'},
        { field:'slotsettlement', label: '슬롯 정산'},
        { field:'totalbetswins', label: '총 배팅횟수 / 당첨횟수'},
        { field:'totalsettlement', label: '총 정산'},
        { field:'details', label: '상세'},
        { field:'calculator', label: '계산기', button:'one-button'},
            ]
            let filterField = "status";
            onMount(() => {
        fetchAndSetDataForPage(fileName);
    });
    $: tableData = $dataStore.tableData;
</script>

<div class="panel panel-inverse px-4 py-4 m-0">
    <Title title="카지노/슬롯 회원 정산" showTitle={true} showPerPage={true} />
    <div class="d-flex justify-content-between align-items-center mt-2">
        <div class="d-flex">
            <FilterField />
            <Datapicker />
            <Search />
        </div>
    </div>
    
    <DataTable
    {tableData}
    {tableColumns} />
</div>
