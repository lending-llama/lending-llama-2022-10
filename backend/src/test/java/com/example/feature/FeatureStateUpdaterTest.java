package com.example.feature;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import io.split.client.SplitClient;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class FeatureStateUpdaterTest {

    @Mock
    private SplitClient splitClient;

    private final FeatureState featureState = new FeatureState();

    private FeatureStateUpdater underTest;

    @BeforeEach
    void setUp() {
        underTest = new SplitFeatureStateUpdater(splitClient, featureState);
    }

    @Test
    void itUpdatesFeatures() {
        // given
        when(splitClient.getTreatment(anyString(), anyString())).thenReturn("on");

        // when
        underTest.updateAllFeatures();

        // then
        verify(splitClient).getTreatment(anyString(), anyString());
        assertThat(featureState.isEnabled(Feature.MULTIPLE_TIERS)).isTrue();
    }

}
