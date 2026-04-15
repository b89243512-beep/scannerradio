"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { USMap } from "@/components/USMap";
import { AudioPlayer } from "@/components/AudioPlayer";
import {
  Radio, Play, MapPin, Users, Shield, Globe, Zap, Headphones,
  ChevronDown, ChevronUp, Search, Flame, Siren, Activity, AlertTriangle,
} from "lucide-react";
import { feeds, getFeedsByState, getTopFeeds, getStatesWithFeeds, type Feed, type Category } from "@/data/feeds";
import { US_STATES } from "@/data/us-states";

const CATEGORY_META: Record<Category, { icon: typeof Radio; label: string; color: string; bg: string }> = {
  police: { icon: Shield, label: "Police", color: "text-blue-400", bg: "bg-blue-500/10" },
  fire: { icon: Flame, label: "Fire", color: "text-orange-400", bg: "bg-orange-500/10" },
  ems: { icon: Activity, label: "EMS", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  mixed: { icon: Siren, label: "Mixed", color: "text-purple-400", bg: "bg-purple-500/10" },
  aviation: { icon: Radio, label: "Aviation", color: "text-sky-400", bg: "bg-sky-500/10" },
  weather: { icon: AlertTriangle, label: "Weather", color: "text-yellow-400", bg: "bg-yellow-500/10" },
};

const features = [
  { icon: Globe, title: "All 50 States", desc: "Live scanner feeds from police, fire, and EMS across the entire United States." },
  { icon: Zap, title: "Instant Play", desc: "One click to tune into any feed. No download, no sign-up, no delays." },
  { icon: Shield, title: "100% Free", desc: "Every feed is free forever. No subscriptions, no paywalls, no ads on the player." },
  { icon: Headphones, title: "Any Device", desc: "Works perfectly on desktop, tablet, and mobile. Listen anywhere, anytime." },
  { icon: MapPin, title: "Interactive Map", desc: "Visual US map showing which states have live feeds available right now." },
  { icon: Radio, title: "Multiple Categories", desc: "Police, fire, EMS, aviation, and weather emergency channels in one place." },
];

const faqs = [
  { q: "Is Free Scanner Radio really free to use?", a: "Yes, 100% free with no sign-up required. Listen to unlimited live police, fire, and EMS scanner feeds from across the United States without ever paying anything." },
  { q: "Is it legal to listen to police scanners?", a: "Yes, in the United States it is legal for anyone to listen to unencrypted police, fire, and EMS radio communications. These frequencies are part of the public airwaves. Some states have restrictions on using scanners while committing a crime, but listening at home or on the go is fully legal." },
  { q: "How do I listen to a live feed?", a: "Click any blue state on the interactive US map, choose a feed from the list, and press play. The stream starts instantly in your browser. You can also browse the popular feeds section to jump straight into the most-listened channels." },
  { q: "Why are some states greyed out?", a: "States shown in grey currently have no active feeds in our directory. We're constantly adding more — check back regularly or browse popular feeds from active states." },
  { q: "Does this work on my phone?", a: "Yes. The entire site is mobile-optimized, including the map and player. Just open in any modern mobile browser (Safari, Chrome, Firefox) and tap a state to start listening." },
  { q: "Where do the scanner feeds come from?", a: "Feeds are sourced from public community-run scanner streams, primarily routed through Broadcastify (the largest public scanner network in the US). Scanner Radio aggregates and organizes these feeds for easy discovery." },
  { q: "Can I listen in the background?", a: "Yes. Start playback and switch to another tab or app — the audio continues uninterrupted. On mobile, you may need to keep your browser open in some cases depending on your device settings." },
  { q: "Why is a stream sometimes unavailable?", a: "Scanner feeds are community-operated and occasionally go offline for maintenance, bad weather, or hardware issues. If a stream doesn't load, try another feed or check back in a few minutes." },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left" aria-expanded={open}>
        <span className="font-semibold text-foreground pr-4">{question}</span>
        {open ? <ChevronUp className="w-5 h-5 text-primary shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted shrink-0" />}
      </button>
      {open && <div className="px-5 pb-5"><p className="text-muted text-sm leading-relaxed">{answer}</p></div>}
    </div>
  );
}

function FeedCard({ feed, onPlay, playing }: { feed: Feed; onPlay: (f: Feed) => void; playing: boolean }) {
  const meta = CATEGORY_META[feed.category];
  return (
    <button
      onClick={() => onPlay(feed)}
      className={`group text-left bg-card rounded-xl border p-4 transition-all hover:border-primary/40 hover:bg-card/80 ${
        playing ? "border-primary ring-2 ring-primary/30" : "border-border"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg ${meta.bg} flex items-center justify-center shrink-0`}>
          <meta.icon className={`w-5 h-5 ${meta.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="font-bold text-foreground truncate group-hover:text-primary transition-colors">{feed.name}</p>
            {playing && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shrink-0" />}
          </div>
          <p className="text-xs text-muted flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {feed.city}, {feed.state}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${meta.bg} ${meta.color} uppercase tracking-wider`}>
              {meta.label}
            </span>
            {feed.listeners && (
              <span className="text-xs text-muted flex items-center gap-1">
                <Users className="w-3 h-3" /> {feed.listeners.toLocaleString()}
              </span>
            )}
          </div>
        </div>
        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all ${
          playing ? "bg-red-500 text-white" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
        }`}>
          <Play className="w-4 h-4 ml-0.5" />
        </div>
      </div>
    </button>
  );
}

export default function Home() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [currentFeed, setCurrentFeed] = useState<Feed | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<Category | "all">("all");
  const [search, setSearch] = useState("");

  const statesWithFeeds = useMemo(() => getStatesWithFeeds(), []);
  const feedCounts = useMemo(() => {
    const m: Record<string, number> = {};
    feeds.forEach((f) => { m[f.state] = (m[f.state] || 0) + 1; });
    return m;
  }, []);

  const topFeeds = useMemo(() => getTopFeeds(12), []);

  const filteredFeeds = useMemo(() => {
    let list = selectedState ? getFeedsByState(selectedState) : feeds;
    if (categoryFilter !== "all") list = list.filter((f) => f.category === categoryFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((f) =>
        f.name.toLowerCase().includes(q) ||
        f.city.toLowerCase().includes(q) ||
        f.stateName.toLowerCase().includes(q)
      );
    }
    return list;
  }, [selectedState, categoryFilter, search]);

  const selectedStateInfo = selectedState ? US_STATES.find((s) => s.code === selectedState) : null;

  const handlePlay = (f: Feed) => {
    setCurrentFeed(f);
    // Auto-scroll to top so player is visible? Actually player is at bottom, no need
  };

  return (
    <>
      <Navbar />
      <main className="pb-24">
        {/* Hero */}
        <section className="py-8 md:py-10 border-b border-border">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 text-xs font-bold px-3 py-1.5 rounded-full mb-5 border border-red-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              LIVE · {feeds.length} ACTIVE RADIO
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight">
              Free <span className="gradient-text">Police Scanner Radio</span>
            </h1>
            <p className="text-base md:text-lg text-muted mt-4 max-w-2xl mx-auto leading-relaxed">
              Listen to live police, fire, and EMS scanner feeds from all 50 states. Click any state on the map below and tune into the action in real time — completely free, no sign-up needed.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-sm text-muted">
              <div className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-blue-400" /> Police</div>
              <div className="flex items-center gap-1.5"><Flame className="w-4 h-4 text-orange-400" /> Fire</div>
              <div className="flex items-center gap-1.5"><Activity className="w-4 h-4 text-emerald-400" /> EMS</div>
              <div className="flex items-center gap-1.5"><Siren className="w-4 h-4 text-purple-400" /> Mixed</div>
            </div>
          </div>
        </section>

        {/* Interactive Map */}
        <section id="map" className="py-6 md:py-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Click a State to Listen
              </h2>
              <p className="text-muted mt-2 text-sm md:text-base">
                {selectedStateInfo
                  ? <>Showing <span className="text-primary font-semibold">{feedCounts[selectedState!] || 0} feeds</span> in <span className="text-primary font-semibold">{selectedStateInfo.name}</span>. <button onClick={() => setSelectedState(null)} className="underline hover:text-primary">Clear filter</button></>
                  : <>Explore live scanner feeds across the interactive US map</>
                }
              </p>
            </div>

            <USMap
              selectedState={selectedState}
              onSelectState={(c) => setSelectedState(selectedState === c ? null : c)}
              statesWithFeeds={statesWithFeeds}
              feedCounts={feedCounts}
            />
          </div>
        </section>

        {/* Browse section */}
        <section id="browse" className="py-10 md:py-14 bg-surface/50 border-y border-border">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {selectedState ? `Feeds in ${selectedStateInfo?.name}` : "Browse All Feeds"}
              </h2>
              <div className="flex items-center gap-2">
                {/* Search */}
                <div className="relative flex-1 md:flex-none md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search city or feed..."
                    className="w-full pl-9 pr-3 py-2 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary/40"
                  />
                </div>
              </div>
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setCategoryFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  categoryFilter === "all" ? "bg-primary text-white" : "bg-card text-muted border border-border hover:text-foreground"
                }`}
              >
                All ({filteredFeeds.length})
              </button>
              {(Object.keys(CATEGORY_META) as Category[]).map((cat) => {
                const meta = CATEGORY_META[cat];
                const count = (selectedState ? getFeedsByState(selectedState) : feeds).filter((f) => f.category === cat).length;
                if (count === 0) return null;
                return (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      categoryFilter === cat
                        ? `${meta.bg} ${meta.color} ring-1 ring-current/30`
                        : "bg-card text-muted border border-border hover:text-foreground"
                    }`}
                  >
                    <meta.icon className="w-3.5 h-3.5" />
                    {meta.label} ({count})
                  </button>
                );
              })}
            </div>

            {/* Feed grid */}
            {filteredFeeds.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredFeeds.map((f) => (
                  <FeedCard
                    key={f.id}
                    feed={f}
                    onPlay={handlePlay}
                    playing={currentFeed?.id === f.id}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-muted">
                <Radio className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No feeds match your filters.</p>
              </div>
            )}
          </div>
        </section>

        {/* Top feeds */}
        {!selectedState && !search && categoryFilter === "all" && (
          <section className="py-10 md:py-14">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-2">
                🔥 Most Popular Scanner Feeds
              </h2>
              <p className="text-muted text-center mb-8">The busiest public scanner channels in the US right now.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {topFeeds.map((f) => (
                  <FeedCard key={f.id} feed={f} onPlay={handlePlay} playing={currentFeed?.id === f.id} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Features */}
        <section className="py-10 md:py-14 bg-surface/50 border-y border-border">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
              Why Choose <span className="gradient-text">Free Scanner Radio</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((f) => (
                <div key={f.title} className="feature-card">
                  <f.icon className="w-7 h-7 text-primary mb-3" />
                  <h3 className="font-bold text-foreground">{f.title}</h3>
                  <p className="text-sm text-muted mt-2 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4">
            <article className="prose prose-lg max-w-none text-muted leading-relaxed">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">The Complete Guide to Free Police Scanner Radio</h2>
              <p>Police scanner radio has been a staple of American life for decades. Originally reserved for journalists, tow truck operators, and radio hobbyists, modern internet-based scanner feeds have made live emergency communications accessible to everyone. Free Scanner Radio brings together the best community-operated scanner streams from across the United States into one easy-to-use web interface — no apps to download, no accounts to create, no fees to pay.</p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">What Is a Police Scanner?</h3>
              <p>A police scanner is a radio receiver that monitors two-way communications used by law enforcement, fire departments, emergency medical services, and other public safety agencies. In the past, physical scanner radios were the only way to listen. Today, volunteers across the country stream these signals over the internet, making them available to anyone with a browser. When you listen through Free Scanner Radio, you are hearing the same transmissions as officers, dispatchers, and first responders in real time.</p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Who Uses Scanner Radio?</h3>
              <p>Scanner listeners come from every background. News reporters use scanners to break stories before competitors. Storm chasers and weather enthusiasts monitor severe weather dispatches. Traffic reporters track accidents in real time. Neighborhood watch groups stay informed about nearby incidents. Public safety students learn how dispatch protocols actually work in the field. And countless hobbyists simply enjoy following the drama of daily emergency response. Whatever your reason, Free Scanner Radio makes it easy to tune in.</p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Is It Legal to Listen to Police Scanners?</h3>
              <p>In the United States, listening to unencrypted police, fire, and EMS radio communications is completely legal for anyone. These frequencies are part of the public airwaves, and federal law protects the right to monitor them. A handful of states (notably New York, Indiana, Kentucky, Minnesota, Florida, and Michigan) restrict the use of scanners while committing a crime or in a moving vehicle, but passive listening at home, in your office, or on the go is universally allowed. Encrypted communications, however, cannot legally be decrypted — and Free Scanner Radio only streams unencrypted public channels.</p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">How Our Interactive Map Works</h3>
              <p>The map above shows a simplified view of the United States. States highlighted in blue have one or more active scanner feeds available. Click any blue state to filter the feed list to that specific location. States that appear muted currently have no feeds in our directory, though we add new ones constantly. Each feed card shows the agency name, city, category (police, fire, EMS, or mixed), and approximate listener count. Click the play button to start streaming instantly — playback continues even when you switch browser tabs.</p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Understanding Feed Categories</h3>
              <p>Feeds are organized into several categories. Police feeds carry patrol, dispatch, and tactical communications from local, county, and state law enforcement agencies. Fire feeds monitor fire department dispatch and on-scene communications during emergencies. EMS feeds cover ambulance dispatch and hospital coordination. Mixed feeds combine multiple agencies onto a single stream — common in smaller cities where police, fire, and EMS share infrastructure. Choose the category that matches what you want to follow, or leave the filter on "All" to see everything available.</p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Tips for New Scanner Listeners</h3>
              <p>If you are new to scanner radio, start with major metropolitan feeds — cities like Los Angeles, New York, Chicago, and Houston have the highest activity and are easiest to follow. Major feeds typically have more listeners, which means better stream stability. You will hear a mix of routine dispatches, traffic stops, medical calls, and occasional high-priority incidents. The activity level varies dramatically by time of day: late afternoons and weekends tend to be busiest, while early mornings are quieter. Scanner codes and agency-specific jargon can be confusing at first, but you will quickly pick up the patterns with a bit of listening.</p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Why Free Scanner Radio Is Different</h3>
              <p>Many scanner apps require paid subscriptions, lock premium feeds behind paywalls, or bombard you with ads. Free Scanner Radio takes a different approach. Every single feed is completely free, with no registration required. The interface is clean and modern, designed to get you listening in seconds. The interactive US map provides a unique visual way to explore feeds that no other service offers. And because it runs entirely in your browser, there is nothing to install and nothing to update. Just open the site, pick a state, and you are in.</p>
            </article>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-12 md:py-16 bg-surface/50 border-t border-border">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground text-center mb-10">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((f) => <FAQItem key={f.q} question={f.q} answer={f.a} />)}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <AudioPlayer feed={currentFeed} onClose={() => setCurrentFeed(null)} />
    </>
  );
}
