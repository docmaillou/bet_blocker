// BetBlocker Background Service Worker

const GAMBLING_DOMAINS = [
  // Major International Sportsbooks & Casinos
  'bet365.com', 'betfair.com', 'pokerstars.com', 'draftkings.com',
  'fanduel.com', 'caesars.com', 'mgm.com', 'bovada.com',
  'betonline.com', 'ignition.com', 'slots.com', 'casino.com',
  'williamhill.com', 'ladbrokes.com', 'paddypower.com',
  'unibet.com', 'bwin.com', 'betway.com', 'sportingbet.com',
  'bet99.com', 'betmgm.com', '888casino.com', 'partypoker.com',
  'betrivers.com', 'pointsbet.com', 'barstoolsportsbook.com',
  'foxbet.com', 'tipico.com', 'wynnbet.com', 'betfred.com',
  'coral.co.uk', 'skybet.com', 'betvictor.com', 'marathon-bet.com',
  '1xbet.com', 'pinnacle.com', 'stake.com', 'rollbit.com',

  // US Sports Betting & Daily Fantasy
  'superdraft.com', 'underdog.com', 'prizepicks.com', 'sleeper.com',
  'betparx.com', 'twinspires.com', 'playsugarhouse.com', 'goldennuggetcasino.com',
  'hardrockbet.com', 'espnbet.com', 'fanatics.com', 'betanysports.com',
  'mybookie.ag', 'bookmaker.eu', 'heritage-sports.com', 'gtbets.eu',
  'intertops.eu', 'sportsbetting.ag', 'betonline.ag', 'xbet.ag',

  // European Gambling Sites
  'betsson.com', 'nordicbet.com', 'redbet.com', 'cherrycasino.com',
  'mrgreen.com', 'casumo.com', 'leovegas.com', 'rizk.com',
  'videoslots.com', 'bethard.com', 'dunder.com', 'thrills.com',
  'karamba.com', 'hopa.com', 'spinit.com', 'guts.com',
  'betsafe.com', 'betflag.it', 'sisal.it', 'lottomatica.it',
  'eurobet.it', 'snai.it', 'goldbet.it', 'planetwin365.it',

  // UK Gambling Sites
  'bet365.co.uk', 'betfair.co.uk', 'williamhill.co.uk', 'ladbrokes.co.uk',
  'paddypower.co.uk', 'coral.co.uk', 'skybet.co.uk', 'betvictor.co.uk',
  'betfred.co.uk', 'unibet.co.uk', 'betway.co.uk', '888sport.com',
  'virgin.com/virgin-bet', 'kwiff.com', 'betuk.com', 'spreadex.com',
  'boylesports.com', 'betbright.com', 'redzone.bet', 'gentingbet.com',

  // Canadian Gambling Sites
  'bet99.com', 'betway.ca', 'sports.bodog.eu', 'pinnacle.com',
  'betvictor.com', 'bet365.ca', 'unibet.ca', 'betfair.ca',
  'williamhill.ca', 'ladbrokes.ca', 'paddypower.ca', 'coral.ca',

  // Australian Gambling Sites
  'sportsbet.com.au', 'ladbrokes.com.au', 'neds.com.au', 'unibet.com.au',
  'bet365.com.au', 'williamhill.com.au', 'tab.com.au', 'pointsbet.com.au',
  'betfair.com.au', 'bluebet.com.au', 'topsport.com.au', 'betright.com.au',

  // Asian Gambling Sites
  'dafabet.com', 'w88.com', 'fun88.com', 'sbobet.com',
  '188bet.com', 'm88.com', '12bet.com', 'mansion88.com',
  'maxbet.com', 'ib888.com', 'cmd368.com', 'nova88.com',

  // Cryptocurrency Gambling Sites
  'stake.com', 'roobet.com', 'bitcasino.io', 'fortunejack.com',
  'cloudbet.com', 'nitrogen.eu', 'betcoin.ag', 'crypto-games.net',
  'primedice.com', 'bustabit.com', 'bitsler.com', 'wolf.bet',
  'rollbit.com', 'duelbits.com', 'bc.game', 'metaspins.com',

  // Online Casinos
  'jackpotcity.com', 'spinpalace.com', 'royalvegas.com', 'rubyfortune.com',
  'allslots.com', 'villento.com', 'crazyvegas.com', 'redflush.com',
  'platinumplay.com', 'casinoluck.com', 'eurogrand.com', 'intercasino.com',
  'partycasino.com', 'tropicana.net', 'borgataonline.com', 'playsugarhouse.com',

  // More Major Casinos
  'mohegansun.com', 'foxwoods.com', 'hardrock.com', 'atlanticcity.com',
  'caesarspalace.com', 'bellagio.com', 'aria.com', 'venetian.com',
  'wynn.com', 'encore.com', 'luxor.com', 'excalibur.com',
  'newyorknewyork.com', 'mandalayBay.com', 'mirage.com', 'treasureisland.com',

  // Poker Sites
  'pokerstars.net', 'pokerstars.eu', 'pokerstars.uk', 'pokerstars.it',
  'partypoker.net', 'partypoker.eu', 'partypoker.uk', 'partypoker.it',
  'ggpoker.com', 'ggpoker.co.uk', 'naturalpoker.com', 'betonlinepoker.com',
  'ignitionpoker.eu', 'americascardroom.eu', 'blackchippoker.eu', 'truepoker.eu',
  'tigergaming.com', 'sportsbettingpoker.com', 'juicyStakes.eu', 'intertops.eu',

  // Bingo Sites
  'bingo.com', 'tombola.co.uk', 'galabingo.com', 'meccabingo.com',
  'sunbingo.co.uk', 'paddypowerbingo.com', 'ladbrokesbingo.com', 'coral.co.uk/bingo',
  'betfredbingo.com', 'skybingo.com', 'virginbingo.com', 'bet365bingo.com',
  'williamhillbingo.com', 'unibetbingo.com', 'betwaybingo.com', 'betvictor.com/bingo',

  // Lottery & Scratch Cards
  'lottoland.com', 'thelotter.com', 'lotto247.com', 'multilotto.com',
  'lottosend.com', 'lottoagent.com', 'theLotter.com', 'wintrillions.com',
  'lotterymaster.com', 'lotto.eu', 'euromillions.com', 'powerball.com',
  'megamillions.com', 'scratchmania.com', 'karamba.com', 'primescratchcards.com',

  // Fantasy Sports
  'draftkings.com', 'fanduel.com', 'superdraft.com', 'underdog.com',
  'prizepicks.com', 'sleeper.com', 'yahoo.com/fantasy', 'espn.com/fantasy',
  'cbssports.com/fantasy', 'nfl.com/fantasy', 'fantasypros.com', 'rotowire.com',

  // Esports Betting
  'gg.bet', 'lootbet.com', 'rivalry.com', 'thunderpick.com',
  'arcanebet.com', 'egb.com', 'betway.com/esports', 'unikrn.com',
  'pinnacle.com/esports', 'bet365.com/esports', 'betfair.com/esports', '1xbet.com/esports',

  // Horse Racing
  'tvg.com', 'twinspires.com', 'xpressbet.com', 'nyra.com',
  'hpibet.com', 'rebaterebel.com', 'horseplayernow.com', 'watchandwager.com',
  'betamerica.com', 'derby.com', 'kentuckyderby.com', 'preakness.com',

  // International Gambling Sites
  'betsson.se', 'nordicbet.se', 'svenskaspel.se', 'atg.se',
  'veikkaus.fi', 'norsk-tipping.no', 'danske-spil.dk', 'opap.gr',
  'pmu.fr', 'fdj.fr', 'winamax.fr', 'pokerstars.fr',
  'bwin.de', 'tipico.de', 'bet-at-home.com', 'mybet.com',

  // More Crypto Gambling
  'bitstarz.com', 'mbitcasino.com', 'bitcoincasino.io', 'vegascasino.io',
  'kingbitcasino.com', 'bitslot.com', 'cryptowild.com', 'playamo.com',
  'bob-casino.com', 'oshi.io', 'winz.io', 'wazamba.com',

  // Mobile Gambling Apps (Web Versions)
  'betmgm.com', 'caesarssportsbook.com', 'fanduelcasino.com', 'draftkingscasino.com',
  'borgataonline.com', 'betrivers.com', 'sugarhouse.com', 'playgunlake.com',
  'windcreekonline.com', 'hollywoodcasino.com', 'harrahscasino.com', 'wsop.com',

  // Regional US Sites
  'betmgm.nj.com', 'caesars.com/nj', 'fanduel.com/nj', 'draftkings.com/nj',
  'betmgm.pa.com', 'caesars.com/pa', 'fanduel.com/pa', 'draftkings.com/pa',
  'betmgm.mi.com', 'caesars.com/mi', 'fanduel.com/mi', 'draftkings.com/mi',
  'betmgm.wv.com', 'caesars.com/wv', 'fanduel.com/wv', 'draftkings.com/wv',

  // More International Sites
  'betclic.com', 'betclic.fr', 'betclic.it', 'betclic.pl',
  'betsafe.com', 'betsafe.ee', 'betsafe.lv', 'betsafe.lt',
  'coolbet.com', 'coolbet.ee', 'coolbet.lv', 'coolbet.lt',
  'optibet.com', 'optibet.ee', 'optibet.lv', 'optibet.lt',

  // Additional Major Gambling Sites
  'betano.com', 'betano.pt', 'betano.ro', 'betano.bg',
  'stoiximan.gr', 'stoiximan.cy', 'novibet.com', 'novibet.gr',
  'pamestoixima.gr', 'betshop.gr', 'betclub.gr', 'goalbet.com',
  'sportingbet.gr', 'bwin.gr', 'betfair.gr', 'bet365.gr',

  // Latin American Sites
  'betsson.com.pe', 'inkabet.com', 'te-apuesto.com', 'doradobet.com',
  'betplay.com.co', 'wplay.co', 'rushbet.co', 'betfair.com.co',
  'codere.com.co', 'rivalo.com', 'betmotion.com', 'sportingbet.com.br',
  'bet365.com.br', 'betfair.com.br', 'betway.com.br', 'rivalo.com.br',

  // African Gambling Sites
  'betway.co.za', 'hollywoodbets.net', 'supabets.co.za', 'betxchange.co.za',
  'sportingbet.co.za', 'bet.co.za', 'gbets.co.za', 'playabets.co.za',
  'betway.com.ng', 'bet9ja.com', 'nairabet.com', 'merrybet.com',
  'sportybet.com', 'betking.com', 'betbonanza.com', '1xbet.ng',

  // Middle Eastern Sites
  'betfair.com.au', 'sportsbet.com.au', 'ladbrokes.com.au', 'tab.com.au',
  'unibet.com.au', 'bet365.com.au', 'williamhill.com.au', 'pointsbet.com.au',
  'neds.com.au', 'bluebet.com.au', 'topsport.com.au', 'betright.com.au',

  // More Poker Sites
  'acr.eu', 'blackchippoker.eu', 'truepoker.eu', 'juicystakes.eu',
  'tigergaming.com', 'sportsbettingpoker.com', 'betonlinepoker.com', 'ignitionpoker.eu',
  'americas-cardroom.eu', 'winning-poker-network.com', 'chico-network.com', 'ipoker.com',

  // Casino Affiliates & Reviews (Often lead to gambling)
  'casino.org', 'casinomeister.com', 'askgamblers.com', 'casinoguru.com',
  'latestcasinobonuses.com', 'casinolistings.com', 'onlinecasinoreviews.com', 'casinosmash.com',
  'newcasinos.org', 'casinobonusca.com', 'casinobonus.net', 'freespins.com',

  // Slot Sites
  'slotomania.com', 'caesarsgames.com', 'doubledowncasino.com', 'gsncasino.com',
  'jackpotparty.com', 'heartofvegas.com', 'quickhitslots.com', 'hotshot-casino.com',
  'cashman-casino.com', 'lightning-link.com', 'house-of-fun.com', 'scatter-slots.com',

  // More Bingo Sites
  'bingocams.co.uk', 'bingoballroom.co.uk', 'bingofest.co.uk', 'bingogodz.co.uk',
  'bingohall.co.uk', 'bingohouse.co.uk', 'bingokitty.co.uk', 'bingoliner.co.uk',
  'bingomagix.co.uk', 'bingomania.co.uk', 'bingomega.co.uk', 'bingostreet.co.uk',

  // Scratch Card Sites
  'scratchcards.com', 'scratchmania.com', 'primescratchcards.com', 'scratchgames.com',
  'instantwin.com', 'scratchcardplanet.com', 'scratchcardheaven.com', 'luckyads.com',
  'karamba.com', 'scratch2cash.com', 'scratchfun.co.uk', 'instantgames.com',

  // Daily Fantasy Sports
  'monkey-knife-fight.com', 'draftkings.com/dfs', 'fanduel.com/dfs', 'superdraft.com/dfs',
  'underdog.com/pick-em', 'prizepicks.com/pickem', 'sleeper.com/pick-em', 'betr.com',

  // More Crypto Sites
  'fortunejack.com', 'bitcasino.io', 'sportsbet.io', 'cloudbet.com',
  'nitrogen.eu', 'betcoin.ag', 'crypto-games.net', 'primedice.com',
  'bustabit.com', 'bitsler.com', 'wolf.bet', 'bc.game',

  // Skill Gaming (Often gambling-adjacent)
  'worldwinner.com', 'gamesville.com', 'king.com/games', 'skillz.com',
  'pocket7games.com', 'solitairecash.com', 'blitzwin.com', 'mistplay.com',

  // More Regional Sites
  'betflag.it', 'sisal.it', 'lottomatica.it', 'eurobet.it',
  'snai.it', 'goldbet.it', 'planetwin365.it', 'betclic.it',
  'betsson.it', 'williamhill.it', 'bet365.it', 'betfair.it',

  // German Sites
  'tipico.de', 'bwin.de', 'bet-at-home.de', 'mybet.com',
  'betway.de', 'bet365.de', 'betfair.de', 'unibet.de',
  'betsson.de', 'betvictor.de', 'ladbrokes.de', 'williamhill.de',

  // French Sites
  'pmu.fr', 'fdj.fr', 'winamax.fr', 'pokerstars.fr',
  'partypoker.fr', 'betclic.fr', 'unibet.fr', 'netbet.fr',
  'zebet.fr', 'vbet.fr', 'betway.fr', 'bet365.fr',

  // Spanish Sites
  'bet365.es', 'betfair.es', 'betway.es', 'bwin.es',
  'pokerstars.es', 'partypoker.es', 'betsson.es', 'codere.es',
  'marca-apuestas.es', 'sportium.es', 'luckia.es', 'paston.es',

  // More European Sites
  'betsson.com', 'nordicbet.com', 'redbet.com', 'cherrycasino.com',
  'mrgreen.com', 'casumo.com', 'leovegas.com', 'rizk.com',
  'videoslots.com', 'bethard.com', 'dunder.com', 'thrills.com',
  'karamba.com', 'hopa.com', 'spinit.com', 'guts.com',

  // Netherlands Sites
  'unibet.nl', 'bet365.nl', 'betway.nl', 'bwin.nl',
  'betfair.nl', 'betsson.nl', 'betvictor.nl', 'ladbrokes.nl',
  'williamhill.nl', 'pokerstars.nl', 'partypoker.nl', 'holland-casino.nl',

  // Belgian Sites
  'unibet.be', 'bet365.be', 'betway.be', 'bwin.be',
  'betfair.be', 'betsson.be', 'betvictor.be', 'ladbrokes.be',
  'williamhill.be', 'pokerstars.be', 'partypoker.be', 'circus.be',

  // Swiss Sites
  'swisslos.ch', 'loterie-romande.ch', 'mycasino.ch', 'jackpots.ch',
  'casino-davos.ch', 'casino-interlaken.ch', 'casino-pfaeffikon.ch', 'grand-casino-bern.ch',

  // Austrian Sites
  'bet365.at', 'betway.at', 'bwin.at', 'betfair.at',
  'betsson.at', 'betvictor.at', 'ladbrokes.at', 'williamhill.at',
  'pokerstars.at', 'partypoker.at', 'win2day.at', 'casinos.at',

  // Portuguese Sites
  'bet365.pt', 'betway.pt', 'bwin.pt', 'betfair.pt',
  'betsson.pt', 'betvictor.pt', 'ladbrokes.pt', 'williamhill.pt',
  'pokerstars.pt', 'partypoker.pt', 'betano.pt', 'betclic.pt',

  // Polish Sites
  'bet365.pl', 'betway.pl', 'bwin.pl', 'betfair.pl',
  'betsson.pl', 'betvictor.pl', 'ladbrokes.pl', 'williamhill.pl',
  'pokerstars.pl', 'partypoker.pl', 'betclic.pl', 'fortuna.pl',

  // Czech Sites
  'bet365.cz', 'betway.cz', 'bwin.cz', 'betfair.cz',
  'betsson.cz', 'betvictor.cz', 'ladbrokes.cz', 'williamhill.cz',
  'pokerstars.cz', 'partypoker.cz', 'fortuna.cz', 'tipsport.cz',

  // Scandinavian Sites
  'bet365.se', 'betway.se', 'bwin.se', 'betfair.se',
  'betsson.se', 'betvictor.se', 'ladbrokes.se', 'williamhill.se',
  'pokerstars.se', 'partypoker.se', 'svenskaspel.se', 'atg.se',

  // Norwegian Sites
  'bet365.no', 'betway.no', 'bwin.no', 'betfair.no',
  'betsson.no', 'betvictor.no', 'ladbrokes.no', 'williamhill.no',
  'pokerstars.no', 'partypoker.no', 'norsk-tipping.no', 'rikstoto.no',

  // Danish Sites
  'bet365.dk', 'betway.dk', 'bwin.dk', 'betfair.dk',
  'betsson.dk', 'betvictor.dk', 'ladbrokes.dk', 'williamhill.dk',
  'pokerstars.dk', 'partypoker.dk', 'danske-spil.dk', 'danskespil.dk',

  // Finnish Sites
  'bet365.fi', 'betway.fi', 'bwin.fi', 'betfair.fi',
  'betsson.fi', 'betvictor.fi', 'ladbrokes.fi', 'williamhill.fi',
  'pokerstars.fi', 'partypoker.fi', 'veikkaus.fi', 'fintoto.fi',

  // Russian Sites
  '1xbet.ru', 'parimatch.ru', 'fonbet.ru', 'leon.ru',
  'betcity.ru', 'olimp.ru', 'winline.ru', 'ligastavok.ru',
  'marathonbet.ru', 'bk-liga-stavok.ru', 'tennisi.ru', 'betring.ru',

  // More Asian Sites
  'bet365.com.au', 'sportsbet.com.au', 'ladbrokes.com.au', 'tab.com.au',
  'unibet.com.au', 'pointsbet.com.au', 'neds.com.au', 'bluebet.com.au',
  'topsport.com.au', 'betright.com.au', 'betstar.com.au', 'betfair.com.au',

  // Indian Sites
  'betway.com.in', 'bet365.com.in', '10cric.com', 'betfair.com.in',
  'dafabet.com.in', 'parimatch.in', '1xbet.in', 'casumo.com.in',
  'leovegas.com.in', 'royal-panda.com.in', 'pure-win.com', 'jeetwin.com',

  // More Crypto Gambling
  'duelbits.com', 'metaspins.com', 'bc.game', 'rollbit.com',
  'roobet.com', 'stake.com', 'bitcasino.io', 'sportsbet.io',
  'fortunejack.com', 'cloudbet.com', 'nitrogen.eu', 'betcoin.ag',

  // Esports Betting Sites
  'gg.bet', 'lootbet.com', 'rivalry.com', 'thunderpick.com',
  'arcanebet.com', 'egb.com', 'betway.com/esports', 'unikrn.com',
  'pinnacle.com/esports', 'bet365.com/esports', 'betfair.com/esports', '1xbet.com/esports',

  // More Fantasy Sports
  'draftkings.com', 'fanduel.com', 'superdraft.com', 'underdog.com',
  'prizepicks.com', 'sleeper.com', 'monkey-knife-fight.com', 'betr.com',
  'yahoo.com/fantasy', 'espn.com/fantasy', 'cbssports.com/fantasy', 'nfl.com/fantasy',

  // Lottery Sites
  'lottoland.com', 'thelotter.com', 'lotto247.com', 'multilotto.com',
  'lottosend.com', 'lottoagent.com', 'wintrillions.com', 'lotterymaster.com',
  'lotto.eu', 'euromillions.com', 'powerball.com', 'megamillions.com',

  // More Skill Gaming
  'worldwinner.com', 'gamesville.com', 'skillz.com', 'pocket7games.com',
  'solitairecash.com', 'blitzwin.com', 'mistplay.com', 'swagbucks.com/games',
  'inboxdollars.com/games', 'myvegas.com', 'lucktastic.com', 'long-game.com'
];

const GAMBLING_KEYWORDS = [
  'casino', 'poker', 'betting', 'sportsbook', 'slots',
  'blackjack', 'roulette', 'baccarat', 'craps', 'lottery'
];

// Initialize extension
chrome.runtime.onInstalled.addListener(async () => {
  // Set default settings
  await chrome.storage.local.set({
    isEnabled: true,
    blockedCount: 0,
    installDate: Date.now(),
    lastBlockedSite: null,
    coolingOffPeriod: 24, // hours
    trustedContact: null,
    customBlockedSites: [],
    streakStartDate: Date.now(),
    motivationalMessage: "Stay strong! You're building a healthier future."
  });

  // Update dynamic rules
  await updateBlockingRules();
});

// Update blocking rules
async function updateBlockingRules() {
  const { isEnabled, customBlockedSites } = await chrome.storage.local.get(['isEnabled', 'customBlockedSites']);

  if (!isEnabled) {
    console.log('GambleGuard: Protection is disabled, clearing rules');
    // Clear all dynamic rules when disabled
    const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
    const ruleIds = existingRules.map(rule => rule.id);
    if (ruleIds.length > 0) {
      await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: ruleIds
      });
    }
    return;
  }

  const allDomains = [...GAMBLING_DOMAINS, ...(customBlockedSites || [])];
  console.log('GambleGuard: Updating blocking rules for domains:', allDomains);

  // Create rules for both www and non-www versions of each domain
  const rules = [];
  let ruleId = 1;

  for (const domain of allDomains) {
    // Skip domains with non-ASCII characters to avoid Chrome extension errors
    if (!/^[a-zA-Z0-9.-]+$/.test(domain)) {
      console.log('GambleGuard: Skipping domain with non-ASCII characters:', domain);
      continue;
    }

    try {
      // Rule for exact domain (e.g., bet99.com)
      rules.push({
        id: ruleId++,
        priority: 1,
        action: {
          type: "redirect",
          redirect: {
            extensionPath: "/block.html"
          }
        },
        condition: {
          urlFilter: `*://${domain}/*`,
          resourceTypes: ["main_frame"]
        }
      });

      // Rule for www subdomain (e.g., www.bet99.com)
      rules.push({
        id: ruleId++,
        priority: 1,
        action: {
          type: "redirect",
          redirect: {
            extensionPath: "/block.html"
          }
        },
        condition: {
          urlFilter: `*://www.${domain}/*`,
          resourceTypes: ["main_frame"]
        }
      });

      // Rule for any subdomain (e.g., mobile.bet99.com)
      rules.push({
        id: ruleId++,
        priority: 1,
        action: {
          type: "redirect",
          redirect: {
            extensionPath: "/block.html"
          }
        },
        condition: {
          urlFilter: `*://*.${domain}/*`,
          resourceTypes: ["main_frame"]
        }
      });
    } catch (error) {
      console.error('GambleGuard: Error creating rule for domain:', domain, error);
    }
  }

  // Clear existing rules and add new ones
  try {
    const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
    const existingRuleIds = existingRules.map(rule => rule.id);

    console.log('GambleGuard: Removing', existingRuleIds.length, 'existing rules');
    console.log('GambleGuard: Adding', rules.length, 'new rules');

    // Chrome has a limit on the number of dynamic rules (usually 5000)
    // Split rules into batches if needed
    const MAX_RULES_PER_BATCH = 1000;
    const ruleBatches = [];
    for (let i = 0; i < rules.length; i += MAX_RULES_PER_BATCH) {
      ruleBatches.push(rules.slice(i, i + MAX_RULES_PER_BATCH));
    }

    // Remove existing rules first
    if (existingRuleIds.length > 0) {
      await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: existingRuleIds
      });
    }

    // Add new rules in batches
    for (const batch of ruleBatches) {
      await chrome.declarativeNetRequest.updateDynamicRules({
        addRules: batch
      });
    }

    console.log('GambleGuard: Blocking rules updated successfully');
  } catch (error) {
    console.error('GambleGuard: Error updating blocking rules:', error);
    // Try to add rules without batching as fallback
    try {
      await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: existingRuleIds,
        addRules: rules.slice(0, 1000) // Limit to first 1000 rules
      });
      console.log('GambleGuard: Fallback rule update successful (limited to 1000 rules)');
    } catch (fallbackError) {
      console.error('GambleGuard: Fallback rule update also failed:', fallbackError);
    }
  }
}

// Check if URL is gambling-related
function isGamblingUrl(url) {
  try {
    const domain = new URL(url).hostname.toLowerCase();
    console.log('BetBlocker: Checking domain:', domain);

    // Check exact domain matches
    const matchedDomain = GAMBLING_DOMAINS.find(d => domain === d || domain === `www.${d}` || domain.endsWith(`.${d}`));
    if (matchedDomain) {
      console.log('BetBlocker: Domain matched:', matchedDomain);
      return true;
    }

    // Check keyword matches
    const matchedKeyword = GAMBLING_KEYWORDS.find(keyword => domain.includes(keyword));
    if (matchedKeyword) {
      console.log('BetBlocker: Keyword matched:', matchedKeyword);
      return true;
    }

    return false;
  } catch (error) {
    console.error('BetBlocker: Error checking URL:', url, error);
    return false;
  }
}

// Handle tab updates
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading' && tab.url) {
    try {
      const { isEnabled } = await chrome.storage.local.get(['isEnabled']);
      console.log('BetBlocker: Tab loading:', tab.url, 'Protection enabled:', isEnabled);

      if (isEnabled && isGamblingUrl(tab.url)) {
        console.log('BetBlocker: Blocking gambling site:', tab.url);
        await recordBlockedAttempt(tab.url);
        chrome.tabs.update(tabId, { url: chrome.runtime.getURL('block.html') });
      }
    } catch (error) {
      console.error('BetBlocker: Error in tab update listener:', error);
    }
  }
});

// Record blocked attempt
async function recordBlockedAttempt(url) {
  const { blockedCount, lastBlockDate } = await chrome.storage.local.get(['blockedCount', 'lastBlockDate']);
  const today = new Date().toDateString();

  // Reset count if it's a new day
  const todayCount = (lastBlockDate === today) ? (blockedCount || 0) + 1 : 1;

  await chrome.storage.local.set({
    blockedCount: todayCount,
    lastBlockDate: today,
    lastBlockedSite: new URL(url).hostname,
    lastBlockTime: Date.now()
  });
}

// Handle messages from popup and content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case 'getStats':
      getStats().then(sendResponse);
      return true;

    case 'updateSettings':
      updateSettings(request.settings).then(sendResponse);
      return true;

    case 'addCustomSite':
      addCustomSite(request.site).then(sendResponse);
      return true;

    case 'removeCustomSite':
      removeCustomSite(request.site).then(sendResponse);
      return true;
  }
});

// Get statistics
async function getStats() {
  const data = await chrome.storage.local.get([
    'blockedCount', 'lastBlockDate', 'installDate', 'lastBlockedSite',
    'lastBlockTime', 'streakStartDate', 'customBlockedSites'
  ]);

  // Reset blocked count if it's a new day
  const today = new Date().toDateString();
  if (data.lastBlockDate !== today) {
    await chrome.storage.local.set({ blockedCount: 0, lastBlockDate: today });
    data.blockedCount = 0;
  }

  const daysSinceInstall = Math.floor((Date.now() - data.installDate) / (1000 * 60 * 60 * 24));
  const streakDays = Math.floor((Date.now() - data.streakStartDate) / (1000 * 60 * 60 * 24));

  return {
    ...data,
    daysSinceInstall,
    streakDays,
    customBlockedSites: data.customBlockedSites || []
  };
}

// Update settings
async function updateSettings(settings) {
  await chrome.storage.local.set(settings);
  if ('isEnabled' in settings) {
    await updateBlockingRules();
  }
  return { success: true };
}

// Add custom site to block list
async function addCustomSite(site) {
  try {
    console.log('GambleGuard: Adding custom site:', site);
    const { customBlockedSites } = await chrome.storage.local.get(['customBlockedSites']);
    const sites = customBlockedSites || [];

    if (!sites.includes(site)) {
      sites.push(site);
      await chrome.storage.local.set({ customBlockedSites: sites });
      console.log('GambleGuard: Custom sites updated:', sites);
      await updateBlockingRules();
    } else {
      console.log('GambleGuard: Site already in block list:', site);
    }

    return { success: true, sites };
  } catch (error) {
    console.error('GambleGuard: Error adding custom site:', error);
    return { success: false, error: error.message };
  }
}

// Remove custom site from block list
async function removeCustomSite(site) {
  const { customBlockedSites } = await chrome.storage.local.get(['customBlockedSites']);
  const sites = (customBlockedSites || []).filter(s => s !== site);

  await chrome.storage.local.set({ customBlockedSites: sites });
  await updateBlockingRules();

  return { success: true, sites };
}