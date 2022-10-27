package com.example.feature;

import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.annotation.JsonFormat.Features;
import org.junit.jupiter.api.Test;

class FeatureStateTest {

    private final FeatureState underTest = new FeatureState();

    @Test
    void enablesFeatures() {
        // given
        final var anyFeatureName = Feature.MULTIPLE_TIERS;

        // when
        underTest.enable(anyFeatureName);
        final var result = underTest.isEnabled(anyFeatureName);

        // then
        assertThat(result).isTrue();
    }

    @Test
    void featuresAreOffByUnlessEnabled() {
        // given
        final var featureThatWasNeverEnabled = Feature.MULTIPLE_TIERS;

        // when
        final var result = underTest.isEnabled(featureThatWasNeverEnabled);

        // then
        assertThat(result).isFalse();
    }

    @Test
    void disablesFeatures() {
        // given
        final var enabledFeature = Feature.MULTIPLE_TIERS;
        underTest.enable(enabledFeature);

        // when
        underTest.disable(enabledFeature);
        final var result = underTest.isEnabled(enabledFeature);

        // then
        assertThat(result).isFalse();
    }
}
