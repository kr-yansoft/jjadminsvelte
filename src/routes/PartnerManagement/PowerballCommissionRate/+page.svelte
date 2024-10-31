<script>
             import FilterField from '../../../components/part/FilterField.svelte';
import Title from '../../../components/part/Title.svelte';
    import Datapicker from '../../../components/part/Datapicker.svelte';
    import Search from '../../../components/part/Search.svelte';
    import { onMount } from 'svelte';
    import { fetchAndSetDataForPage } from '../../../lib/stores/dataHelpers';
    import { dataStore } from '../../../lib/stores/dataStore';
    import DataTable from "../../../components/common/DataTable.svelte";
    let fileName = 'PowerballCommissionRate';

    const tableColumns = [
        { field:'kingheadquarters', label: '왕본사'},
        { field:'mainheadquarters', label: '대본사'},
        { field:'brancheadquarters', label: '부본사'},
        { field:'distributor', label: '총판'},
        { field:'store', label: '매장', textAlign:'right'},
        { field:'user', label: '유저'},
        { field:'levels', label: '7단계'},
        { field:'pgbbettingrate', label: 'PBG파워볼 배팅 수수료율'},
        { field:'pgbwinningrate', label: 'PBG파워볼 당첨 수수료율'},
        { field:'commission', label: '수수료'},
        { field:'partnercommission', label: '파트너 수수료'},
        { field:'subordinate', label: '하부'},
        { field:'settings', label: '설정'}
    ]
    let filterField = "status";
    onMount(() => {
        fetchAndSetDataForPage(fileName);
    });
    $: tableData = $dataStore.tableData;
</script>

<div class="panel panel-inverse px-4 py-4 m-0">
    <Title title="파워볼 수수료율" showTitle={true} showPerPage={true} />
    <div class="d-flex justify-content-between align-items-center mt-2">
        <div class="d-flex">
            <FilterField {filterField}/>
            <Datapicker />
            <Search />
        </div>
        <div class="d-flex align-items-center">
            <span>소지금 총액: 32,655,011</span>
            <span class="mx-2">수수료: 3,511,754</span>
            <button class="btn btn-primary">단계 관리</button>
        </div>
    </div>
    <DataTable
    {tableData}
    {tableColumns}
   />
</div>
