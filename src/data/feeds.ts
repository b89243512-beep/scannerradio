export type Category = "police" | "fire" | "ems" | "mixed" | "aviation" | "weather";

export interface Feed {
  id: string;
  name: string;
  state: string;       // 2-letter code
  stateName: string;
  city: string;
  category: Category;
  description: string;
  listeners?: number;   // approximate, for display
  broadcastifyId: string;
  streamUrl?: string;   // optional direct stream URL
}

/**
 * Curated list of popular public scanner feeds across the US.
 * Listening is routed to Broadcastify's public listen pages (legal public broadcast).
 */
export const feeds: Feed[] = [
  // California
  { id: "ca-la-pd", name: "LAPD Citywide", state: "CA", stateName: "California", city: "Los Angeles", category: "police", description: "Los Angeles Police Department citywide dispatch", listeners: 3800, broadcastifyId: "25793" },
  { id: "ca-la-fire", name: "LA County Fire", state: "CA", stateName: "California", city: "Los Angeles", category: "fire", description: "Los Angeles County Fire Department dispatch", listeners: 1200, broadcastifyId: "11390" },
  { id: "ca-sf-pd", name: "San Francisco Police", state: "CA", stateName: "California", city: "San Francisco", category: "police", description: "San Francisco Police Department", listeners: 950, broadcastifyId: "7311" },
  { id: "ca-san-diego", name: "San Diego Police", state: "CA", stateName: "California", city: "San Diego", category: "police", description: "San Diego Police Department", listeners: 720, broadcastifyId: "7063" },
  { id: "ca-sac", name: "Sacramento Police & Fire", state: "CA", stateName: "California", city: "Sacramento", category: "mixed", description: "Sacramento County law enforcement and fire", listeners: 540, broadcastifyId: "22090" },

  // New York
  { id: "ny-nypd", name: "NYPD Citywide", state: "NY", stateName: "New York", city: "New York City", category: "police", description: "New York Police Department citywide", listeners: 5200, broadcastifyId: "3740" },
  { id: "ny-fdny", name: "FDNY Manhattan", state: "NY", stateName: "New York", city: "New York City", category: "fire", description: "New York Fire Department Manhattan dispatch", listeners: 1600, broadcastifyId: "25318" },
  { id: "ny-brooklyn", name: "NYPD Brooklyn", state: "NY", stateName: "New York", city: "Brooklyn", category: "police", description: "NYPD Brooklyn precincts", listeners: 1100, broadcastifyId: "21988" },

  // Texas
  { id: "tx-houston", name: "Houston Police", state: "TX", stateName: "Texas", city: "Houston", category: "police", description: "Houston Police Department dispatch", listeners: 1400, broadcastifyId: "5841" },
  { id: "tx-dallas", name: "Dallas Police & Fire", state: "TX", stateName: "Texas", city: "Dallas", category: "mixed", description: "Dallas PD and Fire dispatch", listeners: 980, broadcastifyId: "1036" },
  { id: "tx-austin", name: "Austin Public Safety", state: "TX", stateName: "Texas", city: "Austin", category: "mixed", description: "Austin police, fire, and EMS", listeners: 810, broadcastifyId: "14931" },
  { id: "tx-san-antonio", name: "San Antonio Police", state: "TX", stateName: "Texas", city: "San Antonio", category: "police", description: "San Antonio Police Department", listeners: 650, broadcastifyId: "3691", streamUrl: "https://broadcastify.cdnstream1.com/3691" },

  // Florida
  { id: "fl-miami", name: "Miami-Dade Police", state: "FL", stateName: "Florida", city: "Miami", category: "police", description: "Miami-Dade Police Department", listeners: 1250, broadcastifyId: "14559" },
  { id: "fl-orlando", name: "Orlando Police & Fire", state: "FL", stateName: "Florida", city: "Orlando", category: "mixed", description: "Orlando PD and Fire dispatch", listeners: 740, broadcastifyId: "25344" },
  { id: "fl-tampa", name: "Tampa Police", state: "FL", stateName: "Florida", city: "Tampa", category: "police", description: "Tampa Police Department", listeners: 520, broadcastifyId: "30611" },
  { id: "fl-jacksonville", name: "Jacksonville Sheriff", state: "FL", stateName: "Florida", city: "Jacksonville", category: "police", description: "Jacksonville Sheriff's Office", listeners: 430, broadcastifyId: "17194" },

  // Illinois
  { id: "il-chicago-pd", name: "Chicago Police", state: "IL", stateName: "Illinois", city: "Chicago", category: "police", description: "Chicago Police Department Zone 1-4", listeners: 2400, broadcastifyId: "32253", streamUrl: "https://broadcastify.cdnstream1.com/32253" },
  { id: "il-chicago-fire", name: "Chicago Fire", state: "IL", stateName: "Illinois", city: "Chicago", category: "fire", description: "Chicago Fire Department", listeners: 980, broadcastifyId: "14531" },

  // Arizona
  { id: "az-phoenix", name: "Phoenix Police", state: "AZ", stateName: "Arizona", city: "Phoenix", category: "police", description: "Phoenix Police Department", listeners: 870, broadcastifyId: "30455" },
  { id: "az-maricopa", name: "Maricopa County Sheriff", state: "AZ", stateName: "Arizona", city: "Phoenix", category: "police", description: "Maricopa County Sheriff's Office", listeners: 560, broadcastifyId: "21970" },

  // Washington
  { id: "wa-seattle", name: "Seattle Police", state: "WA", stateName: "Washington", city: "Seattle", category: "police", description: "Seattle Police Department", listeners: 920, broadcastifyId: "18272" },
  { id: "wa-spokane", name: "Spokane Police & Fire", state: "WA", stateName: "Washington", city: "Spokane", category: "mixed", description: "Spokane area public safety", listeners: 410, broadcastifyId: "14960" },

  // Pennsylvania
  { id: "pa-philly", name: "Philadelphia Police", state: "PA", stateName: "Pennsylvania", city: "Philadelphia", category: "police", description: "Philadelphia Police Department", listeners: 1120, broadcastifyId: "15306" },
  { id: "pa-pittsburgh", name: "Pittsburgh Police & Fire", state: "PA", stateName: "Pennsylvania", city: "Pittsburgh", category: "mixed", description: "Pittsburgh area public safety", listeners: 580, broadcastifyId: "17057", streamUrl: "https://broadcastify.cdnstream1.com/17057" },

  // Georgia
  { id: "ga-atlanta", name: "Atlanta Police", state: "GA", stateName: "Georgia", city: "Atlanta", category: "police", description: "Atlanta Police Department", listeners: 890, broadcastifyId: "22537" },

  // Massachusetts
  { id: "ma-boston", name: "Boston Police", state: "MA", stateName: "Massachusetts", city: "Boston", category: "police", description: "Boston Police Department", listeners: 1080, broadcastifyId: "9715" },
  { id: "ma-boston-fire", name: "Boston Fire", state: "MA", stateName: "Massachusetts", city: "Boston", category: "fire", description: "Boston Fire Department", listeners: 620, broadcastifyId: "13994" },

  // Michigan
  { id: "mi-detroit", name: "Detroit Police", state: "MI", stateName: "Michigan", city: "Detroit", category: "police", description: "Detroit Police Department", listeners: 780, broadcastifyId: "28022" },

  // Ohio
  { id: "oh-columbus", name: "Columbus Police", state: "OH", stateName: "Ohio", city: "Columbus", category: "police", description: "Columbus Police Department", listeners: 520, broadcastifyId: "15361" },
  { id: "oh-cleveland", name: "Cleveland Police & Fire", state: "OH", stateName: "Ohio", city: "Cleveland", category: "mixed", description: "Cleveland area public safety", listeners: 490, broadcastifyId: "14969" },

  // Colorado
  { id: "co-denver", name: "Denver Police", state: "CO", stateName: "Colorado", city: "Denver", category: "police", description: "Denver Police Department", listeners: 710, broadcastifyId: "22562", streamUrl: "https://broadcastify.cdnstream1.com/22562" },

  // Nevada
  { id: "nv-las-vegas", name: "Las Vegas Metro Police", state: "NV", stateName: "Nevada", city: "Las Vegas", category: "police", description: "Las Vegas Metropolitan Police", listeners: 960, broadcastifyId: "15127" },

  // Oregon
  { id: "or-portland", name: "Portland Police", state: "OR", stateName: "Oregon", city: "Portland", category: "police", description: "Portland Police Bureau", listeners: 680, broadcastifyId: "3591" },

  // North Carolina
  { id: "nc-charlotte", name: "Charlotte Police", state: "NC", stateName: "North Carolina", city: "Charlotte", category: "police", description: "Charlotte-Mecklenburg Police", listeners: 540, broadcastifyId: "12316" },

  // Virginia
  { id: "va-richmond", name: "Richmond Police", state: "VA", stateName: "Virginia", city: "Richmond", category: "police", description: "Richmond Police Department", listeners: 380, broadcastifyId: "26066" },

  // Missouri
  { id: "mo-stl", name: "St. Louis Police & Fire", state: "MO", stateName: "Missouri", city: "St. Louis", category: "mixed", description: "St. Louis area public safety", listeners: 450, broadcastifyId: "10996" },
  { id: "mo-kc", name: "Kansas City Police", state: "MO", stateName: "Missouri", city: "Kansas City", category: "police", description: "Kansas City Missouri Police", listeners: 390, broadcastifyId: "25324", streamUrl: "https://broadcastify.cdnstream1.com/25324" },

  // Tennessee
  { id: "tn-nashville", name: "Nashville Police", state: "TN", stateName: "Tennessee", city: "Nashville", category: "police", description: "Metro Nashville Police", listeners: 510, broadcastifyId: "15370" },
  { id: "tn-memphis", name: "Memphis Police", state: "TN", stateName: "Tennessee", city: "Memphis", category: "police", description: "Memphis Police Department", listeners: 420, broadcastifyId: "16134" },

  // Minnesota
  { id: "mn-minneapolis", name: "Minneapolis Police", state: "MN", stateName: "Minnesota", city: "Minneapolis", category: "police", description: "Minneapolis Police Department", listeners: 640, broadcastifyId: "7937" },

  // Wisconsin
  { id: "wi-milwaukee", name: "Milwaukee Police", state: "WI", stateName: "Wisconsin", city: "Milwaukee", category: "police", description: "Milwaukee Police Department", listeners: 480, broadcastifyId: "10905" },

  // Indiana
  { id: "in-indy", name: "Indianapolis Metro Police", state: "IN", stateName: "Indiana", city: "Indianapolis", category: "police", description: "Indianapolis Metropolitan Police", listeners: 440, broadcastifyId: "23552" },

  // Louisiana
  { id: "la-nola", name: "New Orleans Police & Fire", state: "LA", stateName: "Louisiana", city: "New Orleans", category: "mixed", description: "New Orleans public safety", listeners: 520, broadcastifyId: "7985" },

  // Maryland
  { id: "md-baltimore", name: "Baltimore Police", state: "MD", stateName: "Maryland", city: "Baltimore", category: "police", description: "Baltimore Police Department", listeners: 680, broadcastifyId: "1103" },

  // DC
  { id: "dc-metro", name: "DC Metropolitan Police", state: "DC", stateName: "District of Columbia", city: "Washington", category: "police", description: "DC Metropolitan Police Department", listeners: 710, broadcastifyId: "14842" },

  // Alaska
  { id: "ak-anchorage", name: "Anchorage Police", state: "AK", stateName: "Alaska", city: "Anchorage", category: "police", description: "Anchorage Police Department", listeners: 240, broadcastifyId: "29056" },

  // Hawaii
  { id: "hi-honolulu", name: "Honolulu Police", state: "HI", stateName: "Hawaii", city: "Honolulu", category: "police", description: "Honolulu Police Department", listeners: 310, broadcastifyId: "32011" },

  // New Jersey
  { id: "nj-newark", name: "Newark Police", state: "NJ", stateName: "New Jersey", city: "Newark", category: "police", description: "Newark Police Department", listeners: 420, broadcastifyId: "15326" },

  // Connecticut
  { id: "ct-hartford", name: "Hartford Police", state: "CT", stateName: "Connecticut", city: "Hartford", category: "police", description: "Hartford Police Department", listeners: 280, broadcastifyId: "1100" },
  { id: "ct-new-haven", name: "New Haven Police", state: "CT", stateName: "Connecticut", city: "New Haven", category: "police", description: "Greater New Haven Police Department", listeners: 190, broadcastifyId: "8705", streamUrl: "https://broadcastify.cdnstream1.com/8705" },

  // Virginia (Fairfax — flagship direct stream)
  { id: "va-fairfax", name: "Fairfax County Public Safety", state: "VA", stateName: "Virginia", city: "Fairfax", category: "mixed", description: "Fairfax County Police, Fire, and EMS", listeners: 1350, broadcastifyId: "28326", streamUrl: "https://broadcastify.cdnstream1.com/28326" },

  // Arizona (Tucson direct)
  { id: "az-tucson", name: "Tucson Police Dispatch", state: "AZ", stateName: "Arizona", city: "Tucson", category: "police", description: "Tucson Police Department dispatch", listeners: 460, broadcastifyId: "22835", streamUrl: "https://broadcastify.cdnstream1.com/22835" },

  // New York (Jefferson County direct)
  { id: "ny-jefferson", name: "Jefferson County Safety", state: "NY", stateName: "New York", city: "Watertown", category: "mixed", description: "Jefferson County NY Police, Fire, and EMS", listeners: 210, broadcastifyId: "6007", streamUrl: "https://broadcastify.cdnstream1.com/6007" },

  // Washington (Chelan/Douglas direct)
  { id: "wa-chelan", name: "Chelan/Douglas Dispatch", state: "WA", stateName: "Washington", city: "Wenatchee", category: "mixed", description: "Rivercom Chelan/Douglas County Dispatch", listeners: 180, broadcastifyId: "24557", streamUrl: "https://broadcastify.cdnstream1.com/24557" },

  // Indiana (Madison County direct)
  { id: "in-madison", name: "Madison County Public Safety", state: "IN", stateName: "Indiana", city: "Anderson", category: "mixed", description: "Madison County Sheriff, Fire, EMS, Anderson Police", listeners: 220, broadcastifyId: "24550", streamUrl: "https://broadcastify.cdnstream1.com/24550" },

  // Oregon (Tillamook direct)
  { id: "or-tillamook", name: "Tillamook County Safety", state: "OR", stateName: "Oregon", city: "Tillamook", category: "mixed", description: "Tillamook County Police and EMS", listeners: 150, broadcastifyId: "16984", streamUrl: "https://broadcastify.cdnstream1.com/16984" },
];

// Helper: stream URL (Broadcastify public listen embed)
export function getBroadcastifyUrl(feed: Feed): string {
  return `https://www.broadcastify.com/listen/feed/${feed.broadcastifyId}`;
}

// Helper: direct audio stream URL for HTML5 audio (Broadcastify public feeds)
export function getStreamUrl(feed: Feed): string {
  if (feed.streamUrl) return feed.streamUrl;
  return `https://broadcastify.cdnstream1.com/${feed.broadcastifyId}`;
}

// Get feeds by state code
export function getFeedsByState(stateCode: string): Feed[] {
  return feeds.filter((f) => f.state === stateCode);
}

// States with feeds (for map highlighting)
export function getStatesWithFeeds(): Set<string> {
  return new Set(feeds.map((f) => f.state));
}

// Top feeds (by listeners)
export function getTopFeeds(limit: number = 12): Feed[] {
  return [...feeds].sort((a, b) => (b.listeners || 0) - (a.listeners || 0)).slice(0, limit);
}
