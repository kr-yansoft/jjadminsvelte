
<script>
import Switch from "../../../components/part/Switch.svelte";
</script>
<div class="panel p-4">
    <div class="btn-wrapper">
        <button type="button" class="btn btn-primary">정보</button>
        <button type="button" class="btn btn-secondary">수정로그</button>
    </div>
    
    <div class="p-3" id="basic">
        <h3>전체켜기</h3>
        <Switch title="전체켜기" dataOn="켜기" dataOff="크기" checked/>
        
        <div>
            <h3>카지노</h3>
            <div class="d-flex" id="casinoswitch">
                <Switch title="에볼루션" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="아시아 카지노" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="드림 카지노" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="보타 카지노" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="프라그마틱플레이 라이브" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="WM 카지노" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="Betgames.tv" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="마이크로게이밍" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="스카이윈드 라이브" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="타이산 카지노" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="플레이택 카지노" dataOn="사용" dataOff="미사용" checked/>
            </div>
        </div> 
        <div>
            <h3>슬롯</h3>
            <div class="d-flex flex-wrap" id="slotswitch">
                <Switch title="1x2 게이밍" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="아바타 UX" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="블루프린트" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="빅타임 게이밍" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="CQ9" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="부온고" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="ELK" dataOn="사용" dataOff="미사용" />
                <Switch title="드래곤소프트" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="에보플레이" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="게임아트" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="헥소 게이밍" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="하바네로" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="모바일럿" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="넷엔트" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="노리밋 시티" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="플레이펄" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="프라그마틱플레이" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="레드타이커" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="릴렉스 게이밍" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="트리플 PG" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="썬더 킥" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="와즈단" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="PG 소프트" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="릴 킹덤" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="마이크로게이밍 슬롯" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="위그드라실" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="플레이 스타" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="플레이슨" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="플레이앤고" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="플레이택 슬롯" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="푼타 게이밍" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="진지바오시" dataOn="사용" dataOff="미사용" checked/>
                <Switch title="Extended 넷엔트" dataOn="사용" dataOff="미사용" checked/>
                
           
            </div>
        </div>                   
    </div>
    <div class="btn-wrapper text-center">
        <button type="button" class="btn btn-primary w-200px">수정</button>
    </div>
</div>
<style scoped>
    #casinoswitch{
        gap: 50px;
    }
    #slotswitch{
      column-gap: 50px;
    }

</style>