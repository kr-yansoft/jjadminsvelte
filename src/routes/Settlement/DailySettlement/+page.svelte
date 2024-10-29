<script>
    import DataTable2 from '../../../components/common/DataTable2.svelte';
    import { onMount } from 'svelte';
    import flatpickr from 'flatpickr'; 
    import 'flatpickr/dist/flatpickr.css'; 
    import { fetchAndSetData } from '../../../lib/stores/dataHelpers';
    import { dataStore } from '../../../lib/stores/dataStore';
 
    const tableColumns = [
        { field: 'game', label: '게임' },
        { field: 'totalbet', label: '총 배팅' },
        { field: 'totalwin', label: '총 당첨' },
        { field: 'commission', label: '수수료' },
        { field: 'dailytotal', label: '합계' },
        { field: 'pushedamount', label: '누른 금액', type: 'html' },
        { field: 'pushwin', label: '누르기 당첨' },
        { field: 'commission', label: '수수료' },
        { field: 'pushtotal', label: '누르기/루징 합계' },
        { field: 'balance', label: '밸런스' },
        { field: 'insurancebet', label: '보험 배팅' },
        { field: 'insurancewin', label: '보험 당첨' },
        { field: 'commission', label: '수수료' },
        { field: 'insurancetotal', label: '보험 합계' },
        { field: 'grandtotal', label: '총 합계' },
    ];
    const gameOptions = [
    { value: "all", label: "전체" },
    { value: "pbg-powerball", label: "PBG파워볼" },
    { value: "pbg-regular-combo", label: "PBG일반볼 조합" },
    { value: "pbg-powerball-combo", label: "PBG파워볼 조합" },
    { value: "pbg-regular-size", label: "PBG일반볼 대중소" },
    { value: "pbg-powerball-odd-even", label: "PBG파워볼 홀짝조합" },
    { value: "pbg-regular-plus-powerball", label: "PBG일반볼 조합 + 파워볼" },
    { value: "pbg-powerball-guess", label: "PBG파워볼 맞추기" },
    { value: "powerball", label: "파워볼" },
    { value: "regular-combo", label: "일반볼 조합" },
    { value: "powerball-combo", label: "파워볼 조합" },
    { value: "regular-size", label: "일반볼 대중소" },
    { value: "powerball-odd-even", label: "파워볼 홀짝조합" },
    { value: "regular-plus-powerball", label: "일반볼 조합 + 파워볼" },
    { value: "powerball-guess", label: "파워볼 맞추기" },
    { value: "evo-powerball", label: "EVO파워볼" },
    { value: "evo-regular-combo", label: "EVO일반볼 조합" },
    { value: "evo-powerball-combo", label: "EVO파워볼 조합" },
    { value: "evo-regular-size", label: "EVO일반볼 대중소" },
    { value: "evo-powerball-odd-even", label: "EVO파워볼 홀짝조합" },
    { value: "evo-regular-plus-powerball", label: "EVO일반볼 조합 + 파워볼" },
    { value: "evo-powerball-guess", label: "EVO파워볼 맞추기" },
  ];



    onMount(() => {
        fetchAndSetData(); 
    });


</script>


<DataTable2 
title="일 정산"
{tableColumns} 
tableData={$dataStore.tableData} 
{gameOptions}
 />
   

