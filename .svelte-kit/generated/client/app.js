export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23'),
	() => import('./nodes/24'),
	() => import('./nodes/25'),
	() => import('./nodes/26'),
	() => import('./nodes/27'),
	() => import('./nodes/28'),
	() => import('./nodes/29'),
	() => import('./nodes/30'),
	() => import('./nodes/31'),
	() => import('./nodes/32'),
	() => import('./nodes/33'),
	() => import('./nodes/34'),
	() => import('./nodes/35'),
	() => import('./nodes/36'),
	() => import('./nodes/37'),
	() => import('./nodes/38'),
	() => import('./nodes/39'),
	() => import('./nodes/40'),
	() => import('./nodes/41'),
	() => import('./nodes/42'),
	() => import('./nodes/43'),
	() => import('./nodes/44'),
	() => import('./nodes/45'),
	() => import('./nodes/46'),
	() => import('./nodes/47'),
	() => import('./nodes/48')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/AccessManagement/AccessAdmin": [3],
		"/AccessManagement/AccessMemberLog": [5],
		"/AccessManagement/AccessedMembers": [4],
		"/AccessManagement/AdminAccessLog": [6],
		"/AccessManagement/IPRestrictions": [7],
		"/Auth/Login": [8],
		"/BettingManagement/CasinoSlot": [10],
		"/BettingManagement/Casino": [9],
		"/BettingManagement/Powerball": [11],
		"/BettingManagement/Slot": [12],
		"/ChargeManagement": [13],
		"/Inguiry": [15],
		"/MemberManagement/CreateMemeber": [16],
		"/MemberManagement/MemberBalanceHistory": [17],
		"/MemberManagement/MemberCommisionHistory": [18],
		"/MemberManagement/MemberList": [19],
		"/Messages": [20],
		"/PartnerManagement/CasinoSlotCommisionRate": [21],
		"/PartnerManagement/CreatePartner": [22],
		"/PartnerManagement/PartnerList": [23],
		"/PartnerManagement/PowerballCommisionRate": [24],
		"/PartnerManagement/PowerballPayoutSettings": [25],
		"/PublicBetting/CasinoSettings": [26],
		"/PublicBetting/PublicBettingHistory": [27],
		"/PublicBetting/SlotSettings": [28],
		"/RefundManagement": [29],
		"/Settings/AdminAccount": [30],
		"/Settings/Banner": [31],
		"/Settings/CasinoInsurance": [32],
		"/Settings/CasinoSlotInsuranceHistory": [33],
		"/Settings/GameProvider": [34],
		"/Settings/InsuranceSettings": [35],
		"/Settings/NotificationSettings": [36],
		"/Settings/PowerballBettingLimit": [38],
		"/Settings/PowerballInsuranceHistory": [39],
		"/Settings/PowerballPayout": [40],
		"/Settings/Powerball": [37],
		"/Settlement/CasinoSlotMemberSettlement": [41],
		"/Settlement/CasinoSlotPartnerSettlement": [42],
		"/Settlement/DailySettlement": [43],
		"/Settlement/DepositWithdrawPartnerSettlement": [44],
		"/Settlement/MoneyTransferPartnerSettlement": [45],
		"/Settlement/PeriodSettlement": [46],
		"/Settlement/PowerballMemberSettlement": [47],
		"/Settlement/PowerballPartnerSettlement": [48],
		"/home/Dashboard": [14]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.svelte';