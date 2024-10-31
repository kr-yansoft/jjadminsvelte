<script>
         import FilterField from '../../../components/part/FilterField.svelte';
import Title from '../../../components/part/Title.svelte';
    import Datapicker from '../../../components/part/Datapicker.svelte';
    import Search from '../../../components/part/Search.svelte';
    import { onMount } from 'svelte';
    import { fetchAndSetDataForPage } from '../../../lib/stores/dataHelpers';
    import { dataStore } from '../../../lib/stores/dataStore';
    import DataTable from "../../../components/common/DataTable.svelte";
 
    
    let fileName = 'MemberList';
    const tableColumns = [
        { field:'toplevel', label: '최상위'},
        { field:'directorsuperior', label: '직상위'},
        { field:'member', label: '회원'},
        { field:'balanceheldamount', label: '보유금액'},
        { field:'donutpoints', label: '더너트 알', textAlign:'right'},
        { field:'commission', label: '수수료'},
        { field:'totalrecharge', label: '충전합'},
        { field:'totalwithdrawal', label: '환전합'},
        { field:'profit', label: '수익'},
        { field:'credit', label: '여신'},
        { field:'accountholder', label: '예금주'},
        { field:'message', label: '쪽지'},
        { field:'status', label: '상태'},
        { field:'loginaccess', label: '접속'},
        { field:'loginfailure', label: '접속실패'},
        { field:'registrationdate', label: '가입일'},
        { field:'lastlogin', label: '최근로그인'},
        { field:'edit', label: '수정'},
        { field:'delete', label: '삭제'},
    ]
    let filterField = "status";
    onMount(() => {
        fetchAndSetDataForPage(fileName);
    });
    $: tableData = $dataStore.tableData;
</script>

<div class="panel panel-inverse px-4 py-4 m-0">
    <Title title="회원 관리" showTitle={true} showPerPage={true} />
    <div class="d-flex justify-content-between mt-2">
        <div class="btn-wrapper" id="first">
            <button type="button" class="btn">전체</button>
            <button type="button" class="btn">가입</button>
            <button type="button" class="btn">보류</button>
        </div>
        <div class="btn-wrapper">
            <button type="button" class="btn btn-danger">랭킹보기</button>
            <button type="button" class="btn btn-secondary">회원 수정로그</button>
            <button type="button" class="btn btn-secondary">블랙 라스트</button>
            <button type="button" class="btn btn-secondary">회원추가</button>
        </div>
    </div>
    <div class="d-flex justify-content-between align-items-center mt-2">
        <div class="d-flex">
            <FilterField />
            <Datapicker />
            <Search />
        </div>
        <div class="d-flex">
            <span>회원: 66</span>
             <span class="mx-3">소지금합계: 32,655,011</span> 
             <span>수수료합계: 3,511,754</span>
        </div>
    </div>
    <DataTable
    {tableData}
    {tableColumns}
    />
</div>
<style scoped>
#first button {
    border: 1px solid #ced4da;
}
</style>