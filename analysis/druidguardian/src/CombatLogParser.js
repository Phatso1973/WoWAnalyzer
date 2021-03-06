import CoreCombatLogParser from 'parser/core/CombatLogParser';
import AbilityTracker from 'parser/shared/modules/AbilityTracker';

import Abilities from './modules/Abilities';
import ActiveTargets from './modules/features/ActiveTargets';
import AntiFillerSpam from './modules/features/AntiFillerSpam';
import FrenziedRegenGoEProcs from './modules/features/FrenziedRegenGoEProcs';
import GalacticGuardian from './modules/features/GalacticGuardian';
import Gore from './modules/features/Gore';
import GuardianOfElune from './modules/features/GuardianOfElune';
import IronFurGoEProcs from './modules/features/IronFurGoEProcs';
import MitigationCheck from './modules/features/MitigationCheck';
import RageWasted from './modules/features/RageWasted';
import FrenziedRegeneration from './modules/spells/FrenziedRegeneration';
import IronFur from './modules/spells/IronFur';
import Moonfire from './modules/spells/Moonfire';
import Pulverize from './modules/spells/Pulverize';
import Thrash from './modules/spells/Thrash';
import Earthwarden from './modules/talents/Earthwarden';
import Incarnation from './modules/talents/Incarnation';

class CombatLogParser extends CoreCombatLogParser {
  static specModules = {
    // Core
    abilityTracker: AbilityTracker,
    abilities: Abilities,
    mitigationCheck: MitigationCheck,

    // Features
    activeTargets: ActiveTargets,
    goreProcs: Gore,
    galacticGuardianProcs: GalacticGuardian,
    guardianOfEluneProcs: GuardianOfElune,
    ironFurGoEProcs: IronFurGoEProcs,
    frenziedRegenGoEProcs: FrenziedRegenGoEProcs,
    rageWasted: RageWasted,
    antiFillerSpam: AntiFillerSpam,

    ironFur: IronFur,
    thrash: Thrash,
    moonfire: Moonfire,
    pulverize: Pulverize,
    frenziedRegeneration: FrenziedRegeneration,

    // Talents:
    earthwarden: Earthwarden,
    incarnation: Incarnation,
  };
}

export default CombatLogParser;
