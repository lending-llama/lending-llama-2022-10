package com.example.feature;

import io.split.client.SplitClient;
import java.util.Arrays;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class SplitFeatureStateUpdater implements FeatureStateUpdater {

    private final SplitClient client;
    private final FeatureState featureState;

    public SplitFeatureStateUpdater(final SplitClient client, final FeatureState featureState) {
        this.client = client;
        this.featureState = featureState;
    }

    @Override
    @EventListener(ApplicationReadyEvent.class)
    public void updateAllFeatures() {
        Arrays.stream(Feature.values()).forEach(feature -> {
            final var treatment = client.getTreatment("key",
                feature.toString().toLowerCase().replace("_", "-"));
            if ("on".equals(treatment)) {
                featureState.enable(feature);
                return;
            }

            featureState.disable(feature);
        });
    }
}
