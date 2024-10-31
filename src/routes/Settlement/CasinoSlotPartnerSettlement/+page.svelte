<script>
    
    import FilterField from '../../../components/part/FilterField.svelte';
import Title from '../../../components/part/Title.svelte';
    import Datapicker from '../../../components/part/Datapicker.svelte';
    import Search from '../../../components/part/Search.svelte';
           import { onMount } from 'svelte';
    import { fetchAndSetDataForPage } from '../../../lib/stores/dataHelpers';
    import { dataStore } from '../../../lib/stores/dataStore';
    import DataTable from "../../../components/common/DataTable.svelte";
    let fileName = 'CasinoSlotPartnerSettlement';
    const tableColumns = [
        { field:'headheadquarters', label: '왕본사'},
        { field:'mainheadquarters', label: '대본사'},
        { field:'subheadquarters', label: '부본사'},
        { field:'distributor', label: '총판'},
        { field:'store', label: '매장'},
        { field:'user', label: '유저'},
        { field:'7levels', label:'7단계'},
        { field:'casinopersonal', label: '카지노 개인', type:'html'},
        { field:'casinosubordinate', label: '카지노 하부'},
        { field:'slotpersonal', label: '슬롯 개인'},
        { field:'slotsubordinate', label: '슬롯 하부'},
        { field:'total', label: '토탈'},
        { field:'calculator', label: '계산기', type:'one-button'},
            ]
            onMount(() => {
        fetchAndSetDataForPage(fileName);
    });
    $: tableData = $dataStore.tableData;
</script>

<div class="panel panel-inverse px-4 py-4 m-0">
    <Title title="카지노/슬롯 파트너 정산" showTitle={true} showPerPage={true} />
    <div class="d-flex justify-content-between align-items-center mt-2">
        <div class="d-flex">
            <FilterField />
            <Datapicker />
            <Search />
        </div>
    </div>
    <DataTable
    {tableData}
    {tableColumns}/>
</div>
