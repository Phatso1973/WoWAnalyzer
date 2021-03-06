import { t } from '@lingui/macro';
import { formatPercentage } from 'common/format';
import SPELLS from 'common/SPELLS';
import { SpellIcon } from 'interface';
import { SpellLink } from 'interface';
import UptimeIcon from 'interface/icons/Uptime';
import Analyzer, { Options } from 'parser/core/Analyzer';
import { ThresholdStyle, When } from 'parser/core/ParseResults';
import Combatants from 'parser/shared/modules/Combatants';
import BoringValue from 'parser/ui/BoringValueText';
import Statistic from 'parser/ui/Statistic';
import STATISTIC_ORDER from 'parser/ui/STATISTIC_ORDER';
import React from 'react';

class Lifebloom extends Analyzer {
  static dependencies = {
    combatants: Combatants,
  };

  protected combatants!: Combatants;

  hasDTL = false;

  constructor(options: Options) {
    super(options);
    this.hasDTL = this.selectedCombatant.hasLegendaryByBonusID(
      SPELLS.LIFEBLOOM_DTL_HOT_HEAL.bonusID,
    );
  }

  get uptime() {
    // Only either LIFEBLOOM_HOT_HEAL or LIFEBLOOM_DTL_HOT_HEAL can be up (with or without the DTL legendary), but
    // DTL Lifeblooms (LIFEBLOOM_DTL_HOT_HEAL) are on two targets so their BuffUptime need to behalved for a percentage
    return (
      this.combatants.getBuffUptime(SPELLS.LIFEBLOOM_HOT_HEAL.id) +
      this.combatants.getBuffUptime(SPELLS.LIFEBLOOM_DTL_HOT_HEAL.id)
    );
  }

  get uptimePercent() {
    return this.uptime / this.owner.fightDuration;
  }

  // "The Dark Titan's Advice" legendary buffs Lifebloom, making high uptime more important
  get suggestionThresholds() {
    return {
      actual: this.uptimePercent,
      isLessThan: {
        minor: 0.8,
        average: 0.6,
        major: 0.4,
      },
      style: ThresholdStyle.PERCENTAGE,
    };
  }

  suggestions(when: When) {
    when(this.suggestionThresholds).addSuggestion((suggest, actual, recommended) =>
      suggest(
        <>
          Your <SpellLink id={SPELLS.LIFEBLOOM_HOT_HEAL.id} /> uptime can be improved.{' '}
          {this.hasDTL ? (
            <>
              High uptime is particularly important for taking advantage of your equipped{' '}
              <SpellLink id={SPELLS.THE_DARK_TITANS_LESSON.id} />
            </>
          ) : (
            ''
          )}
        </>,
      )
        .icon(SPELLS.LIFEBLOOM_HOT_HEAL.icon)
        .actual(
          t({
            id: 'druid.restoration.suggestions.lifebloom.uptime',
            message: `${formatPercentage(this.uptimePercent)}% uptime`,
          }),
        )
        .recommended(`>${formatPercentage(recommended)}% is recommended`),
    );
  }

  statistic() {
    return (
      <Statistic size="flexible" position={STATISTIC_ORDER.CORE(10)}>
        <BoringValue
          label={
            <>
              <SpellIcon id={SPELLS.LIFEBLOOM_HOT_HEAL.id} /> Lifebloom Uptime
            </>
          }
        >
          <>
            <UptimeIcon /> {formatPercentage(this.uptimePercent)} %
          </>
        </BoringValue>
      </Statistic>
    );
  }
}

export default Lifebloom;
