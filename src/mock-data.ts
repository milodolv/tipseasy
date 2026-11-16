export type Donation = {
  id: string;
  pseudo: string;
  amountCents: number;
  message: string;
  dateIso: string;
};

export type StreamerAlert = {
  id: string;
  imageLabel: string;
  soundLabel: string;
  priceCents: number;
  active: boolean;
};

export type Payout = {
  id: string;
  amountCents: number;
  dateIso: string;
  status: "paid" | "pending";
};

export const PERIOD_OPTIONS = [
  { value: "7d", label: "7 jours" },
  { value: "30d", label: "30 jours" },
  { value: "12m", label: "12 mois" },
  { value: "all", label: "Tout" },
] as const;

export type PeriodKey = (typeof PERIOD_OPTIONS)[number]["value"];

export const mockStreamer = {
  pseudo: "pseudo",
  displayName: "pseudo",
  avatarInitials: "PS",
  isOnline: true,
  email: "streamer@example.com",
  twitchChannel: "pseudo",
} as const;

export const mockDonationLink = "tipseasy.com/pseudo";
export const mockDonationPageUrl = `https://${mockDonationLink}`;

export const mockOverlayToken = "tk_demo_8f2a91";
export const mockOverlayUrl = `https://tipseasy.com/overlay/${mockStreamer.pseudo}?token=${mockOverlayToken}`;

export const mockWidgetDonorsUrl = `https://tipseasy.com/widget/${mockStreamer.pseudo}/donors`;
export const mockWidgetGoalUrl = `https://tipseasy.com/widget/${mockStreamer.pseudo}/goal`;

const recentBase: Donation[] = [
  {
    id: "d1",
    pseudo: "Viewer_42",
    amountCents: 1_000,
    message: "GG le stream",
    dateIso: "2026-11-16T18:42:00.000Z",
  },
  {
    id: "d2",
    pseudo: "LunaStream",
    amountCents: 500,
    message: "",
    dateIso: "2026-11-16T17:10:00.000Z",
  },
  {
    id: "d3",
    pseudo: "pixel_knight",
    amountCents: 300,
    message: "Merci pour la bonne humeur",
    dateIso: "2026-11-16T14:22:00.000Z",
  },
  {
    id: "d4",
    pseudo: "Maël_TV",
    amountCents: 2_000,
    message: "Pour le setup",
    dateIso: "2026-11-15T21:05:00.000Z",
  },
  {
    id: "d5",
    pseudo: "chat_lover",
    amountCents: 500,
    message: "Alerte testée, ça marche",
    dateIso: "2026-11-15T19:33:00.000Z",
  },
];

export type DashboardPeriodData = {
  revenueCents: number;
  previousRevenueCents: number;
  series: { label: string; cents: number }[];
  donationsCount: number;
  averageDonationCents: number;
  maxDonationCents: number;
  newDonors: number;
  topDonors: { pseudo: string; totalCents: number }[];
  recentDonations: Donation[];
  goalCurrentCents: number;
  goalTargetCents: number;
};

export const mockDashboardByPeriod: Record<PeriodKey, DashboardPeriodData> = {
  "7d": {
    revenueCents: 6_850,
    previousRevenueCents: 5_200,
    series: [
      { label: "Lun", cents: 420 },
      { label: "Mar", cents: 890 },
      { label: "Mer", cents: 720 },
      { label: "Jeu", cents: 1_100 },
      { label: "Ven", cents: 980 },
      { label: "Sam", cents: 1_450 },
      { label: "Dim", cents: 1_290 },
    ],
    donationsCount: 14,
    averageDonationCents: 489,
    maxDonationCents: 2_000,
    newDonors: 6,
    topDonors: [
      { pseudo: "Maël_TV", totalCents: 2_000 },
      { pseudo: "Viewer_42", totalCents: 1_200 },
      { pseudo: "LunaStream", totalCents: 950 },
      { pseudo: "pixel_knight", totalCents: 600 },
    ],
    recentDonations: recentBase,
    goalCurrentCents: 6_850,
    goalTargetCents: 10_000,
  },
  "30d": {
    revenueCents: 24_750,
    previousRevenueCents: 21_400,
    series: [
      { label: "S1", cents: 4_200 },
      { label: "S2", cents: 5_800 },
      { label: "S3", cents: 6_100 },
      { label: "S4", cents: 8_650 },
    ],
    donationsCount: 42,
    averageDonationCents: 589,
    maxDonationCents: 2_000,
    newDonors: 18,
    topDonors: [
      { pseudo: "Maël_TV", totalCents: 4_500 },
      { pseudo: "Viewer_42", totalCents: 3_200 },
      { pseudo: "LunaStream", totalCents: 2_750 },
      { pseudo: "OBS_fan", totalCents: 1_500 },
    ],
    recentDonations: recentBase,
    goalCurrentCents: 24_750,
    goalTargetCents: 30_000,
  },
  "12m": {
    revenueCents: 248_600,
    previousRevenueCents: 198_200,
    series: [
      { label: "J", cents: 12_400 },
      { label: "F", cents: 18_200 },
      { label: "M", cents: 22_100 },
      { label: "A", cents: 19_800 },
      { label: "M", cents: 24_500 },
      { label: "J", cents: 28_200 },
      { label: "J", cents: 25_900 },
      { label: "A", cents: 21_400 },
      { label: "S", cents: 26_800 },
      { label: "O", cents: 29_100 },
      { label: "N", cents: 20_500 },
      { label: "D", cents: 0 },
    ],
    donationsCount: 392,
    averageDonationCents: 634,
    maxDonationCents: 5_000,
    newDonors: 142,
    topDonors: [
      { pseudo: "Maël_TV", totalCents: 18_400 },
      { pseudo: "Viewer_42", totalCents: 12_600 },
      { pseudo: "LunaStream", totalCents: 9_800 },
    ],
    recentDonations: recentBase,
    goalCurrentCents: 248_600,
    goalTargetCents: 300_000,
  },
  all: {
    revenueCents: 412_300,
    previousRevenueCents: 0,
    series: [
      { label: "2024", cents: 142_000 },
      { label: "2025", cents: 270_300 },
    ],
    donationsCount: 628,
    averageDonationCents: 657,
    maxDonationCents: 5_000,
    newDonors: 241,
    topDonors: [
      { pseudo: "Maël_TV", totalCents: 28_400 },
      { pseudo: "Viewer_42", totalCents: 21_200 },
      { pseudo: "LunaStream", totalCents: 16_750 },
    ],
    recentDonations: recentBase,
    goalCurrentCents: 412_300,
    goalTargetCents: 500_000,
  },
};

export type ConversionPeriodData = {
  funnel: {
    visitors: number;
    startedPayment: number;
    paid: number;
  };
  conversionRate: number;
  timeSeries: { label: string; visits: number; payments: number }[];
  trafficSources: {
    source: string;
    visits: number;
    payments: number;
    rate: number;
  }[];
  paymentMethods: { method: string; percent: number }[];
};

export const mockConversionByPeriod: Record<PeriodKey, ConversionPeriodData> = {
  "7d": {
    funnel: { visitors: 840, startedPayment: 210, paid: 98 },
    conversionRate: 11.7,
    timeSeries: [
      { label: "Lun", visits: 98, payments: 12 },
      { label: "Mar", visits: 124, payments: 15 },
      { label: "Mer", visits: 110, payments: 11 },
      { label: "Jeu", visits: 142, payments: 18 },
      { label: "Ven", visits: 128, payments: 14 },
      { label: "Sam", visits: 156, payments: 16 },
      { label: "Dim", visits: 82, payments: 12 },
    ],
    trafficSources: [
      { source: "Twitch", visits: 520, payments: 62, rate: 11.9 },
      { source: "TikTok", visits: 88, payments: 4, rate: 4.5 },
      { source: "Lien direct", visits: 142, payments: 22, rate: 15.5 },
      { source: "Autre", visits: 90, payments: 10, rate: 11.1 },
    ],
    paymentMethods: [
      { method: "Apple Pay", percent: 48 },
      { method: "Google Pay", percent: 32 },
      { method: "Carte", percent: 20 },
    ],
  },
  "30d": {
    funnel: { visitors: 3_420, startedPayment: 890, paid: 412 },
    conversionRate: 12.0,
    timeSeries: [
      { label: "S1", visits: 780, payments: 88 },
      { label: "S2", visits: 840, payments: 102 },
      { label: "S3", visits: 910, payments: 108 },
      { label: "S4", visits: 890, payments: 114 },
    ],
    trafficSources: [
      { source: "Twitch", visits: 2_180, payments: 268, rate: 12.3 },
      { source: "TikTok", visits: 320, payments: 18, rate: 5.6 },
      { source: "Lien direct", visits: 540, payments: 82, rate: 15.2 },
      { source: "Autre", visits: 380, payments: 44, rate: 11.6 },
    ],
    paymentMethods: [
      { method: "Apple Pay", percent: 46 },
      { method: "Google Pay", percent: 34 },
      { method: "Carte", percent: 20 },
    ],
  },
  "12m": {
    funnel: { visitors: 38_400, startedPayment: 9_200, paid: 4_120 },
    conversionRate: 10.7,
    timeSeries: [
      { label: "J", visits: 2_400, payments: 240 },
      { label: "M", visits: 3_100, payments: 340 },
      { label: "M", visits: 3_400, payments: 380 },
      { label: "J", visits: 3_800, payments: 420 },
      { label: "S", visits: 4_100, payments: 450 },
      { label: "D", visits: 2_200, payments: 280 },
    ],
    trafficSources: [
      { source: "Twitch", visits: 24_800, payments: 2_680, rate: 10.8 },
      { source: "TikTok", visits: 2_400, payments: 92, rate: 3.8 },
      { source: "Lien direct", visits: 6_200, payments: 820, rate: 13.2 },
      { source: "Autre", visits: 5_000, payments: 528, rate: 10.6 },
    ],
    paymentMethods: [
      { method: "Apple Pay", percent: 44 },
      { method: "Google Pay", percent: 36 },
      { method: "Carte", percent: 20 },
    ],
  },
  all: {
    funnel: { visitors: 62_100, startedPayment: 14_800, paid: 6_280 },
    conversionRate: 10.1,
    timeSeries: [
      { label: "2023", visits: 12_000, payments: 1_020 },
      { label: "2024", visits: 22_400, payments: 2_240 },
      { label: "2025", visits: 27_700, payments: 3_020 },
    ],
    trafficSources: [
      { source: "Twitch", visits: 40_200, payments: 4_120, rate: 10.2 },
      { source: "TikTok", visits: 3_800, payments: 142, rate: 3.7 },
      { source: "Lien direct", visits: 10_400, payments: 1_280, rate: 12.3 },
      { source: "Autre", visits: 7_700, payments: 738, rate: 9.6 },
    ],
    paymentMethods: [
      { method: "Apple Pay", percent: 45 },
      { method: "Google Pay", percent: 35 },
      { method: "Carte", percent: 20 },
    ],
  },
};

export const mockAlerts: StreamerAlert[] = [
  {
    id: "a1",
    imageLabel: "Halo bleu",
    soundLabel: "Cloche douce",
    priceCents: 500,
    active: true,
  },
  {
    id: "a2",
    imageLabel: "Pulse néon",
    soundLabel: "Ping court",
    priceCents: 1_000,
    active: true,
  },
  {
    id: "a3",
    imageLabel: "Minimal",
    soundLabel: "Pop léger",
    priceCents: 300,
    active: false,
  },
];

export const mockSuggestedAmountsCents = [300, 500, 1_000] as const;
export const mockMinimumDonationCents = 300;
export const mockThankYouMessage =
  "Merci pour ton soutien — ça compte beaucoup !";
export const mockDonationGoalCents = 30_000;
export const mockDonationGoalCurrentCents = 24_750;

export const mockPayouts: Payout[] = [
  {
    id: "p1",
    amountCents: 18_420,
    dateIso: "2026-11-01T10:00:00.000Z",
    status: "paid",
  },
  {
    id: "p2",
    amountCents: 12_300,
    dateIso: "2026-10-01T10:00:00.000Z",
    status: "paid",
  },
  {
    id: "p3",
    amountCents: 6_030,
    dateIso: "2026-11-12T10:00:00.000Z",
    status: "pending",
  },
];

export const mockAvailableBalanceCents = 6_030;
export const mockFeesSummary =
  "Tipseasy prélève un pourcentage sur chaque don ; Stripe facture ses frais de traitement en plus.";

export const mockBotDefaults = {
  active: true,
  connected: true,
  commandName: "!don",
  commandReply: "Soutiens le stream en un tap : {lien}",
  spamDelaySeconds: 30,
  autoMessageEnabled: true,
  autoMessageText: "Page de don dans la description — merci pour ton soutien.",
  autoMessageIntervalMinutes: 45,
  thankYouEnabled: true,
  thankYouTemplate: "Merci {pseudo} pour {montant} !",
} as const;

/** @deprecated utilise mockDashboardByPeriod */
export const mockMonthStats = {
  totalReceivedCents: 24_750,
  donationCount: 42,
  averageDonationCents: 589,
} as const;

/** @deprecated utilise mockDashboardByPeriod */
export const mockRecentDonations = recentBase;