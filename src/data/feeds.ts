export type Category = "police" | "fire" | "ems" | "mixed" | "aviation" | "weather";

export interface Feed {
  id: string;
  name: string;
  state: string;       // 2-letter code
  stateName: string;
  city: string;
  category: Category;
  description: string;
  listeners?: number;
  broadcastifyId: string;
  streamUrl: string;   // proxied via our Cloudflare Worker
}

const PROXY = "https://scanner-stream-proxy.b89243512.workers.dev/stream";
const bc = (id: string) => `${PROXY}/${id}`;

/**
 * Live public feeds with verified direct-stream access.
 * All audio is proxied through our Cloudflare Worker so it plays natively
 * in the site's HTML5 audio player — no iframes, no popups.
 */
export const feeds: Feed[] = [
  // Virginia
  { id: "va-fairfax", name: "Fairfax County Public Safety", state: "VA", stateName: "Virginia", city: "Fairfax", category: "mixed", description: "Fairfax County Police, Fire, and EMS dispatch", listeners: 1350, broadcastifyId: "28326", streamUrl: bc("28326") },

  // Illinois
  { id: "il-chicago-pd", name: "Chicago Police Zone 1-4", state: "IL", stateName: "Illinois", city: "Chicago", category: "police", description: "Chicago Police Department citywide dispatch", listeners: 2400, broadcastifyId: "32253", streamUrl: bc("32253") },

  // Pennsylvania
  { id: "pa-pittsburgh", name: "Pittsburgh Police & Fire", state: "PA", stateName: "Pennsylvania", city: "Pittsburgh", category: "mixed", description: "Pittsburgh area police, fire, and EMS", listeners: 580, broadcastifyId: "17057", streamUrl: bc("17057") },

  // Colorado
  { id: "co-denver", name: "Denver Police Dispatch", state: "CO", stateName: "Colorado", city: "Denver", category: "police", description: "Denver Police Department dispatch", listeners: 710, broadcastifyId: "22562", streamUrl: bc("22562") },

  // Texas
  { id: "tx-san-antonio", name: "San Antonio Police", state: "TX", stateName: "Texas", city: "San Antonio", category: "police", description: "San Antonio Police Department dispatch", listeners: 650, broadcastifyId: "3691", streamUrl: bc("3691") },

  // Missouri
  { id: "mo-kc", name: "Kansas City Missouri Police", state: "MO", stateName: "Missouri", city: "Kansas City", category: "police", description: "Kansas City Missouri Police dispatch", listeners: 390, broadcastifyId: "25324", streamUrl: bc("25324") },

  // Arizona
  { id: "az-tucson", name: "Tucson Police Dispatch", state: "AZ", stateName: "Arizona", city: "Tucson", category: "police", description: "Tucson Police Department dispatch", listeners: 460, broadcastifyId: "22835", streamUrl: bc("22835") },

  // New York
  { id: "ny-jefferson", name: "Jefferson County Public Safety", state: "NY", stateName: "New York", city: "Watertown", category: "mixed", description: "Jefferson County NY Police, Fire, and EMS", listeners: 210, broadcastifyId: "6007", streamUrl: bc("6007") },

  // Connecticut
  { id: "ct-new-haven", name: "New Haven Police Department", state: "CT", stateName: "Connecticut", city: "New Haven", category: "police", description: "Greater New Haven Police Department dispatch", listeners: 190, broadcastifyId: "8705", streamUrl: bc("8705") },

  // Washington
  { id: "wa-chelan", name: "Chelan / Douglas County Dispatch", state: "WA", stateName: "Washington", city: "Wenatchee", category: "mixed", description: "Rivercom Chelan/Douglas County Dispatch", listeners: 180, broadcastifyId: "24557", streamUrl: bc("24557") },

  // Indiana
  { id: "in-madison", name: "Madison County Public Safety", state: "IN", stateName: "Indiana", city: "Anderson", category: "mixed", description: "Madison County Sheriff, Fire, EMS, and Anderson Police", listeners: 220, broadcastifyId: "24550", streamUrl: bc("24550") },

  // Oregon
  { id: "or-tillamook", name: "Tillamook County Safety", state: "OR", stateName: "Oregon", city: "Tillamook", category: "mixed", description: "Tillamook County Police and EMS", listeners: 150, broadcastifyId: "16984", streamUrl: bc("16984") },

  // California
  { id: "ca-sf-scanner", name: "San Francisco Police Scanner", state: "CA", stateName: "California", city: "San Francisco", category: "police", description: "SomaFM's San Francisco police scanner mix", listeners: 820, broadcastifyId: "sf-police", streamUrl: `${PROXY}/sf-police` },
  { id: "ca-sf-1033", name: "SF 10-33 Emergency Radio", state: "CA", stateName: "California", city: "San Francisco", category: "mixed", description: "SomaFM's curated Bay Area emergency radio mix", listeners: 540, broadcastifyId: "sf-1033", streamUrl: `${PROXY}/sf-1033` },

  // Texas (RadioReference public)
  { id: "tx-travis", name: "Travis County Police", state: "TX", stateName: "Texas", city: "Austin", category: "police", description: "Travis County law enforcement dispatch", listeners: 310, broadcastifyId: "travis-tx", streamUrl: `${PROXY}/travis-tx` },
];

// Broadcastify feed page for "Details" link (for Broadcastify-sourced feeds)
export function getBroadcastifyUrl(feed: Feed): string {
  return `https://www.broadcastify.com/listen/feed/${feed.broadcastifyId}`;
}

export function getStreamUrl(feed: Feed): string {
  return feed.streamUrl;
}

export function getFeedsByState(stateCode: string): Feed[] {
  return feeds.filter((f) => f.state === stateCode);
}

export function getStatesWithFeeds(): Set<string> {
  return new Set(feeds.map((f) => f.state));
}

export function getTopFeeds(limit: number = 12): Feed[] {
  return [...feeds].sort((a, b) => (b.listeners || 0) - (a.listeners || 0)).slice(0, limit);
}
