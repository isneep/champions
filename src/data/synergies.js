import { CHAMPION } from './model/Champion';
import { EFFECT } from './model/Effect';
import { EFFECT_STARS_AMOUNT, EFFECT_STARS_INDEX } from './effects';
import Synergy from './model/Synergy';

function arrayRange(min, max) {
    const array = [];
    for(let i = min; i <= max; i++) {
        array.push(i);
    }
    return array;
}

function fromId(fromId, synergies) {
    return synergies.map((synergy) => ({
        ...synergy,
        fromId,
    }));
}

let toIdsCounter = 0;
function toIds(toIds, synergy) {
    const isGrouped = toIds.length > 1;
    if (isGrouped) {
        toIdsCounter++;
    }
    return toIds.map((toId) => ({
        ...(isGrouped) ? { group: `group-${ toIdsCounter }` } : {},
        ...synergy,
        toId,
    }));
}

function fromStars(minStars, maxStars, toIdList, effectId) {
    const fromStarsRange = arrayRange(minStars, maxStars);
    const synergies = [];
    fromStarsRange
        .map((fromStars) => ({
            fromStars,
            effectId,
        }))
        .forEach((synergy) => {
            synergies.push(...toIds(toIdList, synergy));
        });
    return synergies;
}

const synergies = [

    ...fromId(CHAMPION.ANGELA, [
        ...fromStars(3, 5, [ CHAMPION.ROCKET, CHAMPION.STARLORD ], EFFECT.ARMOR),
        ...fromStars(3, 5, [ CHAMPION.GAMORA, CHAMPION.GROOT ], EFFECT.ARMOR),
        ...fromStars(4, 5, [ CHAMPION.THOR ], EFFECT.HEALTH),
        ...fromStars(4, 5, [ CHAMPION.LOKI ], EFFECT.HEALTH),
    ]),

    ...fromId(CHAMPION.BLACKBOLT, [
        ...fromStars(2, 4, [ CHAMPION.KAMALAKHAN, CHAMPION.RONAN ], EFFECT.COSMIC_SUPREMACY),
        ...fromStars(2, 4, [ CHAMPION.SPIDERMAN, CHAMPION.CYCLOPS ], EFFECT.ARMOR),
        ...fromStars(3, 4, [ CHAMPION.KANG ], EFFECT.ATTACK),
        ...fromStars(3, 4, [ CHAMPION.HULK ], EFFECT.CRITICAL_DAMAGE),
        ...fromStars(2, 5, [ CHAMPION.KARNAK, CHAMPION.MEDUSA ], EFFECT.HEALTH),
    ]),

    ...fromId(CHAMPION.CAPTAINMARVEL, [
        ...fromStars(3, 5, [ CHAMPION.CAPTAINAMERICA ], EFFECT.ARMOR),
        ...fromStars(3, 5, [ CHAMPION.GAMORA ], EFFECT.ARMOR),
        ...fromStars(3, 5, [ CHAMPION.IRONMAN ], EFFECT.ARMOR),
        ...fromStars(4, 5, [ CHAMPION.WOLVERINE ], EFFECT.POWER_GAIN),
    ]),

    ...fromId(CHAMPION.CARNAGE, [
        ...fromStars(3, 5, [ CHAMPION.VENOM ], EFFECT.SHARED_GENETIC_MEMORY),
        ...fromStars(3, 5, [ CHAMPION.DEADPOOL, CHAMPION.DEADPOOLXFORCE ], EFFECT.CRITICAL_RATE),
        ...fromStars(4, 5, [ CHAMPION.SPIDERMAN ], EFFECT.ATTACK),
        ...fromStars(4, 5, [ CHAMPION.SPIDERMANBLACK, CHAMPION.AGENTVENOM, CHAMPION.VENOMPOOL ], EFFECT.HEALTH),
    ]),

    ...fromId(CHAMPION.DRAX, [
        ...fromStars(4, 5, [ CHAMPION.RONAN ], EFFECT.CRITICAL_RATE),
        ...fromStars(2, 5, [ CHAMPION.STARLORD ], EFFECT.PERFECT_BLOCK),
        ...fromStars(2, 5, [ CHAMPION.GAMORA ], EFFECT.CRITICAL_DAMAGE),
        ...fromStars(3, 4, [ CHAMPION.AGENTVENOM ], EFFECT.PERFECT_BLOCK),
    ]),

    ...fromId(CHAMPION.GAMORA, [
        ...fromStars(2, 4, [ CHAMPION.STARLORD ], EFFECT.ARMOR),
        ...fromStars(3, 4, [ CHAMPION.DRAX ], EFFECT.CRITICAL_DAMAGE),
        ...fromStars(3, 4, [ CHAMPION.AGENTVENOM ], EFFECT.PERFECT_BLOCK),
        ...fromStars(4, 4, [ CHAMPION.SHEHULK ], EFFECT.ARMOR),
    ]),

    ...fromId(CHAMPION.GROOT, [
        ...fromStars(2, 5, [ CHAMPION.STARLORD ], EFFECT.ARMOR),
        ...fromStars(2, 5, [ CHAMPION.ROCKET ], EFFECT.INSEPARABLE),
        ...fromStars(3, 5, [ CHAMPION.DRAX ], EFFECT.PERFECT_BLOCK),
        ...fromStars(4, 5, [ CHAMPION.GAMORA ], EFFECT.PERFECT_BLOCK),
    ]),

    ...fromId(CHAMPION.GROOTKING, [
        ...fromStars(3, 5, [ CHAMPION.ABOMINATION ], EFFECT.ARMOR),
        ...fromStars(3, 5, [ CHAMPION.GROOT ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 5, [ CHAMPION.HULK ], EFFECT.CRITICAL_RATE),
        ...fromStars(4, 5, [ CHAMPION.VENOM ], EFFECT.ARMOR),
    ]),

    ...fromId(CHAMPION.HELA, [
        ...fromStars(4, 5, [ CHAMPION.THORRAGNAROK, CHAMPION.LOKI ], EFFECT.IMMORTAL_SOULS),
        ...fromStars(3, 5, [ CHAMPION.ANGELA ], EFFECT.QUEEN_OF_HEL),
        ...fromStars(3, 5, [ CHAMPION.DORMAMMU, CHAMPION.MEPHISTO ], EFFECT.HELL_LORDS),
    ]),

    ...fromId(CHAMPION.HYPERION, [
        ...fromStars(3, 5, [ CHAMPION.THOR ], EFFECT.ARMOR),
        ...fromStars(3, 5, [ CHAMPION.IRONMAN ], EFFECT.CRITICAL_RATE),
        ...fromStars(4, 5, [ CHAMPION.DRSTRANGE ], EFFECT.CRITICAL_RATE),
    ]),

    ...fromId(CHAMPION.KAMALAKHAN, [
        ...fromStars(3, 5, [ CHAMPION.CAPTAINMARVEL ], EFFECT.IDOL),
        ...fromStars(3, 5, [ CHAMPION.MSMARVEL ], EFFECT.IDOL),
        ...fromStars(3, 5, [ CHAMPION.SPIDERMANMORALES, CHAMPION.THORJANEFOSTER ], EFFECT.PERFECT_BLOCK),
        ...fromStars(4, 5, [ CHAMPION.VISION ], EFFECT.PERFECT_BLOCK),
    ]),

    ...fromId(CHAMPION.MEDUSA, [
        ...fromStars(3, 5, [ CHAMPION.WOLVERINE, CHAMPION.IRONMAN ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 5, [ CHAMPION.QUAKE ], EFFECT.CRITICAL_DAMAGE),
    ]),

    ...fromId(CHAMPION.MSMARVEL, [
        ...fromStars(3, 4, [ CHAMPION.CAPTAINAMERICA ], EFFECT.ARMOR),
        ...fromStars(3, 4, [ CHAMPION.IRONMAN ], EFFECT.PERFECT_BLOCK),
        ...fromStars(3, 4, [ CHAMPION.THOR, CHAMPION.THORJANEFOSTER ], EFFECT.PERFECT_BLOCK),
        ...fromStars(3, 4, [ CHAMPION.HULK ], EFFECT.PERFECT_BLOCK),
    ]),

    ...fromId(CHAMPION.PHOENIX, [
        ...fromStars(3, 5, [ CHAMPION.STORM ], EFFECT.ARMOR),
        ...fromStars(3, 5, [ CHAMPION.CYCLOPS90S, CHAMPION.WOLVERINE ], EFFECT.ITS_COMPLICATED),
        ...fromStars(4, 5, [ CHAMPION.BEAST, CHAMPION.NIGHTCRAWLER ], EFFECT.PERFECT_BLOCK),
        ...fromStars(4, 5, [ CHAMPION.GAMORA ], EFFECT.PERFECT_BLOCK),
    ]),

    ...fromId(CHAMPION.RONAN, [
        ...fromStars(2, 5, [ CHAMPION.BLACKBOLT ], EFFECT.CRITICAL_DAMAGE),
        ...fromStars(3, 5, [ CHAMPION.IRONMAN ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 5, [ CHAMPION.GAMORA ], EFFECT.CRITICAL_DAMAGE),
        ...fromStars(4, 5, [ CHAMPION.HULK ], EFFECT.CRITICAL_RATE),
    ]),

    ...fromId(CHAMPION.SPIDERMANBLACK, [
        ...fromStars(2, 4, [ CHAMPION.STORM ], EFFECT.ARMOR),
        ...fromStars(2, 4, [ CHAMPION.ELECTRO ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 4, [ CHAMPION.AGENTVENOM ], EFFECT.HEALTH),
    ]),

    ...fromId(CHAMPION.SUPERIORIRONMAN, [
        ...fromStars(2, 5, [ CHAMPION.CAPTAINAMERICA ], EFFECT.CRITICAL_RATE),
        ...fromStars(2, 5, [ CHAMPION.DAREDEVIL ], EFFECT.CRITICAL_DAMAGE),
        ...fromStars(2, 5, [ CHAMPION.THOR ], EFFECT.PERFECT_BLOCK),
    ]),

    ...fromId(CHAMPION.THANOS, [
        ...fromStars(4, 4, [ CHAMPION.STARLORD, CHAMPION.HULK ], EFFECT.CRITICAL_RATE),
        ...fromStars(4, 4, [ CHAMPION.DEADPOOL, CHAMPION.DEADPOOLXFORCE ], EFFECT.ATTACK),
        ...fromStars(4, 4, [ CHAMPION.GAMORA ], EFFECT.HEALTH),
    ]),

    ...fromId(CHAMPION.THOR, [
        ...fromStars(2, 4, [ CHAMPION.DRSTRANGE ], EFFECT.ARMOR),
        ...fromStars(2, 4, [ CHAMPION.IRONMAN ], EFFECT.ARMOR),
        ...fromStars(3, 4, [ CHAMPION.JUGGERNAUT ], EFFECT.CRITICAL_RATE),
    ]),

    ...fromId(CHAMPION.VENOM, [
        ...fromStars(2, 5, [ CHAMPION.SPIDERMAN ], EFFECT.ATTACK),
        ...fromStars(3, 5, [ CHAMPION.SPIDERMANBLACK ], EFFECT.HEALTH),
        ...fromStars(3, 5, [ CHAMPION.ELECTRO ], EFFECT.CRITICAL_DAMAGE),
        ...fromStars(4, 5, [ CHAMPION.JOEFIXIT ], EFFECT.PERFECT_BLOCK),
    ]),

    ...fromId(CHAMPION.VENOMPOOL, [
        ...fromStars(3, 5, [ CHAMPION.SPIDERMANBLACK, CHAMPION.AGENTVENOM ], EFFECT.HEALTH),
        ...fromStars(2, 5, [ CHAMPION.VENOM ], EFFECT.INSEPARABLE),
        ...fromStars(3, 5, [ CHAMPION.DEADPOOL ], EFFECT.ARMOR),
        ...fromStars(4, 5, [ CHAMPION.DEADPOOLXFORCE ], EFFECT.ARMOR),
    ]),

    ...fromId(CHAMPION.CIVILWARRIOR, [
        ...fromStars(3, 5, [ CHAMPION.WINTERSOLDIER ], EFFECT.ARMOR),
        ...fromStars(3, 5, [ CHAMPION.FALCON ], EFFECT.ARMOR),
        ...fromStars(3, 5, [ CHAMPION.GUILLOTINE ], EFFECT.PERFECT_BLOCK),
        ...fromStars(4, 5, [ CHAMPION.IRONMAN, CHAMPION.HULKBUSTER ], EFFECT.CRITICAL_DAMAGE),
    ]),

    ...fromId(CHAMPION.DROCTOPUS, [
        ...fromStars(3, 5, [ CHAMPION.ELECTRO ], EFFECT.PARTICLE_PHYSICS),
        ...fromStars(3, 5, [ CHAMPION.ANTMAN ], EFFECT.BIOCHEMISTRY),
        ...fromStars(4, 5, [ CHAMPION.VULTURE ], EFFECT.ENGINEERING),
        ...fromStars(4, 5, [ CHAMPION.SPIDERMANSTARK ], EFFECT.ATTACK),
    ]),

    ...fromId(CHAMPION.GREENGOBLIN, [
        ...fromStars(3, 5, [ CHAMPION.SPIDERMANBLACK, CHAMPION.SPIDERMAN, CHAMPION.SPIDERMANSTARK, CHAMPION.SPIDERMANMORALES ], EFFECT.SEETHING_HATRED),
        ...fromStars(3, 5, [ CHAMPION.IRONPATRIOT ], EFFECT.SPLIT_PERSONALITY),
        ...fromStars(4, 5, [ CHAMPION.ELECTRO ], EFFECT.ELECTRIC_SUPERCHARGE),
    ]),

    ...fromId(CHAMPION.HOWARDTHEDUCK, [
        ...fromStars(3, 5, [ CHAMPION.SHEHULK ], EFFECT.ARMOR),
        ...fromStars(3, 5, [ CHAMPION.ROCKET ], EFFECT.ARMOR),
        ...fromStars(4, 5, [ CHAMPION.KAMALAKHAN ], EFFECT.PERFECT_BLOCK),
    ]),

    ...fromId(CHAMPION.IRONMAN, [
        ...fromStars(2, 5, [ CHAMPION.THOR, CHAMPION.WARMACHINE ], EFFECT.PERFECT_BLOCK),
        ...fromStars(3, 5, [ CHAMPION.ULTRON ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 5, [ CHAMPION.CAPTAINAMERICA ], EFFECT.ARMOR),
        ...fromStars(4, 5, [ CHAMPION.THORJANEFOSTER ], EFFECT.PERFECT_BLOCK),
    ]),

    ...fromId(CHAMPION.IRONMANIW, [
        ...fromStars(3, 5, [ CHAMPION.VISION, CHAMPION.THEVISION ], EFFECT.ESOTERIC_INSIGHT),
        ...fromStars(3, 5, [ CHAMPION.IRONMAN, CHAMPION.WARMACHINE, CHAMPION.HULKBUSTER, CHAMPION.SUPERIORIRONMAN, CHAMPION.IRONPATRIOT, CHAMPION.CIVILWARRIOR ], EFFECT.AI_UPGRADE),
        ...fromStars(3, 5, [ CHAMPION.CAPTAINAMERICA, CHAMPION.CAPTAINAMERICAWWII, CHAMPION.CAPTAINAMERICAIW ], EFFECT.FAMILIAR_INSIGHT),
        ...fromStars(4, 5, [ CHAMPION.BLACKPANTHERCIVILWAR, CHAMPION.KILLMONGER ], EFFECT.WAKANDAN_INSIGHT),
    ]),

    ...fromId(CHAMPION.IRONPATRIOT, [
        ...fromStars(3, 5, [ CHAMPION.IRONMAN ], EFFECT.ARMOR),
        ...fromStars(3, 5, [ CHAMPION.SPIDERMAN ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 5, [ CHAMPION.CAPTAINAMERICA ], EFFECT.CRITICAL_DAMAGE),
    ]),

    ...fromId(CHAMPION.KANG, [
        ...fromStars(4, 4, [ CHAMPION.BLACKBOLT ], EFFECT.ARMOR),
        ...fromStars(4, 4, [ CHAMPION.THEVISION ], EFFECT.CRITICAL_RATE),
        ...fromStars(4, 4, [ CHAMPION.THOR ], EFFECT.CRITICAL_RATE),
    ]),

    ...fromId(CHAMPION.NEBULA, [
        ...fromStars(3, 5, [ CHAMPION.STARLORD, CHAMPION.ROCKET ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 5, [ CHAMPION.DRAX ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 5, [ CHAMPION.THANOS, CHAMPION.GAMORA ], EFFECT.HEALTH),
        ...fromStars(3, 5, [ CHAMPION.GAMORA ], EFFECT.CRITICAL_DAMAGE),
    ]),

    ...fromId(CHAMPION.HULKBUSTER, [
        ...fromStars(2, 5, [ CHAMPION.HULK, CHAMPION.YELLOWJACKET ], EFFECT.CRITICAL_DAMAGE),
        ...fromStars(3, 5, [ CHAMPION.IRONMAN ], EFFECT.HEALTH),
        ...fromStars(3, 5, [ CHAMPION.SUPERIORIRONMAN ], EFFECT.HEALTH),
        ...fromStars(4, 5, [ CHAMPION.ULTRON ], EFFECT.CRITICAL_RATE),
    ]),

    ...fromId(CHAMPION.PUNISHER2099, [
        ...fromStars(3, 5, [ CHAMPION.CAPTAINAMERICA ], EFFECT.LOYAL_MINISTER),
        ...fromStars(3, 5, [ CHAMPION.PUNISHER ], EFFECT.CROSS_TRAINING),
        ...fromStars(4, 5, [ CHAMPION.THOR ], EFFECT.BELIEVER),
    ]),

    ...fromId(CHAMPION.ROCKET, [
        ...fromStars(2, 5, [ CHAMPION.STARLORD, CHAMPION.GROOT ], EFFECT.ARMOR),
        ...fromStars(2, 5, [ CHAMPION.GAMORA ], EFFECT.PERFECT_BLOCK),
        ...fromStars(3, 5, [ CHAMPION.RONAN ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 5, [ CHAMPION.DRAX ], EFFECT.PERFECT_BLOCK),
    ]),

    ...fromId(CHAMPION.SENTINEL, [
        ...fromStars(4, 5, [ CHAMPION.ICEMAN, CHAMPION.CABLE, CHAMPION.NIGHTCRAWLER ], EFFECT.MUTANT_PURSUIT),
        ...fromStars(4, 5, [ CHAMPION.KINGPIN, CHAMPION.BLACKPANTHERCIVILWAR, CHAMPION.KILLMONGER ], EFFECT.SKILL_TRAINING),
        ...fromStars(4, 5, [ CHAMPION.VOID, CHAMPION.ANTMAN, CHAMPION.ELECTRO ], EFFECT.SCIENCE_RESEARCH),
        ...fromStars(4, 5, [ CHAMPION.KARLMORDO, CHAMPION.HOOD, CHAMPION.MORNINGSTAR ], EFFECT.MYSTIC_OBSERVATION),
        ...fromStars(4, 5, [ CHAMPION.ULTRON, CHAMPION.GREENGOBLIN, CHAMPION.YONDU ], EFFECT.TECH_ADVANCEMENT),
    ]),

    ...fromId(CHAMPION.STARLORD, [
        ...fromStars(2, 5, [ CHAMPION.ROCKET, CHAMPION.GROOT ], EFFECT.ARMOR),
        ...fromStars(2, 5, [ CHAMPION.DRAX ], EFFECT.PERFECT_BLOCK),
        ...fromStars(3, 5, [ CHAMPION.GAMORA ], EFFECT.PERFECT_BLOCK),
    ]),

    ...fromId(CHAMPION.SPIDERMANSTARK, [
        ...fromStars(3, 5, [ CHAMPION.VULTURE ], EFFECT.AVENGERS_TRYOUT),
        ...fromStars(4, 5, [ CHAMPION.SPIDERMANMORALES, CHAMPION.KAMALAKHAN ], EFFECT.CONTEST_NOOBS),
        ...fromStars(2, 5, [ CHAMPION.IRONMAN, CHAMPION.HULKBUSTER ], EFFECT.KNOWLEDGE_SHARE),
    ]),

    ...fromId(CHAMPION.VISION, [
        ...fromStars(2, 4, [ CHAMPION.SCARLETWITCH ], EFFECT.POWER_GAIN),
        ...fromStars(2, 4, [ CHAMPION.IRONMAN ], EFFECT.PERFECT_BLOCK),
        ...fromStars(3, 4, [ CHAMPION.MAGNETO ], EFFECT.CRITICAL_RATE),
    ]),

    ...fromId(CHAMPION.THEVISION, [
        ...fromStars(2, 4, [ CHAMPION.IRONMAN ], EFFECT.HEALTH),
        ...fromStars(2, 4, [ CHAMPION.SCARLETWITCH ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 4, [ CHAMPION.ULTRON ], EFFECT.ATTACK),
    ]),

    ...fromId(CHAMPION.ULTRON, [
        ...fromStars(2, 4, [ CHAMPION.IRONMAN, CHAMPION.SUPERIORIRONMAN ], EFFECT.HEALTH),
        ...fromStars(2, 4, [ CHAMPION.SCARLETWITCH ], EFFECT.ARMOR),
        ...fromStars(3, 4, [ CHAMPION.BLACKWIDOW ], EFFECT.CRITICAL_RATE),
    ]),

    ...fromId(CHAMPION.ULTRONCLASSIC, [
        ...fromStars(5, 5, [ CHAMPION.VISION, CHAMPION.THEVISION ], EFFECT.CRITICAL_RATE),
        ...fromStars(5, 5, [ CHAMPION.THOR ], EFFECT.ATTACK),
        ...fromStars(5, 5, [ CHAMPION.THANOS, CHAMPION.KANG ], EFFECT.CRITICAL_DAMAGE),
    ]),

    ...fromId(CHAMPION.WARMACHINE, [
        ...fromStars(2, 4, [ CHAMPION.HULKBUSTER ], EFFECT.ARMOR),
        ...fromStars(3, 4, [ CHAMPION.HAWKEYE ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 4, [ CHAMPION.BLACKWIDOW ], EFFECT.PERFECT_BLOCK),
        ...fromStars(4, 4, [ CHAMPION.BLACKPANTHER ], EFFECT.CRITICAL_RATE),
    ]),

    ...fromId(CHAMPION.YONDU, [
        ...fromStars(4, 5, [ CHAMPION.ROCKET ], EFFECT.ARMOR),
        ...fromStars(4, 5, [ CHAMPION.RONAN ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 5, [ CHAMPION.STARLORD ], EFFECT.CRITICAL_DAMAGE),
    ]),

    ...fromId(CHAMPION.ARCHANGEL, [
        ...fromStars(3, 5, [ CHAMPION.PSYLOCKEXFORCE ], EFFECT.POWER_GAIN),
        ...fromStars(3, 5, [ CHAMPION.PHOENIX, CHAMPION.BEAST ], EFFECT.MUTANT_AGENDA),
        ...fromStars(4, 5, [ CHAMPION.ICEMAN, CHAMPION.COLOSSUS ], EFFECT.MUTANT_AGENDA),
        ...fromStars(4, 5, [ CHAMPION.GHOSTRIDER, CHAMPION.BLACKWIDOW ], EFFECT.PERFECT_BLOCK),
    ]),

    ...fromId(CHAMPION.BEAST, [
        ...fromStars(4, 5, [ CHAMPION.SUPERIORIRONMAN, CHAMPION.BLACKPANTHER ], EFFECT.COMBO),
        ...fromStars(3, 5, [ CHAMPION.NIGHTCRAWLER, CHAMPION.COLOSSUS ], EFFECT.MUTANT_AGENDA),
        ...fromStars(3, 5, [ CHAMPION.IRONPATRIOT ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 5, [ CHAMPION.GAMBIT ], EFFECT.ARMOR),
    ]),

    ...fromId(CHAMPION.BISHOP, [
        ...fromStars(2, 5, [ CHAMPION.PSYLOCKEXFORCE ], EFFECT.CHRONAL_ANCHOR),
        ...fromStars(2, 5, [ CHAMPION.STORM ], EFFECT.ENERGY_CONDUIT),
    ]),

    ...fromId(CHAMPION.CABLE, [
        ...fromStars(2, 5, [ CHAMPION.CYCLOPS, CHAMPION.CYCLOPS90S ], EFFECT.HEALTH),
        ...fromStars(3, 5, [ CHAMPION.PHOENIX ], EFFECT.HEALTH),
        ...fromStars(4, 5, [ CHAMPION.DEADPOOL, CHAMPION.DEADPOOLXFORCE ], EFFECT.CRITICAL_RATE),
        ...fromStars(4, 5, [ CHAMPION.ROGUE ], EFFECT.PERFECT_BLOCK),
    ]),

    ...fromId(CHAMPION.COLOSSUS, [
        ...fromStars(2, 5, [ CHAMPION.JUGGERNAUT ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 5, [ CHAMPION.WOLVERINE, CHAMPION.WOLVERINEOLDMAN ], EFFECT.ARMOR),
        ...fromStars(3, 5, [ CHAMPION.MAGIK ], EFFECT.HEALTH),
    ]),

    ...fromId(CHAMPION.CYCLOPS, [
        ...fromStars(2, 5, [ CHAMPION.WOLVERINE ], EFFECT.CRITICAL_DAMAGE),
        ...fromStars(2, 5, [ CHAMPION.STORM, CHAMPION.COLOSSUS ], EFFECT.MUTANT_AGENDA),
        ...fromStars(3, 5, [ CHAMPION.MAGNETO ], EFFECT.ATTACK),
    ]),

    ...fromId(CHAMPION.CYCLOPS90S, [
        ...fromStars(3, 5, [ CHAMPION.MAGNETO ], EFFECT.ATTACK),
        ...fromStars(3, 5, [ CHAMPION.STORM ], EFFECT.PERFECT_BLOCK),
        ...fromStars(3, 5, [ CHAMPION.COLOSSUS, CHAMPION.WOLVERINE ], EFFECT.MUTANT_AGENDA),
    ]),

    ...fromId(CHAMPION.DEADPOOL, [
        ...fromStars(2, 4, [ CHAMPION.PUNISHER ], EFFECT.PERFECT_BLOCK),
        ...fromStars(3, 4, [ CHAMPION.RHINO ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 4, [ CHAMPION.WOLVERINE, CHAMPION.WOLVERINEOLDMAN ], EFFECT.HEALTH),
    ]),

    ...fromId(CHAMPION.DEADPOOLXFORCE, [
        ...fromStars(2, 4, [ CHAMPION.MOONKNIGHT ], EFFECT.CRITICAL_DAMAGE),
        ...fromStars(3, 4, [ CHAMPION.DEADPOOL ], EFFECT.CRITICAL_DAMAGE),
        ...fromStars(4, 4, [ CHAMPION.MAGNETOMARVELNOW ], EFFECT.ARMOR),
    ]),

    ...fromId(CHAMPION.DOMINO, [
        ...fromStars(4, 5, [ CHAMPION.DEADPOOLXFORCE ], EFFECT.XFORCE),
        ...fromStars(4, 5, [ CHAMPION.DEADPOOL ], EFFECT.SIX_PACK),
        ...fromStars(4, 5, [ CHAMPION.WOLVERINEOLDMAN, CHAMPION.SABRETOOTH ], EFFECT.WEAPON_X_STRIKE_TEAM),
        ...fromStars(4, 5, [ CHAMPION.MASACRE ], EFFECT.MERCS_FOR_MONEY),
        ...fromStars(4, 5, [ CHAMPION.REDHULK ], EFFECT.CODE_RED_REVELATIONS),
        ...fromStars(4, 5, [ CHAMPION.MODOK, CHAMPION.TASKMASTER ], EFFECT.BETTER_LUCK_NEXT_TIME),
        ...fromStars(4, 5, [ CHAMPION.COLOSSUS, CHAMPION.WOLVERINE ], EFFECT.POWER_GAIN),
        ...fromStars(4, 5, [ CHAMPION.CABLE ], EFFECT.COMPLICATED),
    ]),

    ...fromId(CHAMPION.GAMBIT, [
        ...fromStars(3, 5, [ CHAMPION.X23 ], EFFECT.ARMOR),
        ...fromStars(4, 5, [ CHAMPION.MAGNETO ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 5, [ CHAMPION.BEAST, CHAMPION.NIGHTCRAWLER ], EFFECT.PERFECT_BLOCK),
    ]),

    ...fromId(CHAMPION.GOLDPOOL, [
        ...fromStars(5, 5, [ CHAMPION.DEADPOOL, CHAMPION.VENOMPOOL, CHAMPION.GWENPOOL, CHAMPION.DEADPOOLXFORCE ], EFFECT.TEAM_DEADPOOL_AWESOME_FORCE),
        ...fromStars(5, 5, [ CHAMPION.AGENTVENOM, CHAMPION.KARLMORDO ], EFFECT.ANNOYANCES_ASSEMBLE),
        ...fromStars(5, 5, [ CHAMPION.CARNAGE, CHAMPION.VOID, CHAMPION.GREENGOBLIN ], EFFECT.BROKEN_MINDS),
    ]),

    ...fromId(CHAMPION.ICEMAN, [
        ...fromStars(3, 5, [ CHAMPION.HYPERION, CHAMPION.MAGNETO ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 5, [ CHAMPION.GHOSTRIDER, CHAMPION.BLACKWIDOW ], EFFECT.PERFECT_BLOCK),
        ...fromStars(3, 5, [ CHAMPION.SPIDERMAN ], EFFECT.CRITICAL_DAMAGE),
    ]),

    ...fromId(CHAMPION.MAGNETO, [
        ...fromStars(2, 5, [ CHAMPION.CYCLOPS, CHAMPION.CYCLOPS90S ], EFFECT.ATTACK),
        ...fromStars(3, 5, [ CHAMPION.WOLVERINE ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 5, [ CHAMPION.STORM ], EFFECT.CRITICAL_DAMAGE),
        ...fromStars(4, 5, [ CHAMPION.MAGIK ], EFFECT.ARMOR),
    ]),

    ...fromId(CHAMPION.MAGNETOMARVELNOW, [
        ...fromStars(2, 4, [ CHAMPION.CYCLOPS ], EFFECT.PERFECT_BLOCK),
        ...fromStars(3, 4, [ CHAMPION.MAGIK ], EFFECT.PERFECT_BLOCK),
        ...fromStars(3, 4, [ CHAMPION.WOLVERINE ], EFFECT.CRITICAL_DAMAGE),
        ...fromStars(4, 4, [ CHAMPION.BLACKBOLT ], EFFECT.ATTACK),
    ]),

    ...fromId(CHAMPION.NIGHTCRAWLER, [
        ...fromStars(3, 5, [ CHAMPION.BEAST ], EFFECT.ARMOR),
        ...fromStars(3, 5, [ CHAMPION.JUGGERNAUT ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 5, [ CHAMPION.CYCLOPS, CHAMPION.CYCLOPS90S ], EFFECT.PERFECT_BLOCK),
        ...fromStars(4, 5, [ CHAMPION.X23 ], EFFECT.CRITICAL_DAMAGE),
    ]),

    ...fromId(CHAMPION.PSYLOCKEXFORCE, [
        ...fromStars(3, 5, [ CHAMPION.ARCHANGEL ], EFFECT.POWER_GAIN),
        ...fromStars(3, 5, [ CHAMPION.STORM ], EFFECT.PERFECT_BLOCK),
        ...fromStars(4, 5, [ CHAMPION.ROGUE ], EFFECT.PERFECT_BLOCK),
    ]),

    ...fromId(CHAMPION.ROGUE, [
        ...fromStars(3, 5, [ CHAMPION.NIGHTCRAWLER ], EFFECT.HEALTH),
        ...fromStars(3, 5, [ CHAMPION.GAMBIT ], EFFECT.POWER_GAIN),
        ...fromStars(3, 5, [ CHAMPION.MSMARVEL ], EFFECT.CRITICAL_DAMAGE),
        ...fromStars(3, 5, [ CHAMPION.DEADPOOL ], EFFECT.MUTANT_AGENDA),
    ]),

    ...fromId(CHAMPION.STORM, [
        ...fromStars(2, 5, [ CHAMPION.BLACKPANTHER ], EFFECT.POWER_GAIN),
        ...fromStars(3, 5, [ CHAMPION.MAGIK ], EFFECT.ARMOR),
        ...fromStars(3, 5, [ CHAMPION.CYCLOPS, CHAMPION.CYCLOPS90S ], EFFECT.PERFECT_BLOCK),
        ...fromStars(4, 5, [ CHAMPION.MAGNETO, CHAMPION.MAGNETOMARVELNOW ], EFFECT.CRITICAL_RATE),
    ]),

    ...fromId(CHAMPION.WOLVERINE, [
        ...fromStars(2, 4, [ CHAMPION.CYCLOPS, CHAMPION.CYCLOPS90S ], EFFECT.CRITICAL_DAMAGE),
        ...fromStars(3, 4, [ CHAMPION.CAPTAINAMERICA, CHAMPION.CAPTAINAMERICAWWII ], EFFECT.ARMOR),
        ...fromStars(3, 4, [ CHAMPION.MAGNETO ], EFFECT.CRITICAL_RATE),
    ]),

    ...fromId(CHAMPION.WOLVERINEOLDMAN, [
        ...fromStars(2, 5, [ CHAMPION.WOLVERINE ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 5, [ CHAMPION.HAWKEYE ], EFFECT.ARMOR),
        ...fromStars(4, 5, [ CHAMPION.HULK ], EFFECT.ATTACK),
    ]),

    ...fromId(CHAMPION.X23, [
        ...fromStars(2, 5, [ CHAMPION.WOLVERINE, CHAMPION.WOLVERINEOLDMAN ], EFFECT.HEALTH),
        ...fromStars(3, 5, [ CHAMPION.AGENTVENOM ], EFFECT.PERFECT_BLOCK),
    ]),

    ...fromId(CHAMPION.AGENTVENOM, [
        ...fromStars(3, 5, [ CHAMPION.SPIDERMAN ], EFFECT.IDOL),
        ...fromStars(3, 5, [ CHAMPION.VENOM, CHAMPION.VENOMPOOL ], EFFECT.HEALTH),
        ...fromStars(3, 5, [ CHAMPION.SPIDERMANBLACK ], EFFECT.HEALTH),
        ...fromStars(4, 5, [ CHAMPION.GROOT, CHAMPION.REDHULK ], EFFECT.PERFECT_BLOCK),
    ]),

    ...fromId(CHAMPION.BLACKPANTHER, [
        ...fromStars(2, 5, [ CHAMPION.IRONFIST, CHAMPION.IRONFISTWHITE ], EFFECT.CRITICAL_DAMAGE),
        ...fromStars(3, 5, [ CHAMPION.STORM ], EFFECT.POWER_GAIN),
        ...fromStars(3, 5, [ CHAMPION.DEADPOOL ], EFFECT.CRITICAL_RATE),
    ]),

    ...fromId(CHAMPION.BLACKPANTHERCIVILWAR, [
        ...fromStars(3, 5, [ CHAMPION.THEVISION, CHAMPION.BLACKWIDOW ], EFFECT.ARMOR),
        ...fromStars(2, 5, [ CHAMPION.WINTERSOLDIER, CHAMPION.KILLMONGER ], EFFECT.ATTACK),
        ...fromStars(2, 5, [ CHAMPION.ANTMAN ], EFFECT.CRITICAL_DAMAGE),
        ...fromStars(2, 5, [ CHAMPION.HAWKEYE, CHAMPION.BLACKPANTHER ], EFFECT.BLEED),
    ]),

    ...fromId(CHAMPION.BLACKWIDOW, [
        ...fromStars(2, 4, [ CHAMPION.CAPTAINMARVEL, CHAMPION.MSMARVEL ], EFFECT.ARMOR),
        ...fromStars(2, 4, [ CHAMPION.WINTERSOLDIER ], EFFECT.POWER_GAIN),
        ...fromStars(3, 4, [ CHAMPION.HULK, CHAMPION.HULKBUSTER ], EFFECT.STUN_SPECIAL),
        ...fromStars(3, 4, [ CHAMPION.HAWKEYE ], EFFECT.POWER_GAIN),
    ]),

    ...fromId(CHAMPION.BLADE, [
        ...fromStars(3, 5, [ CHAMPION.MEPHISTO, CHAMPION.DORMAMMU ], EFFECT.DEMON_HUNTER),
        ...fromStars(3, 5, [ CHAMPION.GHOSTRIDER ], EFFECT.SPIRIT_OF_JUSTICE),
        ...fromStars(4, 5, [ CHAMPION.SPIDERMANSTARK ], EFFECT.HEIGHTENED_SENSES),
    ]),

    ...fromId(CHAMPION.CROSSBONES, [
        ...fromStars(3, 5, [ CHAMPION.CAPTAINAMERICA, CHAMPION.CAPTAINAMERICAWWII, CHAMPION.FALCON ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 5, [ CHAMPION.WINTERSOLDIER, CHAMPION.BLACKWIDOW ], EFFECT.CRITICAL_DAMAGE),
    ]),

    ...fromId(CHAMPION.DAREDEVIL, [
        ...fromStars(3, 4, [ CHAMPION.SUPERIORIRONMAN ], EFFECT.CRITICAL_DAMAGE),
        ...fromStars(3, 4, [ CHAMPION.BLACKWIDOW ], EFFECT.POWER_GAIN),
        ...fromStars(3, 4, [ CHAMPION.ELEKTRA ], EFFECT.POWER_GAIN),
    ]),

    ...fromId(CHAMPION.DAREDEVILNETFLIX, [
        ...fromStars(2, 5, [ CHAMPION.ELEKTRA ], EFFECT.POWER_GAIN),
        ...fromStars(2, 5, [ CHAMPION.PUNISHER ], EFFECT.CRITICAL_DAMAGE),
        ...fromStars(3, 5, [ CHAMPION.LUKECAGE ], EFFECT.PERFECT_BLOCK),
    ]),

    ...fromId(CHAMPION.ELEKTRA, [
        ...fromStars(3, 4, [ CHAMPION.WOLVERINE ], EFFECT.ARMOR),
        ...fromStars(3, 4, [ CHAMPION.DAREDEVIL, CHAMPION.DAREDEVILNETFLIX ], EFFECT.POWER_GAIN),
        ...fromStars(3, 4, [ CHAMPION.BLACKWIDOW ], EFFECT.CRITICAL_DAMAGE),
        ...fromStars(4, 4, [ CHAMPION.DEADPOOL, CHAMPION.DEADPOOLXFORCE ], EFFECT.PERFECT_BLOCK),
    ]),

    ...fromId(CHAMPION.FALCON, [
        ...fromStars(3, 5, [ CHAMPION.CAPTAINAMERICA, CHAMPION.CAPTAINAMERICAWWII ], EFFECT.ARMOR),
        ...fromStars(3, 5, [ CHAMPION.WARMACHINE, CHAMPION.BLACKWIDOW ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 5, [ CHAMPION.THEVISION, CHAMPION.BLACKPANTHERCIVILWAR ], EFFECT.CRITICAL_RATE),
        ...fromStars(4, 5, [ CHAMPION.ANTMAN, CHAMPION.HAWKEYE ], EFFECT.PERFECT_BLOCK),
    ]),

    ...fromId(CHAMPION.GWENPOOL, [
        ...fromStars(3, 5, [ CHAMPION.HOWARDTHEDUCK ], EFFECT.ARMOR),
        ...fromStars(3, 5, [ CHAMPION.SPIDERMANBLACK ], EFFECT.PERFECT_BLOCK),
        ...fromStars(4, 5, [ CHAMPION.DEADPOOL, CHAMPION.DEADPOOLXFORCE ], EFFECT.IDOL),
        ...fromStars(4, 5, [ CHAMPION.THORJANEFOSTER ], EFFECT.CRITICAL_RATE),
    ]),

    ...fromId(CHAMPION.HAWKEYE, [
        ...fromStars(2, 5, [ CHAMPION.SCARLETWITCH ], EFFECT.POWER_GAIN),
        ...fromStars(3, 5, [ CHAMPION.MOONKNIGHT ], EFFECT.ARMOR),
        ...fromStars(3, 5, [ CHAMPION.IRONMAN ], EFFECT.ARMOR),
        ...fromStars(4, 5, [ CHAMPION.HULK ], EFFECT.ARMOR),
    ]),

    ...fromId(CHAMPION.KARNAK, [
        ...fromStars(3, 5, [ CHAMPION.BLACKBOLT, CHAMPION.MEDUSA ], EFFECT.HEALTH),
        ...fromStars(3, 5, [ CHAMPION.MAGNETO ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 5, [ CHAMPION.BEAST ], EFFECT.PERFECT_BLOCK),
        ...fromStars(4, 5, [ CHAMPION.CAPTAINMARVEL, CHAMPION.MSMARVEL ], EFFECT.PERFECT_BLOCK),
    ]),

    ...fromId(CHAMPION.KILLMONGER, [
        ...fromStars(3, 5, [ CHAMPION.WINTERSOLDIER ], EFFECT.ENHANCED_SOLDIERS),
        ...fromStars(3, 5, [ CHAMPION.BLACKPANTHERCIVILWAR ], EFFECT.WAKANDA_LEADERSHIP),
        ...fromStars(4, 5, [ CHAMPION.VOID ], EFFECT.FEARLESS),
    ]),

    ...fromId(CHAMPION.KINGPIN, [
        ...fromStars(3, 5, [ CHAMPION.HOOD, CHAMPION.JOEFIXIT ], EFFECT.COMPETITION),
        ...fromStars(3, 5, [ CHAMPION.DAREDEVIL, CHAMPION.DAREDEVILNETFLIX ], EFFECT.BANE_OF_HELLS_KITCHEN),
        ...fromStars(4, 5, [ CHAMPION.IRONFIST, CHAMPION.IRONFISTWHITE, CHAMPION.ELEKTRA ], EFFECT.DEFENDERS_DESTROYER),
    ]),

    ...fromId(CHAMPION.MOONKNIGHT, [
        ...fromStars(2, 5, [ CHAMPION.SPIDERMAN ], EFFECT.ARMOR),
        ...fromStars(2, 5, [ CHAMPION.DEADPOOLXFORCE, CHAMPION.DEADPOOL ], EFFECT.CRITICAL_DAMAGE),
        ...fromStars(3, 5, [ CHAMPION.DAREDEVIL ], EFFECT.PERFECT_BLOCK),
        ...fromStars(4, 5, [ CHAMPION.IRONPATRIOT ], EFFECT.CRITICAL_RATE),
    ]),

    ...fromId(CHAMPION.PUNISHER, [
        ...fromStars(2, 4, [ CHAMPION.SPIDERMAN ], EFFECT.CRITICAL_DAMAGE),
        ...fromStars(3, 4, [ CHAMPION.RHINO ], EFFECT.PERFECT_BLOCK),
        ...fromStars(3, 4, [ CHAMPION.DAREDEVIL, CHAMPION.DAREDEVILNETFLIX ], EFFECT.CRITICAL_DAMAGE),
    ]),

    ...fromId(CHAMPION.TASKMASTER, [
        ...fromStars(3, 5, [ CHAMPION.MOONKNIGHT ], EFFECT.TERMINATION_CONTRACT),
        ...fromStars(3, 5, [ CHAMPION.CROSSBONES ], EFFECT.PROFESSORS_IN_CRIME),
        ...fromStars(4, 5, [ CHAMPION.HAWKEYE ], EFFECT.MOSTLY_AVERAGE_JOES),
        ...fromStars(4, 5, [ CHAMPION.WINTERSOLDIER ], EFFECT.THUNDER),
    ]),

    ...fromId(CHAMPION.THORRAGNAROK, [
        ...fromStars(3, 5, [ CHAMPION.LOKI ], EFFECT.LIKE_OLD_DAYS),
        ...fromStars(4, 5, [ CHAMPION.HELA ], EFFECT.NOT_AFRAID_OF_DEATH),
        ...fromStars(4, 5, [ CHAMPION.HULK, CHAMPION.HULKRAGNAROK ], EFFECT.FRIEND_FROM_WORK),
    ]),

    ...fromId(CHAMPION.WINTERSOLDIER, [
        ...fromStars(2, 5, [ CHAMPION.WOLVERINE ], EFFECT.ARMOR),
        ...fromStars(2, 5, [ CHAMPION.CAPTAINAMERICA ], EFFECT.PERFECT_BLOCK),
        ...fromStars(3, 5, [ CHAMPION.CAPTAINAMERICAWWII ], EFFECT.ARMOR),
    ]),

    ...fromId(CHAMPION.ABOMINATION, [
        ...fromStars(2, 4, [ CHAMPION.RHINO ], EFFECT.ARMOR),
        ...fromStars(3, 4, [ CHAMPION.HULK ], EFFECT.ATTACK),
        ...fromStars(4, 4, [ CHAMPION.SHEHULK ], EFFECT.CRITICAL_RATE),
        ...fromStars(4, 4, [ CHAMPION.REDHULK ], EFFECT.CRITICAL_RATE),
    ]),

    ...fromId(CHAMPION.ANTMAN, [
        ...fromStars(2, 5, [ CHAMPION.YELLOWJACKET ], EFFECT.ATTACK),
        ...fromStars(2, 5, [ CHAMPION.IRONMAN ], EFFECT.PERFECT_BLOCK),
        ...fromStars(3, 5, [ CHAMPION.SPIDERMAN ], EFFECT.PERFECT_BLOCK),
        ...fromStars(4, 5, [ CHAMPION.HULK ], EFFECT.ARMOR),
    ]),

    ...fromId(CHAMPION.CAPTAINAMERICA, [
        ...fromStars(2, 5, [ CHAMPION.SPIDERMAN, CHAMPION.SPIDERMANBLACK ], EFFECT.ARMOR),
        ...fromStars(2, 5, [ CHAMPION.SUPERIORIRONMAN ], EFFECT.CRITICAL_RATE),
        ...fromStars(2, 5, [ CHAMPION.IRONMAN ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 5, [ CHAMPION.WINTERSOLDIER ], EFFECT.ARMOR),
    ]),

    ...fromId(CHAMPION.CAPTAINAMERICAWWII, [
        ...fromStars(2, 4, [ CHAMPION.WINTERSOLDIER ], EFFECT.ARMOR),
        ...fromStars(2, 4, [ CHAMPION.WOLVERINE ], EFFECT.ARMOR),
        ...fromStars(3, 4, [ CHAMPION.GUILLOTINE ], EFFECT.ARMOR),
    ]),

    ...fromId(CHAMPION.ELECTRO, [
        ...fromStars(3, 4, [ CHAMPION.SPIDERMAN ], EFFECT.ATTACK),
        ...fromStars(3, 4, [ CHAMPION.RHINO ], EFFECT.ARMOR),
        ...fromStars(3, 4, [ CHAMPION.VENOM ], EFFECT.PERFECT_BLOCK),
        ...fromStars(4, 4, [ CHAMPION.SPIDERMANMORALES ], EFFECT.CRITICAL_RATE),
    ]),

    ...fromId(CHAMPION.HULK, [
        ...fromStars(2, 4, [ CHAMPION.THOR ], EFFECT.CRITICAL_DAMAGE),
        ...fromStars(3, 4, [ CHAMPION.ABOMINATION ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 4, [ CHAMPION.HAWKEYE ], EFFECT.ARMOR),
    ]),

    ...fromId(CHAMPION.HULKRAGNAROK, [
        ...fromStars(3, 5, [ CHAMPION.THORRAGNAROK ], EFFECT.TEAM_BUILDING_EXERCISE),
        ...fromStars(3, 5, [ CHAMPION.BLACKWIDOW ], EFFECT.LULLABY),
        ...fromStars(4, 5, [ CHAMPION.HELA ], EFFECT.OFF_LIMITS),
        ...fromStars(4, 5, [ CHAMPION.LOKI ], EFFECT.PUNY_GOD),
    ]),

    ...fromId(CHAMPION.JOEFIXIT, [
        ...fromStars(3, 4, [ CHAMPION.WOLVERINE ], EFFECT.ARMOR),
        ...fromStars(3, 4, [ CHAMPION.MOONKNIGHT ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 4, [ CHAMPION.HULK ], EFFECT.ATTACK),
        ...fromStars(4, 4, [ CHAMPION.MSMARVEL ], EFFECT.CRITICAL_RATE),
    ]),

    ...fromId(CHAMPION.LUKECAGE, [
        ...fromStars(2, 5, [ CHAMPION.IRONFIST ], EFFECT.HEROES_FOR_HIRE),
        ...fromStars(4, 5, [ CHAMPION.JUGGERNAUT, CHAMPION.IRONPATRIOT ], EFFECT.THUNDERBOLTS),
        ...fromStars(3, 5, [ CHAMPION.RHINO ], EFFECT.CRITICAL_RATE),
        ...fromStars(4, 5, [ CHAMPION.DAREDEVIL ], EFFECT.PERFECT_BLOCK),
    ]),

    ...fromId(CHAMPION.MODOK, [
        ...fromStars(3, 5, [ CHAMPION.DROCTOPUS ], EFFECT.MASTERMINDS),
        ...fromStars(3, 5, [ CHAMPION.CAPTAINAMERICA, CHAMPION.FALCON ], EFFECT.ATTACK),
        ...fromStars(3, 5, [ CHAMPION.ANGELA ], EFFECT.POWER_GAIN),
        ...fromStars(3, 5, [ CHAMPION.TASKMASTER ], EFFECT.ADVANCED_IDEA_MECHANICS),
        ...fromStars(3, 5, [ CHAMPION.GWENPOOL, CHAMPION.DEADPOOL ], EFFECT.CHAIR_LARCENY),
        ...fromStars(4, 5, [ CHAMPION.ABOMINATION ], EFFECT.CUBICLE_MATES),
    ]),

    ...fromId(CHAMPION.QUAKE, [
        ...fromStars(2, 5, [ CHAMPION.CROSSBONES, CHAMPION.IRONPATRIOT ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 5, [ CHAMPION.KARNAK, CHAMPION.BLACKBOLT ], EFFECT.CRITICAL_DAMAGE),
        ...fromStars(3, 5, [ CHAMPION.HAWKEYE ], EFFECT.SHIELD_AGENTS),
        ...fromStars(4, 5, [ CHAMPION.BLACKWIDOW ], EFFECT.SHIELD_CLEARANCE),
    ]),

    ...fromId(CHAMPION.RHINO, [
        ...fromStars(2, 5, [ CHAMPION.ABOMINATION ], EFFECT.ARMOR),
        ...fromStars(2, 5, [ CHAMPION.SPIDERMAN, CHAMPION.SPIDERGWEN ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 5, [ CHAMPION.ELECTRO ], EFFECT.PERFECT_BLOCK),
        ...fromStars(4, 5, [ CHAMPION.PUNISHER ], EFFECT.ARMOR),
    ]),

    ...fromId(CHAMPION.REDHULK, [
        ...fromStars(3, 5, [ CHAMPION.ABOMINATION ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 5, [ CHAMPION.HULK ], EFFECT.ATTACK),
        ...fromStars(3, 5, [ CHAMPION.ELEKTRA, CHAMPION.AGENTVENOM ], EFFECT.THUNDERBOLTS),
        ...fromStars(4, 5, [ CHAMPION.X23 ], EFFECT.PERFECT_BLOCK),
    ]),

    ...fromId(CHAMPION.SENTRY, [
        ...fromStars(4, 5, [ CHAMPION.VOID ], EFFECT.OTHER_HALF),
        ...fromStars(4, 5, [ CHAMPION.BLACKWIDOW, CHAMPION.VISION, CHAMPION.HAWKEYE, CHAMPION.CAPTAINAMERICA ], EFFECT.ARMOR),
        ...fromStars(4, 5, [ CHAMPION.HULK ], EFFECT.CRITICAL_DAMAGE),
    ]),

    ...fromId(CHAMPION.SHEHULK, [
        ...fromStars(3, 5, [ CHAMPION.DAREDEVIL, CHAMPION.DAREDEVILNETFLIX ], EFFECT.STUN_ACTIVATION),
        ...fromStars(3, 5, [ CHAMPION.HULK ], EFFECT.HEALTH),
        ...fromStars(3, 5, [ CHAMPION.SUPERIORIRONMAN ], EFFECT.POWER_GAIN),
        ...fromStars(4, 5, [ CHAMPION.KAMALAKHAN ], EFFECT.PERFECT_BLOCK),
    ]),

    ...fromId(CHAMPION.SPIDERMAN, [
        ...fromStars(1, 5, [ CHAMPION.WOLVERINE ], EFFECT.HEALTH),
        ...fromStars(1, 5, [ CHAMPION.HAWKEYE ], EFFECT.ATTACK),
        ...fromStars(3, 5, [ CHAMPION.ELECTRO ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 5, [ CHAMPION.CAPTAINAMERICA ], EFFECT.ARMOR),
    ]),

    ...fromId(CHAMPION.SPIDERGWEN, [
        ...fromStars(3, 5, [ CHAMPION.RHINO ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 5, [ CHAMPION.DAREDEVIL ], EFFECT.CRITICAL_RATE),
        ...fromStars(2, 5, [ CHAMPION.SPIDERMAN ], EFFECT.POWER_GAIN),
        ...fromStars(4, 5, [ CHAMPION.PUNISHER ], EFFECT.CRITICAL_DAMAGE),
    ]),

    ...fromId(CHAMPION.SPIDERMANMORALES, [
        ...fromStars(3, 4, [ CHAMPION.VENOM ], EFFECT.ATTACK),
        ...fromStars(3, 4, [ CHAMPION.SPIDERGWEN ], EFFECT.PERFECT_BLOCK),
        ...fromStars(4, 4, [ CHAMPION.ELECTRO ], EFFECT.CRITICAL_RATE),
        ...fromStars(4, 4, [ CHAMPION.IRONPATRIOT ], EFFECT.CRITICAL_RATE),
    ]),

    ...fromId(CHAMPION.VOID, [
        ...fromStars(3, 5, [ CHAMPION.BLACKWIDOW, CHAMPION.HAWKEYE, CHAMPION.CAPTAINAMERICA, CHAMPION.VISION ], EFFECT.OVERCOMING_FEAR),
        ...fromStars(3, 5, [ CHAMPION.THOR, CHAMPION.DRSTRANGE ], EFFECT.CRITICAL_RATE),
    ]),

    ...fromId(CHAMPION.YELLOWJACKET, [
        ...fromStars(2, 5, [ CHAMPION.ANTMAN ], EFFECT.ATTACK),
        ...fromStars(2, 5, [ CHAMPION.ULTRON ], EFFECT.CRITICAL_DAMAGE),
        ...fromStars(3, 5, [ CHAMPION.JOEFIXIT ], EFFECT.CRITICAL_DAMAGE),
        ...fromStars(4, 5, [ CHAMPION.SUPERIORIRONMAN ], EFFECT.IDOL),
    ]),

    ...fromId(CHAMPION.DRVOODOO, [
        ...fromStars(3, 5, [ CHAMPION.ROGUE ], EFFECT.PERFECT_BLOCK),
        ...fromStars(3, 5, [ CHAMPION.DRSTRANGE ], EFFECT.CRITICAL_DAMAGE),
        ...fromStars(4, 5, [ CHAMPION.GUILLOTINE ], EFFECT.CRITICAL_RATE),
        ...fromStars(4, 5, [ CHAMPION.WINTERSOLDIER ], EFFECT.ARMOR),
    ]),

    ...fromId(CHAMPION.DORMAMMU, [
        ...fromStars(3, 5, [ CHAMPION.HOOD ], EFFECT.INSEPARABLE),
        ...fromStars(3, 5, [ CHAMPION.DRSTRANGE ], EFFECT.ATTACK),
        ...fromStars(4, 5, [ CHAMPION.DRVOODOO ], EFFECT.CRITICAL_RATE),
    ]),

    ...fromId(CHAMPION.DRSTRANGE, [
        ...fromStars(3, 4, [ CHAMPION.THOR, CHAMPION.X23 ], EFFECT.ARMOR),
        ...fromStars(3, 4, [ CHAMPION.SPIDERMAN ], EFFECT.ARMOR),
        ...fromStars(2, 4, [ CHAMPION.SCARLETWITCH ], EFFECT.PERFECT_BLOCK),
        ...fromStars(3, 4, [ CHAMPION.BLACKBOLT ], EFFECT.PERFECT_BLOCK),
    ]),

    ...fromId(CHAMPION.IRONFIST, [
        ...fromStars(2, 5, [ CHAMPION.BLACKPANTHER ], EFFECT.ARMOR),
        ...fromStars(3, 5, [ CHAMPION.LUKECAGE, CHAMPION.SHEHULK ], EFFECT.HEROES_FOR_HIRE),
        ...fromStars(3, 5, [ CHAMPION.DRSTRANGE ], EFFECT.ARMOR),
        ...fromStars(4, 5, [ CHAMPION.WOLVERINE ], EFFECT.ARMOR),
    ]),

    ...fromId(CHAMPION.IRONFISTWHITE, [
        ...fromStars(3, 5, [ CHAMPION.DRSTRANGE ], EFFECT.ARMOR),
        ...fromStars(3, 5, [ CHAMPION.DAREDEVIL ], EFFECT.ARMOR),
        ...fromStars(4, 5, [ CHAMPION.WARMACHINE ], EFFECT.PERFECT_BLOCK),
    ]),

    ...fromId(CHAMPION.GHOSTRIDER, [
        ...fromStars(3, 5, [ CHAMPION.X23 ], EFFECT.PERFECT_BLOCK),
        ...fromStars(3, 5, [ CHAMPION.DEADPOOL, CHAMPION.ELEKTRA ], EFFECT.PERFECT_BLOCK),
        ...fromStars(4, 5, [ CHAMPION.PUNISHER ], EFFECT.CRITICAL_DAMAGE),
    ]),

    ...fromId(CHAMPION.GUILLOTINE, [
        ...fromStars(2, 5, [ CHAMPION.VENOM ], EFFECT.ATTACK),
        ...fromStars(2, 5, [ CHAMPION.CAPTAINAMERICAWWII ], EFFECT.PERFECT_BLOCK),
        ...fromStars(3, 5, [ CHAMPION.MAGIK ], EFFECT.CRITICAL_DAMAGE),
        ...fromStars(4, 5, [ CHAMPION.BLACKPANTHER ], EFFECT.ARMOR),
    ]),

    ...fromId(CHAMPION.HOOD, [
        ...fromStars(3, 5, [ CHAMPION.DRVOODOO, CHAMPION.PUNISHER ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 5, [ CHAMPION.JOEFIXIT ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 5, [ CHAMPION.IRONPATRIOT, CHAMPION.LOKI ], EFFECT.PERFECT_BLOCK),
    ]),

    ...fromId(CHAMPION.JUGGERNAUT, [
        ...fromStars(2, 5, [ CHAMPION.COLOSSUS, CHAMPION.UNSTOPPABLECOLOSSUS ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 5, [ CHAMPION.DRSTRANGE ], EFFECT.ATTACK),
        ...fromStars(3, 5, [ CHAMPION.HULK ], EFFECT.CRITICAL_RATE),
    ]),

    ...fromId(CHAMPION.KARLMORDO, [
        ...fromStars(3, 5, [ CHAMPION.DRSTRANGE ], EFFECT.ARMOR),
        ...fromStars(3, 5, [ CHAMPION.THOR ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 5, [ CHAMPION.FALCON, CHAMPION.ABOMINATION ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 5, [ CHAMPION.DRSTRANGE ], EFFECT.CRITICAL_DAMAGE),
    ]),

    ...fromId(CHAMPION.LOKI, [
        ...fromStars(3, 5, [ CHAMPION.THOR ], EFFECT.HEALTH),
        ...fromStars(3, 5, [ CHAMPION.HULK, CHAMPION.REDHULK, CHAMPION.THORJANEFOSTER ], EFFECT.CRITICAL_RATE),
        ...fromStars(4, 5, [ CHAMPION.MAGNETO, CHAMPION.MAGNETOMARVELNOW ], EFFECT.MASTERMINDS),
    ]),

    ...fromId(CHAMPION.MAGIK, [
        ...fromStars(2, 5, [ CHAMPION.COLOSSUS, CHAMPION.UNSTOPPABLECOLOSSUS ], EFFECT.HEALTH),
        ...fromStars(3, 5, [ CHAMPION.STORM ], EFFECT.ARMOR),
        ...fromStars(3, 5, [ CHAMPION.CYCLOPS, CHAMPION.GUILLOTINE ], EFFECT.PERFECT_BLOCK),
        ...fromStars(4, 5, [ CHAMPION.JUGGERNAUT ], EFFECT.CRITICAL_RATE),
    ]),

    ...fromId(CHAMPION.MORNINGSTAR, [
        ...fromStars(2, 5, [ CHAMPION.GUILLOTINE ], EFFECT.MASTERS_OF_THE_SWORD),
        ...fromStars(3, 5, [ CHAMPION.MEPHISTO ], EFFECT.SOUL_SEEKER),
        ...fromStars(4, 5, [ CHAMPION.MAGIK, CHAMPION.ANGELA ], EFFECT.WARRIOR_QUEENS),
    ]),

    ...fromId(CHAMPION.SCARLETWITCH, [
        ...fromStars(2, 4, [ CHAMPION.CAPTAINMARVEL, CHAMPION.MSMARVEL ], EFFECT.ARMOR),
        ...fromStars(3, 4, [ CHAMPION.VISION ], EFFECT.POWER_GAIN),
        ...fromStars(3, 4, [ CHAMPION.ANTMAN ], EFFECT.PERFECT_BLOCK),
        ...fromStars(4, 4, [ CHAMPION.PHOENIX ], EFFECT.CRITICAL_RATE),
    ]),

    ...fromId(CHAMPION.THORJANEFOSTER, [
        ...fromStars(2, 5, [ CHAMPION.THOR ], EFFECT.POWER_GAIN),
        ...fromStars(3, 5, [ CHAMPION.VISION ], EFFECT.PERFECT_BLOCK),
        ...fromStars(4, 5, [ CHAMPION.BLACKWIDOW ], EFFECT.ARMOR),
        ...fromStars(4, 5, [ CHAMPION.JOEFIXIT ], EFFECT.PERFECT_BLOCK),
    ]),

    ...fromId(CHAMPION.UNSTOPPABLECOLOSSUS, [
        ...fromStars(2, 5, [ CHAMPION.MAGIK ], EFFECT.HEALTH),
        ...fromStars(2, 5, [ CHAMPION.JUGGERNAUT ], EFFECT.CRITICAL_DAMAGE),
        ...fromStars(3, 5, [ CHAMPION.WOLVERINE, CHAMPION.WOLVERINEOLDMAN ], EFFECT.ARMOR),
        ...fromStars(3, 5, [ CHAMPION.CYCLOPS ], EFFECT.PERFECT_BLOCK),
    ]),

    ...fromId(CHAMPION.VULTURE, [
        ...fromStars(3, 5, [ CHAMPION.ELECTRO ], EFFECT.PERFECT_BLOCK),
        ...fromStars(4, 5, [ CHAMPION.SPIDERMAN ], EFFECT.CRITICAL_RATE),
        ...fromStars(3, 5, [ CHAMPION.SPIDERMANSTARK ], EFFECT.ATTACK),
        ...fromStars(4, 5, [ CHAMPION.VENOM ], EFFECT.PERFECT_BLOCK),
    ]),

].map((synergy) => new Synergy({
    ...synergy,
    effectAmount: effectAmount(synergy.effectId, synergy.fromStars),
}));

function effectAmount(effectId, fromStars) {
    const amounts = EFFECT_STARS_AMOUNT[ effectId ];
    if(!amounts) {
        return 0;
    }
    return amounts[ EFFECT_STARS_INDEX[ fromStars ] || 0 ] || 0;
}

function synergiesFromChampions(champions) {
    const groups = {};
    const validChampions = champions.filter((champion) => champion);
    return synergies.filter(({ attr: { fromId, fromStars, toId, group } }) => {
        const id = `${ fromId }-${ fromStars }`;
        const found = validChampions.find((champion) => champion.id === id) &&
            validChampions.find(({ attr: { uid } }) => uid === toId);
        if(!found) {
            return false;
        }
        if(group) {
            if(groups[ group ]) {
                return false;
            }
            groups[ group ] = true;
        }
        return true;
    });
}

export { synergiesFromChampions };
export default synergies;
