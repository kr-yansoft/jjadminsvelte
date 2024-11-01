<script>
    import Search from '../../components/part/Search.svelte';
    import FilterField from '../../components/part/FilterField.svelte';
    import Title from '../../components/part/Title.svelte';
    import Datepicker from '../../components/part/Datapicker.svelte';
    import { onMount } from 'svelte';
    import { fetchAndSetDataForPage } from '../../lib/stores/dataHelpers';
    import { dataStore } from '../../lib/stores/dataStore';
    import DataTable from "../../components/common/DataTable.svelte";
    import { locale } from 'svelte-i18n';

    let fileName = 'ChargeManagement';
    let filteredData = [];
    let tableData = []; 
    let dataTableKey = 0; 
    const tableColumns = [
        { field:'toplevel', label: '최상위'},
        { field:'directorsuperior', label: '직상위'},
        { field:'member', label: '회원'},
        { field:'requestcategory', label: '요청분류'},
        { field:'accountholder', label: '예금주'},
        { field:'requestamount', label: '신청금액'},
        { field:'resultamount', label: '결과금액'},
        { field:'requestdatetime', label: '신청일시'},
        { field:'handlerproccesor', label: '처리자'},
        { field:'processingdatetime', label: '처리일시'},
        { field:'status', label: '상태'},
        { field:'memonotes', label: '메모', type:'input'},
        { field:'bonustype', label: '보너스 타입'},
        { field:'bonusrecharge', label: '보너스 충전', type:'not-allowed'},
        { field:'functionfeatures', label: '기능'},
    ];
    let filterField = "status";

    onMount(async () => {
        await fetchAndSetDataForPage(fileName);
        console.log("Data loaded in parent component:", $dataStore.tableData); 
    });
    let selectedFilters = [];
    
    $: tableData = $dataStore.tableData;
    $: console.log("tableData updated:", tableData); 

    $: filteredData = tableData.filter(row => {
        const matchesSelectedFilters = selectedFilters.length === 0 || selectedFilters.includes(row[filterField]);
        return matchesSelectedFilters;
    });

    $: dataTableKey += 1;

    $: console.log("filteredData updated:", filteredData); 

    function handleFilteredData(event) {
        console.log("Received filtered data from Search component:", event.detail); 
        filteredData = event.detail;
        dataTableKey += 1;
    }
    function handleFilter(event) {
        selectedFilters = event.detail; 
        console.log("Selected filters from DropdownFilter:", selectedFilters);

        
    }
</script>

{#if $locale}
<div class="panel panel-inverse px-4 py-4 m-0">
    <Title title="충전 관리" showTitle={true} showPerPage={true} />
    <div class="btn-wrapper mt-2">
        <button class="btn btn-primary">전체</button>
        <button class="btn btn-danger">요청</button>
        <button class="btn btn-secondary">대기</button>
    </div>
  
    <div class="d-flex justify-content-between align-items-center mt-2">
        <div class="d-flex">
            <FilterField 
            {tableData}
    filterField={filterField}
    selectedFilters={selectedFilters}
    on:applyFilters={handleFilter}
            />
            <Datepicker />
            <Search {tableData} on:filter={handleFilteredData} />
        </div>
        <span>총 금액: 0</span>
    </div>
    <DataTable
        {filteredData}
        {tableColumns}
        showDatePicker={true}
        key={dataTableKey}
    />
</div>
{/if}
