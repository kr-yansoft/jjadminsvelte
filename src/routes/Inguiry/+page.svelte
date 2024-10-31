<script>
        import FilterField from '../../components/part/FilterField.svelte';
import Title from '../../components/part/Title.svelte';
    import Datapicker from '../../components/part/Datapicker.svelte';
    import Search from '../../components/part/Search.svelte';
            import { onMount } from 'svelte';
    import { fetchAndSetDataForPage } from '../../lib/stores/dataHelpers';
    import { dataStore } from '../../lib/stores/dataStore';
    import DataTable from "../../components/common/DataTable.svelte";
    let fileName = 'Inquiry';

    const tableColumns = [
        { field:'toplevel', label: '최상위'},
        { field:'directorsuperior', label: '직상위'},
        { field:'member', label: '회원'},
        { field:'title', label: '제목'},
        { field:'datecreater', label: '작성일'},
        { field:'status', label: '상태'},
        { field:'responsedate', label: '응답일'},
        { field:'functionfeatures', label: '기능', type:'two-buttons'},
    ]
    let filterField = 'status'
    onMount(() => {
        fetchAndSetDataForPage(fileName);
    });
    $: tableData = $dataStore.tableData;

</script>
<div class="panel panel-inverse px-4 py-4 m-0">
    <Title title="1:1 문의" showTitle={true} showPerPage={true} />
    <div class="d-flex justify-content-between">
        <div class="btn-wrapper mt-2" id="not-button">
            <button class="btn ">전체</button>
            <button class="btn ">신규문의</button>
            <button class="btn ">대기</button>
            <button class="btn ">답변완료</button>
            <button class="btn ">삭제</button>
        </div>
        <div class="btn-wrapper mt-2">
            <button class="btn btn-danger">전체 삭제</button>
            <button class="btn btn-secondary">템플릿 관리</button>
        </div>
    </div>
  
    <div class="d-flex justify-content-between align-items-center mt-2">
        <div class="d-flex">
            <FilterField />
            <Datapicker />
            <Search />
        </div>
    </div>
    <DataTable
    {tableColumns}
    {tableData}
    />
</div>
<style scoped>
    #not-button button {
        border: 1px solid #ced4da;
    }
</style>    