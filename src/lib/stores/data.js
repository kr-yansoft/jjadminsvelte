function generateNumberRange(firstValue, start = 1, end = 100, step = 1, appendPercentage = false) {
    let range = [];
    
    // Ensure the first value is always included as the first element.
    range.push(firstValue.toString()); 

    // Generate the rest of the range from `start` to `end`.
    for (let i = start; i <= end; i += step) {
        let value = i.toFixed(step < 1 ? 1 : 0); // Format numbers correctly.
        if (appendPercentage) {
            value += '%';
        }
        range.push(value);
    }

    return range;
}

const data = [
    {
        "toplevel":"test2",
        "directorsuperior":"test2",
        "member":"test222 (test222)",
        "requestcategory":"회원 포인트 전환",
        "accountholder":"예금주",
        "requestamount":"1,550",
        "resultamount":"989,757",
        "requestdatetime":"2024-10-25 12:49:09",
        "handlerproccesor":"test222",
        "processingdatetime":"2024-10-25 12:49:09",
        "status":"처리",
        "memonotes":"메모",
        "bonustype":"",
        "bonusrecharge":"0",
        "functionfeatures":"",
        "credit":"0",
        "member":"test100 (test100)",
        "casinobettingamount":"0",
        "casinowinningamount":"0",
        "casinocommission":"0",
        "casinobetswins":"0/0",
        "casinosettlement":"0",
        "slotbettingamount":"0",
        "slotwinningamount":"0",
        "slotcommission":"0",
        "slotbetswins":"0/0",
        "slotsettlement":"0",
        "totalbetswins":"0/0",
        "totalsettlement":"0",
        "details":"",
        "calculator":"",
        "headheadquarters":"119test <br> (119test)",
        "mainheadquarters":"",
        "subheadquarters":"",
        "distributor":"",
        "store":"",
        "user":"",
        "7level":"",
        "casinopersonal":`
        <ul class="p-0">
            <li class="d-flex justify-content-between"><span>배팅</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>당첨</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>합계</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>수수료</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>총정산</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>루징</span><b>0</b></li>
        </ul>`,
        "casinosubordinate":`
        <ul class="p-0">
            <li class="d-flex justify-content-between"><span>배팅</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>당첨</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>합계</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>수수료</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>총정산</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>루징</span><b>0</b></li>
        </ul>`,
        "slotpersonal":`
        <ul class="p-0">
            <li class="d-flex justify-content-between"><span>배팅</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>당첨</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>합계</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>수수료</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>총정산</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>루징</span><b>0</b></li>
        </ul>`,
        "slotsubordinate":`
        <ul class="p-0">
            <li class="d-flex justify-content-between"><span>배팅</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>당첨</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>합계</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>수수료</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>총정산</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>루징</span><b>0</b></li>
        </ul>`,
        "total":`
        <ul class="p-0">
            <li class="d-flex justify-content-between"><span>배팅</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>당첨</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>합계</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>수수료</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>총정산</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>루징</span><b>0</b></li>
        </ul>`,
        "bettinghistory":"",
        "ctr":"",
        "balanceheldamount":"9,707,055",
        "donutpoints":"0",
        "commission":"73,184",
        "totalrecharge":"10,200,000",
        "totalwithdrawal":"0",
        "profit":"419,761",
        "membermanagement":"",
        "detailedhistory":"",
        "pbg":`
        <ul class="p-0">
            <li class="d-flex justify-content-between"><span>배팅</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>당첨</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>합계</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>수수료</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>총정산</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>루징</span><b>0</b></li>
        </ul>`,
        "totalcommission":`
        <ul class="p-0">
            <li class="d-flex justify-content-between"><span>배팅</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>당첨</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>합계</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>수수료</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>총정산</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>루징</span><b>0</b></li>
        </ul>`,
        "personalsettlement": `
        <ul class="p-0">
            <li class="d-flex justify-content-between"><span>배팅</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>당첨</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>합계</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>수수료</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>총정산</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>루징</span><b>0</b></li>
        </ul>`,
        "ctsettlement":`
        <ul class="p-0">
            <li class="d-flex justify-content-between"><span>배팅</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>당첨</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>합계</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>수수료</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>총정산</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>루징</span><b>0</b></li>
        </ul>`,
        "moneytransfer":`
         <ul class="p-0">
            <li class="d-flex justify-content-between"><span>입금 (차감)</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>출금 (지급)</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>정산</span><b>0</b></li>
        </ul>
        `,
        "admindepositswithdrawals":`
         <ul class="p-0">
            <li class="d-flex justify-content-between"><span>입금</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>출금</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>정산</span><b>0</b></li>
        </ul>
        `,
        "personaldepositswithdrawals":`
        <ul class="p-0">
            <li class="d-flex justify-content-between"><span>입금</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>출금</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>정산</span><b>0</b></li>
        </ul>
        `,
        "subordinatedepositswithdrawals":`
         <ul class="p-0">
            <li class="d-flex justify-content-between"><span>입금</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>출금</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>정산</span><b>0</b></li>
        </ul>
        `,
        "totaldepositswithdrawals":`
         <ul class="p-0">
            <li class="d-flex justify-content-between"><span>입금</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>출금</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>정산</span><b>0</b></li>
        </ul>`
        ,
        "message":"",
        "loginaccess":"미접속",
        "loginfailure":"",
        "registrationdate":"2024-07-23",
        "lastlogin":"20224-10-12",
        "edit":"",
        "delete":"",
        "type":"배팅",
        "game":"Wisdom of Athena 1000™",
        "session":"80930557290034",
        "prevbalance":"671,155",
        "balance":"-1,000",
        "postbalance":"670,155",
        "accumulationtime":"2024-10-28 07:15:49",
        "refundrequestcategory":"회원 환전",
        "refundrequestamount":"50,000"
    },
    {
        "toplevel":"test2",
        "directorsuperior":"test2",
        "member":"test222 (test222)",
        "requestcategory":"회원 포인트 전환",
        "accountholder":"예금주",
        "requestamount":"1,550",
        "resultamount":"989,757",
        "requestdatetime":"2024-10-25 12:49:09",
        "handlerproccesor":"test222",
        "processingdatetime":"2024-10-25 12:49:09",
        "status":"처리",
        "memonotes":"메모",
        "bonustype":"",
        "bonusrecharge":"0",
        "functionfeatures":"",
        "credit":"0",
        "member":"test100 (test100)",
        "casinobettingamount":"0",
        "casinowinningamount":"0",
        "casinocommission":"0",
        "casinobetswins":"0/0",
        "casinosettlement":"0",
        "slotbettingamount":"0",
        "slotwinningamount":"0",
        "slotcommission":"0",
        "slotbetswins":"0/0",
        "slotsettlement":"0",
        "totalbetswins":"0/0",
        "totalsettlement":"0",
        "details":"",
        "calculator":"",
        "headheadquarters":"119test <br> (119test)",
        "mainheadquarters":"",
        "subheadquarters":"",
        "distributor":"",
        "store":"",
        "user":"",
        "7level":"",
        "casinopersonal":`
        <ul class="p-0">
            <li class="d-flex justify-content-between"><span>배팅</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>당첨</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>합계</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>수수료</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>총정산</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>루징</span><b>0</b></li>
        </ul>`,
        "casinosubordinate":`
        <ul class="p-0">
            <li class="d-flex justify-content-between"><span>배팅</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>당첨</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>합계</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>수수료</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>총정산</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>루징</span><b>0</b></li>
        </ul>`,
        "slotpersonal":`
        <ul class="p-0">
            <li class="d-flex justify-content-between"><span>배팅</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>당첨</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>합계</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>수수료</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>총정산</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>루징</span><b>0</b></li>
        </ul>`,
        "slotsubordinate":`
        <ul class="p-0">
            <li class="d-flex justify-content-between"><span>배팅</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>당첨</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>합계</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>수수료</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>총정산</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>루징</span><b>0</b></li>
        </ul>`,
        "total":`
        <ul class="p-0">
            <li class="d-flex justify-content-between"><span>배팅</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>당첨</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>합계</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>수수료</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>총정산</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>루징</span><b>0</b></li>
        </ul>`,
        "bettinghistory":"",
        "ctr":"",
        "balanceheldamount":"9,707,055",
        "donutpoints":"0",
        "commission":"73,184",
        "totalrecharge":"10,200,000",
        "totalwithdrawal":"0",
        "profit":"419,761",
        "membermanagement":"",
        "detailedhistory":"",
        "pbg":`
        <ul class="p-0">
            <li class="d-flex justify-content-between"><span>배팅</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>당첨</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>합계</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>수수료</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>총정산</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>루징</span><b>0</b></li>
        </ul>`,
        "totalcommission":`
        <ul class="p-0">
            <li class="d-flex justify-content-between"><span>배팅</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>당첨</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>합계</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>수수료</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>총정산</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>루징</span><b>0</b></li>
        </ul>`,
        "personalsettlement": `
        <ul class="p-0">
            <li class="d-flex justify-content-between"><span>배팅</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>당첨</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>합계</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>수수료</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>총정산</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>루징</span><b>0</b></li>
        </ul>`,
        "ctsettlement":`
        <ul class="p-0">
            <li class="d-flex justify-content-between"><span>배팅</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>당첨</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>합계</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>수수료</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>총정산</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>루징</span><b>0</b></li>
        </ul>`,
        "moneytransfer":`
         <ul class="p-0">
            <li class="d-flex justify-content-between"><span>입금 (차감)</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>출금 (지급)</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>정산</span><b>0</b></li>
        </ul>
        `,
        "admindepositswithdrawals":`
         <ul class="p-0">
            <li class="d-flex justify-content-between"><span>입금</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>출금</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>정산</span><b>0</b></li>
        </ul>
        `,
        "personaldepositswithdrawals":`
        <ul class="p-0">
            <li class="d-flex justify-content-between"><span>입금</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>출금</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>정산</span><b>0</b></li>
        </ul>
        `,
        "subordinatedepositswithdrawals":`
         <ul class="p-0">
            <li class="d-flex justify-content-between"><span>입금</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>출금</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>정산</span><b>0</b></li>
        </ul>
        `,
        "totaldepositswithdrawals":`
         <ul class="p-0">
            <li class="d-flex justify-content-between"><span>입금</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>출금</span><b>0</b></li>
            <li class="d-flex justify-content-between"><span>정산</span><b>0</b></li>
        </ul>`
        ,
        "message":"",
        "loginaccess":"접속",
        "loginfailure":"",
        "registrationdate":"2024-07-23",
        "lastlogin":"20224-10-12",
        "edit":"",
        "delete":"",
        "type":"배팅",
        "game":"Wisdom of Athena 1000™",
        "session":"80930557290034",
        "prevbalance":"671,155",
        "balance":"-1,000",
        "postbalance":"670,155",
        "accumulationtime":"2024-10-28 07:15:49",
        "refundrequestcategory":"회원 환전",
        "refundrequestamount":"50,000"
    }
    // More entries
];
export default data;