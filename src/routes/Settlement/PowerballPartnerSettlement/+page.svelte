<script>
         import FilterField from '../../../components/part/FilterField.svelte';
import Title from '../../../components/part/Title.svelte';
    import Datapicker from '../../../components/part/Datapicker.svelte';
    import Search from '../../../components/part/Search.svelte';
    import { onMount } from 'svelte';
import { fetchAndSetDataForPage } from '../../../lib/stores/dataHelpers';
import { dataStore } from '../../../lib/stores/dataStore';
import DataTable from "../../../components/common/DataTable.svelte";
let fileName = 'PowerballPartnerSettlement';

const tableColumns = [
 { field:'headheadquarters', label: '왕본사'},
 { field:'mainheadquarters', label: '대본사'},
 { field:'subheadquarters', label: '부본사'},
 { field:'distributor', label: '총판'},
 { field:'store', label: '매장'},
 { field:'user', label: '유저'},
 { field:'7levels', label:'7단계'},
 { field:'pgb', label: 'PBG파워볼 정산'},
 { field:'totalcommission', label: '수수료 합'},
 { field:'personalsettlement', label: '개인 정산'},
 { field:'ctsettlement', label: '누르기 정산'},
 { field:'partnertotalsettlement', label: '파트너 총정산'}
     ]
     onMount(() => {
        fetchAndSetDataForPage(fileName);
    });
    $: tableData = $dataStore.tableData;
</script>

<div class="panel panel-inverse px-4 py-4 m-0">
    <Title title="파워볼 파트너 정산" showTitle={true} showPerPage={true} />
    <div class="d-flex justify-content-between align-items-center mt-2">
        <div class="d-flex">
            <FilterField />
            <Datapicker />
            <Search />
        </div>
    </div>
    <DataTable
    tableData={tableData}
    {tableColumns}/>
</div>
