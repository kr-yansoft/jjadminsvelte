<script>
    import { goto } from '$app/navigation'; 
    import Switch from "../../../components/part/Switch.svelte";
    function goToMemberPage() {
        goto('/MemberManagement/CreateMember'); 
    }
</script>

<div class="panel p-4">
    <h1>파트너 생성</h1>
    <div class="btn-wrapper">
        <button type="button" class="btn btn-secondary" on:click={goToMemberPage}>회원</button>
        <button type="button" class="btn btn-primary" >
            파트너
        </button>
    </div>
    <div class="row">
        <div class="col col-2">
            <div class="d-flex flex-column my-2">
                <span for="">직상위 파트너</span>
                <input type="text" class="form-control">
            </div>
            <div class="d-flex flex-column my-2">
                <span for="">*아이디너</span>
                <input type="text" class="form-control">
            </div>
            <div class="d-flex flex-column my-2">
                <span for="">*비밀번호</span>
                <input type="text" class="form-control">
            </div>
            <div class="d-flex flex-column my-2">
                <span for="">*환전 비밀번호</span>
                <input type="text" class="form-control">
            </div>
            <div class="d-flex flex-column">
                <span>유저대량생성</span>
                <Switch title="ex)1~30" dateOn="사용" dateOff="미사용" styleclass="text-danger" padding="pt-0"/>
            </div>
        </div>
        <div class="col col-2">
            <div class="d-flex flex-column my-2">
                <span for="">은행명</span>
                <input type="text" class="form-control">
            </div>
            <div class="d-flex flex-column my-2">
                <span for="">*계좌번호</span>
                <input type="text" class="form-control">
            </div>
            <div class="d-flex flex-column my-2">
                <span for="">**예금주</span>
                <input type="text" class="form-control">
            </div>
            <div class="d-flex flex-column my-2">
                <span for="">*연락처 -없이 입력</span>
                <input type="text" class="form-control">
            </div>
            <div class="d-flex flex-column my-2">
                <span for="">*메모
                </span>
                <textarea class="form-control" rows="3"></textarea>
            </div>
            
        </div>
        <div class=" col col-2">
            
            <div class="d-flex flex-wrap p-4 mt-4" id="switchers">
                <Switch title="파트너 페이지 사용" dateOn="사용" dateOff="미사용" padding="pt-0" checked/>
                <Switch title="하부머니지급 사용" dateOn="사용" dateOff="미사용" padding="pt-0" checked/>
                <Switch title="하부머니차감 사용" dateOn="사용" dateOff="미사용" padding="pt-0" checked/>
                <Switch title="환전 신청" dateOn="사용" dateOff="미사용" padding="pt-0" checked/>
                <Switch title="수수료전환 신청" dateOn="사용" dateOff="미사용" padding="pt-0" checked/>
                <Switch title="배팅 리더" dateOn="사용" dateOff="미사용" padding="pt-0"/>
                <Switch title="카지노배팅 허용" dateOn="사용" dateOff="미사용" padding="pt-0" checked/>
                <Switch title="슬롯배팅 허용" dateOn="사용" dateOff="미사용" padding="pt-0" checked/>
                <Switch title="API 사용" dateOn="사용" dateOff="미사용" padding="pt-0"/>
                <Switch title="회원웹배팅 허용" dateOn="사용" dateOff="미사용" padding="pt-0"/>
                <Switch title="따라쟁이" dateOn="사용" dateOff="미사용" padding="pt-0"/>
            </div>
        </div>
    </div>
<button class="btn btn-primary mt-3 w-100px">파트너 추가</button>
   
</div>

<style scoped>
    #switchers{
        column-gap: 50px;
        border: 1px solid black;
    }
</style>