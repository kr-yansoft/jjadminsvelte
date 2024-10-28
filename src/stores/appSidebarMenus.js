import { writable } from 'svelte/store';

const menus = [{
	text: 'Navigation',
	is_header: true
},
{ 
	url: '/home/Dashboard', icon: 'fa fa-gauge', title: '대시보드'
},
{ url: '/ChargeManagement', icon: 'fa fa-arrow-down', title: '충전 관리 '},
{ url: '/RefundManagement', icon: 'fa fa-arrow-up', title: '횐전관리 '},
{ url: '/Inguiry', icon: 'fa fa-phone', title: '1:1 문의 '},
{ url: '/Settlement', icon: 'fa fa-calculator', title: '정산 ',
	children: [
		{ url: '/Settlement/DailySettlement', title: '일 정산'},
		{ url: '/Settlement/PeriodSettlement', title: '기간 정산' },
		{ url: '/Settlement/CasinoSlotMemberSettlement', title: '카지노/슬롯 회원 정산' },
		{ url: '/Settlement/CasinoSlotPartnerSettlement', title: '카지노/슬롯 파트너 정산' },
		{ url: '/Settlement/DepositWithdrawPartnerSettlement', title: '입출금 파트너 정산' },
		{ url: '/Settlement/MoneyTransferPartnerSettlement', title: '머니이동 파트너 정산' },
		{ url: '/Settlement/PowerballMemberSettlement', title: '파워볼 회원 정산' },
		{ url: '/Settlement/PowerballPartnerSettlement', title: '파워볼 파트너 정산' },
	]
},
{ url: '/MemberManagement', icon: 'fa fa-user', title: '회원 관리 ',
	children: [
		{ url: '/MemberManagement/MemberList', title: '회원목록'},
		{ url: '/MemberManagement/CreateMemeber', title: '회원 생선' },
		{ url: '/MemberManagement/MemberBalanceHistory', title: '회원 잔고내역' },
		{ url: '/MemberManagement/MemberCommissionHistory', title: '회원 수수료내역' },
	]
},
{ url: '/PartnerManagement', icon: 'fa fa-handshake', title: '파트너 관리 ',
	children: [
		{ url: '/PartnerManagement/PartnerList', title: '파트너 목록',},
		{ url: '/PartnerManagement/CreatePartner', title: '파트너 생선' },
		{ url: '/PartnerManagement/CasinoSlotCommisionRate', title: '카지노/슬롯 수수료율' },
		{ url: '/PartnerManagement/PowerballCommissionRate', title: '파워볼 수수료율' },
		{ url: '/PartnerManagement/PowerballPayoutSettings', title: '파워볼 배당설정' },
	]
},
{ url: '/BettingManagement', icon: 'fa fa-file', title: '배팅 관리 ',
	children: [
		{ url: '/BettingManagement/Casino', title: '카지노',},
		{ url: '/BettingManagement/Slot', title: '슬롯' },
		{ url: '/BettingManagement/CasinoSlot', title: '카지노/슬롯' },
		{ url: '/BettingManagement/Powerball', title: '파워볼' }
	]
},
{ url: '/AccessManagement', icon: 'fa fa-clock', title: '접속 관리',
	children: [
		{ url: '/AccessManagement/AccessedManagement', title: '접속 회원',},
		{ url: '/AccessManagement/AccessMemberLog', title: '접속 회원 로그' },
		{ url: '/AccessManagement/IPRestrictions', title: '접속 아이피 제한' },
		{ url: '/AccessManagement/AccessAdmin', title: '접속 관리자' },
		{ url: '/AccessManagement/AdminAccessLog', title: '접속 관리자 로그' }
	]
},
{ url: '/PublicBetting', icon: 'fa fa-sliders', title: '공배팅',
	children: [
		{ url: '/PublicBetting/SlotSettings', title: '슬록 설정',},
		{ url: '/PublicBetting/CasinoSettings', title: '카지노 설정' },
		{ url: '/PublicBetting/PublicBettingHistory', title: '공배팅 내역' }
	]
},
{ url: '/Message', icon: 'fa fa-message', title: '쪽지'},
{ url: '/Settings', icon: 'fa fa-gear', title: '설정',
	children: [
		{ url: '/Settings/Site', title: '사이트',},
		{ url: '/Settings/Banner', title: '배너' },
		{ url: '/Settings/GameProvider', title: '게임사 ON/OFF' },
		{ url: '/Settings/AdminAccount', title: '관리자 계정' },
		{ url: '/Settings/NotificationSettings', title: '알림 설정' },
		{ url: '/Settings/CasinoInsuranceSettings', title: '카지노 보험설정' },
		{ url: '/Settings/CasinoSlotInsuranceHistory', title: '카지노/슬롯 보험내역' },
		{ url: '/Settings/Powerball', title: '파워볼' },
		{ url: '/Settings/PowerballPayout', title: '파워볼 배당' },
		{ url: '/Settings/PowerballBettingLimit', title: '파워볼 배팅한도' },
		{ url: '/Settings/InsuranceSettings', title: '보험설정 보험설정' },
		{ url: '/Settings/PowerballInsuranceHistory', title: '파워볼 보험내역' }
	]
},
{ url: '/Logout', icon: 'fa fa-align-left', title: '로그아웃'},
];



// Create a writable store with the initial options
export const appSidebarMenus = writable(menus);