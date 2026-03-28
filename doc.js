const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.title = 'Allure Interiors x EVOS Buildcon — Brand Collaboration Proposal';

const GOLD    = "C9A84C";
const DARK    = "0F0F0F";
const CHARCOAL= "1C1C1C";
const MID     = "2A2A2A";
const CREAM   = "F5F0E8";
const WHITE   = "FFFFFF";
const MUTED   = "9E9E9E";
const ACCENT  = "D4B86A";

function footer(s) {
  s.addShape(pres.shapes.RECTANGLE, { x:0, y:5.38, w:10, h:0.245, fill:{color:GOLD}, line:{color:GOLD} });
  s.addText("ALLURE INTERIORS × EVOS BUILDCON  ·  BRAND COLLABORATION PROPOSAL  ·  CONFIDENTIAL", {
    x:0.2, y:5.39, w:9.6, h:0.22, fontSize:7.5, color:DARK, bold:true,
    charSpacing:1, fontFace:"Calibri", align:"center", margin:0
  });
}

// ── SLIDE 1: COVER ──────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: DARK };

  s.addShape(pres.shapes.RECTANGLE, { x:0, y:0, w:0.08, h:5.625, fill:{color:GOLD}, line:{color:GOLD} });
  s.addShape(pres.shapes.RECTANGLE, { x:8.5, y:0, w:1.5, h:1.2, fill:{color:GOLD}, line:{color:GOLD} });

  s.addText("BRAND COLLABORATION PROPOSAL", { x:0.35, y:0.28, w:5.5, h:0.35, fontSize:9, color:GOLD, bold:true, charSpacing:4, fontFace:"Calibri", margin:0 });
  s.addText("EVOS Buildcon", { x:0.35, y:0.75, w:7.5, h:0.85, fontSize:46, color:WHITE, bold:true, fontFace:"Georgia", margin:0 });
  s.addText("× Allure Interiors", { x:0.35, y:1.55, w:7.5, h:0.85, fontSize:46, color:GOLD, bold:true, fontFace:"Georgia", margin:0 });

  s.addShape(pres.shapes.RECTANGLE, { x:0.35, y:2.5, w:5.5, h:0.025, fill:{color:GOLD}, line:{color:GOLD} });
  s.addText("From ₹4,000 Cr to ₹8,000 Cr — The Interior Partnership That Doubles Your Value", {
    x:0.35, y:2.65, w:7.8, h:0.6, fontSize:15, color:CREAM, fontFace:"Calibri", margin:0
  });

  const stats = [["₹4,000 Cr","EVOS Current GDV"],["18M+ Sq.Ft.","Pipeline Under Development"],["5,000 Flats","Target by 2027"],["0","In-house Interior Arm"]];
  const bx = [0.35, 2.8, 5.25, 7.7];
  stats.forEach(([val,label],i) => {
    s.addText(val, { x:bx[i], y:4.3, w:2.3, h:0.5, fontSize:20, color:i===3?"E55050":GOLD, bold:true, fontFace:"Georgia", margin:0 });
    s.addText(label, { x:bx[i], y:4.78, w:2.3, h:0.3, fontSize:9.5, color:MUTED, fontFace:"Calibri", margin:0 });
  });

  s.addShape(pres.shapes.RECTANGLE, { x:0, y:5.38, w:10, h:0.245, fill:{color:GOLD}, line:{color:GOLD} });
  s.addText("CONFIDENTIAL  ·  MARCH 2026  ·  PREPARED BY ALLURE INTERIORS", {
    x:0.35, y:5.39, w:9.3, h:0.22, fontSize:8, color:DARK, bold:true, charSpacing:2, fontFace:"Calibri", align:"center", margin:0
  });
}

// ── SLIDE 2: STRATEGIC CASE ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: DARK };
  s.addText("THE STRATEGIC CASE", { x:0.4, y:0.2, w:6, h:0.35, fontSize:9, color:GOLD, bold:true, charSpacing:4, fontFace:"Calibri", margin:0 });
  s.addText("EVOS builds the structure. Allure completes the home.", { x:0.4, y:0.55, w:9.2, h:0.7, fontSize:26, color:WHITE, bold:true, fontFace:"Georgia", margin:0 });
  s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:1.28, w:9.2, h:0.025, fill:{color:GOLD}, line:{color:GOLD} });
  s.addText("EVOS Buildcon has built Odisha's most aspirational real estate brand — 17 years, 10M+ sq.ft. under development, and a ₹1,000 Cr net worth target by 2027. One structural gap remains: no in-house interior design capability. Every buyer walks away after possession and figures out interiors alone. This is the gap Allure fills.", {
    x:0.4, y:1.4, w:9.2, h:0.82, fontSize:12.5, color:CREAM, fontFace:"Calibri", margin:0
  });

  const cards = [
    ["Same Customer","EVOS's HNI buyers in Bhubaneswar are exactly Allure's target interior clients — age 30–55, premium budget, design-conscious."],
    ["Structural Gap","EVOS has no interior arm. This is not a preference — it's a permanent capability hole that Allure fills permanently."],
    ["Scale Timing","18M+ sq.ft. in pipeline means years of guaranteed lead flow if partnership is formalised now, before competitors notice."],
    ["Mutual Value","EVOS gets a premium differentiator. Allure gets pre-qualified HNI clients at zero acquisition cost. Win-win-win."],
  ];
  const cx = [0.4, 2.68, 4.96, 7.24];
  cards.forEach(([t,b],i) => {
    s.addShape(pres.shapes.RECTANGLE, { x:cx[i], y:2.45, w:2.2, h:2.85, fill:{color:CHARCOAL}, line:{color:"333333", pt:0.5} });
    s.addShape(pres.shapes.RECTANGLE, { x:cx[i], y:2.45, w:2.2, h:0.06, fill:{color:GOLD}, line:{color:GOLD} });
    s.addText(`0${i+1}`, { x:cx[i]+0.12, y:2.56, w:0.5, h:0.42, fontSize:22, color:GOLD, bold:true, fontFace:"Georgia", margin:0 });
    s.addText(t, { x:cx[i]+0.12, y:3.05, w:1.96, h:0.38, fontSize:12, color:WHITE, bold:true, fontFace:"Calibri", margin:0 });
    s.addText(b, { x:cx[i]+0.12, y:3.45, w:1.96, h:1.7, fontSize:10.5, color:CREAM, fontFace:"Calibri", margin:0, valign:"top" });
  });
  footer(s);
}

// ── SLIDE 3: WHO IS ALLURE ──────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: DARK };
  s.addText("WHO IS ALLURE INTERIORS", { x:0.4, y:0.2, w:7, h:0.35, fontSize:9, color:GOLD, bold:true, charSpacing:4, fontFace:"Calibri", margin:0 });
  s.addText("India's curated AI-powered interior design ecosystem", { x:0.4, y:0.55, w:9.2, h:0.6, fontSize:24, color:WHITE, bold:true, fontFace:"Georgia", margin:0 });
  s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:1.18, w:9.2, h:0.025, fill:{color:GOLD}, line:{color:GOLD} });

  s.addText("THE PLATFORM", { x:0.4, y:1.32, w:4.5, h:0.28, fontSize:8.5, color:GOLD, bold:true, charSpacing:3, fontFace:"Calibri", margin:0 });
  s.addText("Allure Interiors is a curated digital ecosystem solving the interior design market's trust deficit. We use AI-driven matchmaking to connect premium clients with an exclusive network of verified designers, and immersive AR/VR to bridge vision and reality — managing the entire process from discovery to execution.", {
    x:0.4, y:1.62, w:4.6, h:1.2, fontSize:11.5, color:CREAM, fontFace:"Calibri", margin:0, valign:"top"
  });

  const pillars = [
    ["AI Matchmaking","Proprietary algorithm matches clients to verified designers by budget, style, and timeline."],
    ["Verified Designer Network","Invite-only. 500+ curated designers vetted for quality, experience, and portfolio."],
    ["AR/VR Visualization","Clients see their home in 3D before a single rupee is spent on execution."],
    ["End-to-End Execution","Verified local execution partners implement every design with centralized quality control."],
  ];
  pillars.forEach(([t,b],i) => {
    const py = 2.92 + i*0.6;
    s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:py, w:0.06, h:0.5, fill:{color:GOLD}, line:{color:GOLD} });
    s.addText(t, { x:0.58, y:py, w:4.4, h:0.24, fontSize:11, color:WHITE, bold:true, fontFace:"Calibri", margin:0 });
    s.addText(b, { x:0.58, y:py+0.24, w:4.4, h:0.28, fontSize:9.5, color:MUTED, fontFace:"Calibri", margin:0 });
  });

  const rstats = [["500+","Curated Designers\n(Target Network)"],["5–15%","Platform Commission\nper Project"],["₹5L–₹40L","Typical Client Interior\nBudget"],["4:1","India : International\nDesigner Ratio"]];
  const rsy = [1.32, 2.3, 3.28, 4.26];
  rstats.forEach(([val,label],i) => {
    s.addShape(pres.shapes.RECTANGLE, { x:5.5, y:rsy[i], w:4.1, h:0.88, fill:{color:CHARCOAL}, line:{color:"333333", pt:0.5} });
    s.addText(val, { x:5.65, y:rsy[i]+0.08, w:1.4, h:0.72, fontSize:26, color:GOLD, bold:true, fontFace:"Georgia", valign:"middle", margin:0 });
    s.addText(label, { x:7.1, y:rsy[i]+0.15, w:2.35, h:0.6, fontSize:11, color:CREAM, fontFace:"Calibri", margin:0, valign:"middle" });
  });

  s.addShape(pres.shapes.RECTANGLE, { x:5.5, y:5.14, w:4.1, h:0.18, fill:{color:GOLD}, line:{color:GOLD} });
  s.addText("Revenue: SaaS subscriptions + 5–15% project commissions + AR/VR upsells", {
    x:5.6, y:5.16, w:3.9, h:0.14, fontSize:9, color:DARK, bold:true, fontFace:"Calibri", margin:0
  });
  footer(s);
}

// ── SLIDE 4: THE GAP ────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: DARK };
  s.addText("THE INTERIOR GAP", { x:0.4, y:0.2, w:6, h:0.35, fontSize:9, color:GOLD, bold:true, charSpacing:4, fontFace:"Calibri", margin:0 });
  s.addText("What happens to your buyers after possession day?", { x:0.4, y:0.55, w:9.2, h:0.6, fontSize:24, color:WHITE, bold:true, fontFace:"Georgia", margin:0 });
  s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:1.18, w:9.2, h:0.025, fill:{color:GOLD}, line:{color:GOLD} });

  const journey = [
    ["EVOS delivers\nthe flat","Buyer receives keys to a bare shell. The LOVEMARK promise ends at possession day."],
    ["Buyer searches\nfor designers","90% unorganised market. 70% overspend. Projects drag 3–6 months. Trust broken."],
    ["Cost overruns\n& delays","Final costs rise 45% above quotes. Poor planning, cultural mismatches, Vastu errors."],
    ["Negative reviews\nspread","Buyer who suffers post-possession blames the builder. Every 1-star review hurts EVOS."],
  ];
  const jx = [0.4, 2.72, 5.04, 7.36];
  journey.forEach(([t,b],i) => {
    s.addShape(pres.shapes.RECTANGLE, { x:jx[i], y:1.4, w:2.24, h:2.6, fill:{color:i===3?"5A1A1A":CHARCOAL}, line:{color:"333333", pt:0.5} });
    s.addText(`${i+1}`, { x:jx[i]+0.12, y:1.52, w:0.45, h:0.45, fontSize:22, color:i===3?"E55050":GOLD, bold:true, fontFace:"Georgia", margin:0 });
    s.addText(t, { x:jx[i]+0.12, y:2.02, w:2.0, h:0.52, fontSize:11.5, color:WHITE, bold:true, fontFace:"Calibri", margin:0 });
    s.addText(b, { x:jx[i]+0.12, y:2.58, w:2.0, h:1.3, fontSize:10, color:CREAM, fontFace:"Calibri", margin:0, valign:"top" });
    if (i<3) s.addShape(pres.shapes.RECTANGLE, { x:jx[i]+2.24, y:2.65, w:0.48, h:0.025, fill:{color:GOLD}, line:{color:GOLD} });
  });

  const mdata = [["90%","Interior market\nunorganised in India"],["70%","Homeowners\noverspend on interiors"],["45%","Average cost overrun\nvs. initial quotes"],["3–6 Mo","Average project\ndelay time"]];
  mdata.forEach(([val,label],i) => {
    s.addShape(pres.shapes.RECTANGLE, { x:jx[i], y:4.2, w:2.24, h:1.0, fill:{color:MID}, line:{color:"444444", pt:0.5} });
    s.addText(val, { x:jx[i]+0.1, y:4.25, w:2.04, h:0.48, fontSize:24, color:GOLD, bold:true, fontFace:"Georgia", align:"center", margin:0 });
    s.addText(label, { x:jx[i]+0.1, y:4.72, w:2.04, h:0.4, fontSize:9.5, color:MUTED, fontFace:"Calibri", align:"center", margin:0 });
  });
  footer(s);
}

// ── SLIDE 5: THE SOLUTION ───────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: DARK };
  s.addText("THE SOLUTION", { x:0.4, y:0.2, w:6, h:0.35, fontSize:9, color:GOLD, bold:true, charSpacing:4, fontFace:"Calibri", margin:0 });
  s.addText("Allure Interiors becomes EVOS's official Preferred Interior Partner", { x:0.4, y:0.55, w:9.2, h:0.65, fontSize:22, color:WHITE, bold:true, fontFace:"Georgia", margin:0 });
  s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:1.22, w:9.2, h:0.025, fill:{color:GOLD}, line:{color:GOLD} });

  const models = [
    { tag:"MODEL A  —  RECOMMENDED FIRST MOVE", title:"Preferred Interior Partner", body:"EVOS officially recommends Allure to all homebuyers at possession. Allure sets up a branded studio inside the EVOS sales gallery. Buyers pay Allure directly. EVOS earns 1–2% referral commission — passive revenue, zero execution risk.", hl:"Low friction  ·  Immediate cash flow  ·  Permanent positioning" },
    { tag:"MODEL B  —  BOOKING-STAGE REVENUE", title:'Co-Branded Packages "Allure × EVOS Edition"', body:'Silver / Gold / Platinum interior tiers offered at booking — before possession. EVOS sales team upsells the package. Drives buyer conversion speed, locks in decisions, and differentiates EVOS from every competitor in Odisha.', hl:"Pre-possession  ·  Booking add-on  ·  Competitive differentiator" },
    { tag:"MODEL C  —  SHOWCASE INVESTMENT", title:"Model Flat at Evos Alchemy", body:"Allure designs and executes the model flat for EVOS Alchemy. Every site visitor experiences Allure's quality — becoming a qualified interior client at zero effort for EVOS. Physical proof of the LOVEMARK promise.", hl:"Flagship visibility  ·  Proof of concept  ·  Lead generation engine" },
    { tag:"MODEL D  —  LONG-TERM INSTITUTIONAL", title:"Commercial & Hospitality Interiors", body:"As EVOS enters commercial, educational, and hospitality sectors, Allure becomes the default interior partner for lobbies, clubhouses, and amenity zones — higher ticket, repeatable, and locked in before any competitor approaches.", hl:"Long-term B2B  ·  High ticket  ·  First-mover lock-in" },
  ];

  models.forEach(({tag,title,body,hl},i) => {
    const col = i%2, row = Math.floor(i/2);
    const mx = col===0 ? 0.4 : 5.2;
    const my = row===0 ? 1.35 : 3.35;
    s.addShape(pres.shapes.RECTANGLE, { x:mx, y:my, w:4.6, h:1.88, fill:{color:CHARCOAL}, line:{color:"333333", pt:0.5} });
    s.addShape(pres.shapes.RECTANGLE, { x:mx, y:my, w:4.6, h:0.06, fill:{color:GOLD}, line:{color:GOLD} });
    s.addText(tag, { x:mx+0.14, y:my+0.1, w:4.32, h:0.22, fontSize:7.5, color:GOLD, bold:true, charSpacing:1, fontFace:"Calibri", margin:0 });
    s.addText(title, { x:mx+0.14, y:my+0.32, w:4.32, h:0.3, fontSize:12.5, color:WHITE, bold:true, fontFace:"Calibri", margin:0 });
    s.addText(body, { x:mx+0.14, y:my+0.63, w:4.32, h:0.96, fontSize:9.5, color:CREAM, fontFace:"Calibri", margin:0, valign:"top" });
    s.addShape(pres.shapes.RECTANGLE, { x:mx, y:my+1.62, w:4.6, h:0.26, fill:{color:MID}, line:{color:"444444", pt:0.5} });
    s.addText(hl, { x:mx+0.14, y:my+1.65, w:4.32, h:0.2, fontSize:8.5, color:ACCENT, fontFace:"Calibri", margin:0 });
  });
  footer(s);
}

// ── SLIDE 6: CO-BRANDED PACKAGES ────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: DARK };
  s.addText("CO-BRANDED PACKAGES", { x:0.4, y:0.2, w:6, h:0.35, fontSize:9, color:GOLD, bold:true, charSpacing:4, fontFace:"Calibri", margin:0 });
  s.addText('"Allure × EVOS Edition" — Interior tiers offered at booking', { x:0.4, y:0.55, w:9.2, h:0.6, fontSize:22, color:WHITE, bold:true, fontFace:"Georgia", margin:0 });
  s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:1.18, w:9.2, h:0.025, fill:{color:GOLD}, line:{color:GOLD} });

  const tiers = [
    { name:"SILVER", price:"₹5 Lakh", hcolor:"9E9E9E", hbg:MID, items:["Full interior layout & space planning","Standard premium material palette","Modular kitchen design","Wardrobe & storage solutions","Basic lighting plan","Project coordination to handover"] },
    { name:"GOLD", price:"₹10 Lakh", hcolor:DARK, hbg:GOLD, items:["Everything in Silver","Premium imported tiles & veneer","Custom furniture design & procurement","False ceiling with cove lighting","Smart home basics (switches, AC control)","Dedicated designer assigned","3D renders before execution"] },
    { name:"PLATINUM", price:"₹20 Lakh+", hcolor:"EDD89A", hbg:"2A2200", items:["Everything in Gold","Ultra-luxury materials (marble, European hardware)","Full home automation (Alexa / Google)","Art & décor curation","Principal designer oversight","Site visits & progress reporting","Post-handover snag management"] },
  ];
  const tx = [0.4, 3.55, 6.7];
  tiers.forEach(({name,price,hcolor,hbg,items},i) => {
    const isG = i===1;
    s.addShape(pres.shapes.RECTANGLE, { x:tx[i], y:1.32, w:3.0, h:3.92, fill:{color:isG?"1A1600":CHARCOAL}, line:{color:isG?GOLD:"333333", pt:isG?1.5:0.5} });
    s.addShape(pres.shapes.RECTANGLE, { x:tx[i], y:1.32, w:3.0, h:0.7, fill:{color:hbg}, line:{color:hbg} });
    s.addText(name, { x:tx[i]+0.12, y:1.38, w:1.5, h:0.34, fontSize:14, color:hcolor, bold:true, charSpacing:3, fontFace:"Calibri", margin:0 });
    s.addText(price, { x:tx[i]+0.12, y:1.72, w:2.76, h:0.28, fontSize:13, color:isG?DARK:GOLD, bold:true, fontFace:"Georgia", margin:0 });
    items.forEach((item,j) => {
      s.addShape(pres.shapes.RECTANGLE, { x:tx[i]+0.14, y:2.1+j*0.36, w:0.07, h:0.07, fill:{color:isG?DARK:GOLD}, line:{color:isG?DARK:GOLD} });
      s.addText(item, { x:tx[i]+0.28, y:2.06+j*0.36, w:2.6, h:0.3, fontSize:10, color:CREAM, fontFace:"Calibri", margin:0 });
    });
    if(isG) {
      s.addShape(pres.shapes.RECTANGLE, { x:tx[i], y:4.98, w:3.0, h:0.26, fill:{color:GOLD}, line:{color:GOLD} });
      s.addText("MOST POPULAR", { x:tx[i], y:5.0, w:3.0, h:0.22, fontSize:9, color:DARK, bold:true, charSpacing:3, fontFace:"Calibri", align:"center", margin:0 });
    }
  });

  s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:5.16, w:9.2, h:0.18, fill:{color:MID}, line:{color:"444444", pt:0.5} });
  s.addText("EVOS earns 1–2% referral on each package  ·  Gold @ ₹10L = ₹10K–₹20K per flat  ·  100 flats = ₹10L–₹20L passive income for EVOS  ·  Zero execution risk", {
    x:0.5, y:5.18, w:9.1, h:0.14, fontSize:8.5, color:ACCENT, fontFace:"Calibri", align:"center", margin:0
  });
  footer(s);
}

// ── SLIDE 7: VALUE CREATION ─────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: DARK };
  s.addText("VALUE CREATION", { x:0.4, y:0.2, w:6, h:0.35, fontSize:9, color:GOLD, bold:true, charSpacing:4, fontFace:"Calibri", margin:0 });
  s.addText("How this partnership moves EVOS from ₹4,000 Cr to ₹8,000 Cr", { x:0.4, y:0.55, w:9.2, h:0.6, fontSize:22, color:WHITE, bold:true, fontFace:"Georgia", margin:0 });
  s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:1.18, w:9.2, h:0.025, fill:{color:GOLD}, line:{color:GOLD} });

  s.addText("THE VALUE DOUBLING THESIS", { x:0.4, y:1.35, w:5.5, h:0.28, fontSize:8.5, color:GOLD, bold:true, charSpacing:2, fontFace:"Calibri", margin:0 });
  const drivers = [
    ["Unit Price Premium","Interior-ready homes command 10–20% premium vs bare-shell competitors. At ₹1.5 Cr avg, 1,000 units × 15% = ₹225 Cr incremental GDV."],
    ["Buyer Conversion Speed","Buyers with a furnished model flat decide 40% faster. Faster sales = lower holding costs, higher IRR."],
    ["Post-Possession NPS","Smooth interior experience drives 5-star reviews, referrals, and repeat buyers — protecting EVOS's 4.9/5 JustDial rating."],
    ["Passive Revenue","At Gold tier ₹10L, 500 buyers = ₹500 Cr interior project flow generating referral income with zero capital deployed."],
    ["Commercial Readiness","Allure delivers institutional-grade interiors for lobbies, clubhouses, offices — unlocking EVOS's commercial/hospitality pipeline."],
    ["Brand Story Complete","The LOVEMARK promise is only fulfilled when the interior matches the architecture. Allure completes that story."],
  ];
  drivers.forEach(([t,b],i) => {
    const dy = 1.72+i*0.58;
    s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:dy, w:5.5, h:0.52, fill:{color:i%2===0?CHARCOAL:MID}, line:{color:"333333", pt:0.5} });
    s.addText(t, { x:0.55, y:dy+0.04, w:1.6, h:0.44, fontSize:10, color:GOLD, bold:true, fontFace:"Calibri", margin:0, valign:"middle" });
    s.addShape(pres.shapes.RECTANGLE, { x:2.18, y:dy, w:0.025, h:0.52, fill:{color:"444444"}, line:{color:"444444"} });
    s.addText(b, { x:2.3, y:dy+0.04, w:3.48, h:0.44, fontSize:9.5, color:CREAM, fontFace:"Calibri", margin:0, valign:"middle" });
  });

  s.addText("THE NUMBERS", { x:6.2, y:1.35, w:3.4, h:0.28, fontSize:8.5, color:GOLD, bold:true, charSpacing:2, fontFace:"Calibri", margin:0 });
  const numdata = [["₹225 Cr+","Incremental GDV from\nprice premium alone"],["500 flats","Interior projects in\n24-month pipeline"],["₹500 Cr","Total interior flow if\n50% buyers convert"],["₹10–20L","Passive referral income\nper 100 flats for EVOS"]];
  numdata.forEach(([val,label],i) => {
    const ny = 1.72+i*0.88;
    s.addShape(pres.shapes.RECTANGLE, { x:6.2, y:ny, w:3.4, h:0.8, fill:{color:CHARCOAL}, line:{color:"333333", pt:0.5} });
    s.addText(val, { x:6.32, y:ny+0.06, w:3.16, h:0.4, fontSize:22, color:GOLD, bold:true, fontFace:"Georgia", align:"center", margin:0 });
    s.addText(label, { x:6.32, y:ny+0.46, w:3.16, h:0.28, fontSize:9.5, color:MUTED, fontFace:"Calibri", align:"center", margin:0 });
  });
  footer(s);
}

// ── SLIDE 8: VERIFICATION ───────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: DARK };
  s.addText("VERIFICATION FRAMEWORK", { x:0.4, y:0.2, w:6, h:0.35, fontSize:9, color:GOLD, bold:true, charSpacing:4, fontFace:"Calibri", margin:0 });
  s.addText("We don't ask for trust. We offer the process to earn it.", { x:0.4, y:0.55, w:9.2, h:0.6, fontSize:22, color:WHITE, bold:true, fontFace:"Georgia", margin:0 });
  s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:1.18, w:9.2, h:0.025, fill:{color:GOLD}, line:{color:GOLD} });
  s.addText("The same rigorous verification framework Allure applies to its designer and execution partner network is now extended to EVOS — so you evaluate us exactly as you would any premium partner before committing.", {
    x:0.4, y:1.3, w:9.2, h:0.65, fontSize:11.5, color:CREAM, fontFace:"Calibri", margin:0
  });

  const vsteps = [
    ["Step 1","Site Visit to Completed Allure Projects","EVOS leadership visits completed interior projects delivered by Allure — evaluating quality, finish, Vastu compliance, and material standards firsthand."],
    ["Step 2","Client Reference Calls","Direct conversations with 3–5 HNI clients who completed projects through Allure — hearing from the exact buyer profile EVOS serves."],
    ["Step 3","Portfolio & Process Review","Full review of Allure's project portfolio, designer verification methodology, AR/VR visualization demos, and execution coordination system."],
    ["Step 4","Pilot Model Flat at Alchemy","Allure executes one model flat at Evos Alchemy — EVOS evaluates the output in their own flagship project before any formal commitment."],
  ];
  vsteps.forEach(([tag,t,b],i) => {
    const vy = 2.08+i*0.78;
    s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:vy, w:5.6, h:0.7, fill:{color:CHARCOAL}, line:{color:"333333", pt:0.5} });
    s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:vy, w:0.9, h:0.7, fill:{color:MID}, line:{color:MID} });
    s.addText(tag, { x:0.42, y:vy+0.06, w:0.86, h:0.58, fontSize:9.5, color:GOLD, bold:true, fontFace:"Calibri", align:"center", valign:"middle", margin:0 });
    s.addText(t, { x:1.42, y:vy+0.05, w:4.46, h:0.24, fontSize:11, color:WHITE, bold:true, fontFace:"Calibri", margin:0 });
    s.addText(b, { x:1.42, y:vy+0.3, w:4.46, h:0.36, fontSize:9.5, color:CREAM, fontFace:"Calibri", margin:0, valign:"top" });
  });

  s.addText("WHAT ALLURE VERIFIES IN EVOS", { x:6.2, y:1.35, w:3.5, h:0.28, fontSize:8.5, color:GOLD, bold:true, charSpacing:1, fontFace:"Calibri", margin:0 });
  const vlist = [
    ["17+ year track record","6.3L sq.ft. delivered — verified."],
    ["L&T-grade execution DNA","VP Projects from L&T — blue-chip."],
    ["ISO 9001 + RERA compliant","Process credibility confirmed."],
    ["LOVEMARK brand alignment","Premium positioning matches Allure standards."],
    ["HNI buyer profile match","Identical target customer confirmed."],
  ];
  vlist.forEach(([t,b],i) => {
    const vy = 1.72+i*0.72;
    s.addShape(pres.shapes.RECTANGLE, { x:6.2, y:vy, w:3.5, h:0.64, fill:{color:CHARCOAL}, line:{color:"333333", pt:0.5} });
    s.addShape(pres.shapes.RECTANGLE, { x:6.2, y:vy, w:0.07, h:0.64, fill:{color:GOLD}, line:{color:GOLD} });
    s.addText(t, { x:6.36, y:vy+0.06, w:3.22, h:0.24, fontSize:10.5, color:WHITE, bold:true, fontFace:"Calibri", margin:0 });
    s.addText(b, { x:6.36, y:vy+0.32, w:3.22, h:0.28, fontSize:9.5, color:MUTED, fontFace:"Calibri", margin:0 });
  });
  footer(s);
}

// ── SLIDE 9: PARTNERSHIP TERMS ──────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: DARK };
  s.addText("PARTNERSHIP STRUCTURE", { x:0.4, y:0.2, w:6, h:0.35, fontSize:9, color:GOLD, bold:true, charSpacing:4, fontFace:"Calibri", margin:0 });
  s.addText("Clear, fair, low-risk for EVOS", { x:0.4, y:0.55, w:9.2, h:0.6, fontSize:22, color:WHITE, bold:true, fontFace:"Georgia", margin:0 });
  s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:1.18, w:9.2, h:0.025, fill:{color:GOLD}, line:{color:GOLD} });

  const terms = [
    ["Preferred Interior Partner Status","Allure is EVOS's officially recommended interior design partner — referenced in all buyer documentation, site offices, and possession kits."],
    ["Referral Commission","1–2% of each completed interior project value — paid by Allure to EVOS on project completion. Buyer pays Allure directly. EVOS carries zero financial risk."],
    ["Design Studio at Sales Gallery","Allure sets up a branded design consultation studio at the EVOS Alchemy sales gallery — available to all prospective and existing buyers during site visits."],
    ["First Right of Refusal","Allure receives first consideration for all commercial, hospitality, and amenity zone interior projects as EVOS diversifies its portfolio."],
    ["Model Flat Pilot","Allure executes one model flat at Evos Alchemy before the partnership scales — subject to EVOS's quality evaluation and approval."],
    ["Term & Exclusivity","Initial term: 24 months renewable. Geographic exclusivity: Bhubaneswar and Puri projects. Annual KPI review."],
  ];

  terms.slice(0,3).forEach(([t,b],i) => {
    const ty = 1.38+i*1.22;
    s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:ty, w:4.6, h:1.1, fill:{color:CHARCOAL}, line:{color:"333333", pt:0.5} });
    s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:ty, w:4.6, h:0.06, fill:{color:GOLD}, line:{color:GOLD} });
    s.addText(`${i+1}.  ${t}`, { x:0.55, y:ty+0.1, w:4.3, h:0.3, fontSize:12, color:WHITE, bold:true, fontFace:"Calibri", margin:0 });
    s.addText(b, { x:0.55, y:ty+0.42, w:4.3, h:0.62, fontSize:10.5, color:CREAM, fontFace:"Calibri", margin:0, valign:"top" });
  });
  terms.slice(3).forEach(([t,b],i) => {
    const ty = 1.38+i*1.22;
    s.addShape(pres.shapes.RECTANGLE, { x:5.2, y:ty, w:4.5, h:1.1, fill:{color:CHARCOAL}, line:{color:"333333", pt:0.5} });
    s.addShape(pres.shapes.RECTANGLE, { x:5.2, y:ty, w:4.5, h:0.06, fill:{color:GOLD}, line:{color:GOLD} });
    s.addText(`${i+4}.  ${t}`, { x:5.35, y:ty+0.1, w:4.2, h:0.3, fontSize:12, color:WHITE, bold:true, fontFace:"Calibri", margin:0 });
    s.addText(b, { x:5.35, y:ty+0.42, w:4.2, h:0.62, fontSize:10.5, color:CREAM, fontFace:"Calibri", margin:0, valign:"top" });
  });
  footer(s);
}

// ── SLIDE 10: 90-DAY ACTION PLAN ────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: DARK };
  s.addText("ACTION PLAN", { x:0.4, y:0.2, w:6, h:0.35, fontSize:9, color:GOLD, bold:true, charSpacing:4, fontFace:"Calibri", margin:0 });
  s.addText("From proposal to preferred partner — 90 days", { x:0.4, y:0.55, w:9.2, h:0.6, fontSize:22, color:WHITE, bold:true, fontFace:"Georgia", margin:0 });
  s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:1.18, w:9.2, h:0.025, fill:{color:GOLD}, line:{color:GOLD} });

  const phases = [
    { phase:"PHASE 1", time:"Week 1–2", title:"Proposal & First Meeting", items:["Present this proposal to EVOS VP Sales","Site visit to Allure's completed projects","Initial MOU framework discussion"] },
    { phase:"PHASE 2", time:"Week 3–4", title:"Verification & Pilot Agreement", items:["EVOS completes due diligence on Allure","Client reference calls arranged","Pilot model flat scope agreed + MOU signed"] },
    { phase:"PHASE 3", time:"Month 2", title:"Model Flat Execution", items:["Allure executes Alchemy model flat","EVOS sales team briefed on packages","Design studio installed at sales gallery"] },
    { phase:"PHASE 4", time:"Month 3+", title:"Full Partnership Launch", items:["Co-branded packages listed in buyer docs","First buyer referrals begin flowing","Quarterly KPI review cadence established"] },
  ];
  const px = [0.4, 2.72, 5.04, 7.36];
  phases.forEach(({phase,time,title,items},i) => {
    s.addShape(pres.shapes.RECTANGLE, { x:px[i], y:1.35, w:2.24, h:3.75, fill:{color:CHARCOAL}, line:{color:"333333", pt:0.5} });
    s.addShape(pres.shapes.RECTANGLE, { x:px[i], y:1.35, w:2.24, h:0.58, fill:{color:GOLD}, line:{color:GOLD} });
    s.addText(phase, { x:px[i]+0.1, y:1.38, w:2.04, h:0.25, fontSize:9, color:DARK, bold:true, charSpacing:2, fontFace:"Calibri", margin:0 });
    s.addText(time, { x:px[i]+0.1, y:1.63, w:2.04, h:0.25, fontSize:11.5, color:DARK, bold:true, fontFace:"Georgia", margin:0 });
    s.addText(title, { x:px[i]+0.1, y:2.0, w:2.04, h:0.35, fontSize:11, color:WHITE, bold:true, fontFace:"Calibri", margin:0 });
    items.forEach((item,j) => {
      s.addShape(pres.shapes.RECTANGLE, { x:px[i]+0.12, y:2.46+j*0.52, w:0.07, h:0.07, fill:{color:GOLD}, line:{color:GOLD} });
      s.addText(item, { x:px[i]+0.26, y:2.42+j*0.52, w:1.88, h:0.46, fontSize:10, color:CREAM, fontFace:"Calibri", margin:0, valign:"top" });
    });
  });

  s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:5.2, w:9.2, h:0.14, fill:{color:MID}, line:{color:"444444", pt:0.5} });
  s.addText("Decision makers: Kalinga Keshari Rath (CMD)  ·  Srujanika Mishra (Head of Operations)  ·  VP Sales  ·  VP Projects", {
    x:0.5, y:5.22, w:9.0, h:0.1, fontSize:8.5, color:MUTED, fontFace:"Calibri", align:"center", margin:0
  });
  footer(s);
}

// ── SLIDE 11: CLOSING ───────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: DARK };

  s.addShape(pres.shapes.RECTANGLE, { x:6.5, y:0, w:3.5, h:5.625, fill:{color:GOLD}, line:{color:GOLD} });

  s.addText("THE VERDICT", { x:0.4, y:0.4, w:5.8, h:0.35, fontSize:9, color:GOLD, bold:true, charSpacing:4, fontFace:"Calibri", margin:0 });
  s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:0.82, w:5.8, h:0.025, fill:{color:GOLD}, line:{color:GOLD} });
  s.addText("EVOS Buildcon creates the most aspirational homes in Odisha.", { x:0.4, y:0.96, w:5.8, h:0.75, fontSize:20, color:WHITE, bold:true, fontFace:"Georgia", margin:0 });
  s.addText("Allure Interiors ensures those homes live up to that promise — from the day your buyers move in.", { x:0.4, y:1.76, w:5.8, h:0.8, fontSize:15, color:CREAM, fontFace:"Georgia", margin:0 });
  s.addText("Together, we don't just build structures.\nWe deliver Lovemarks — inside and out.", { x:0.4, y:2.65, w:5.8, h:0.8, fontSize:17, color:GOLD, bold:true, fontFace:"Georgia", margin:0 });
  s.addShape(pres.shapes.RECTANGLE, { x:0.4, y:3.6, w:5.8, h:0.025, fill:{color:"333333"}, line:{color:"333333"} });
  s.addText("Collaborate. Immediately.", { x:0.4, y:3.75, w:5.8, h:0.55, fontSize:22, color:WHITE, bold:true, fontFace:"Georgia", margin:0 });

  // Right panel
  s.addText("NEXT STEPS", { x:6.65, y:0.45, w:3.15, h:0.3, fontSize:9.5, color:DARK, bold:true, charSpacing:3, fontFace:"Calibri", margin:0 });
  const ns = ["Schedule a 30-min introductory meeting","Visit one completed Allure project together","Review proposal with CMD and leadership","Sign pilot MOU for Alchemy model flat","Launch Preferred Partner program"];
  ns.forEach((n,i) => {
    s.addShape(pres.shapes.RECTANGLE, { x:6.65, y:0.9+i*0.72, w:0.28, h:0.28, fill:{color:DARK}, line:{color:DARK} });
    s.addText(`${i+1}`, { x:6.65, y:0.9+i*0.72, w:0.28, h:0.28, fontSize:10, color:GOLD, bold:true, fontFace:"Calibri", align:"center", valign:"middle", margin:0 });
    s.addText(n, { x:7.0, y:0.93+i*0.72, w:2.8, h:0.38, fontSize:10.5, color:DARK, fontFace:"Calibri", margin:0, valign:"top" });
  });

  s.addShape(pres.shapes.RECTANGLE, { x:6.5, y:4.64, w:3.5, h:0.96, fill:{color:DARK}, line:{color:DARK} });
  s.addText("ALLURE INTERIORS", { x:6.65, y:4.7, w:3.2, h:0.28, fontSize:12, color:GOLD, bold:true, charSpacing:2, fontFace:"Calibri", margin:0 });
  s.addText("Brand Collaboration Desk  ·  March 2026", { x:6.65, y:4.98, w:3.2, h:0.24, fontSize:9.5, color:MUTED, fontFace:"Calibri", margin:0 });
  s.addText("Confidential & Exclusive", { x:6.65, y:5.22, w:3.2, h:0.22, fontSize:9, color:"555555", fontFace:"Calibri", margin:0 });
}

// ── WRITE ───────────────────────────────────────────────────────────────────
const outPath = "Allure_x_EVOS_Brand_Collaboration_Proposal.pptx";
pres.writeFile({ fileName: outPath }).then(() => {
  console.log("SUCCESS:", outPath);
}).catch(e => { console.error("Error:", e); });