package com.example;

import io.split.client.SplitClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeatureStateUpdater {
    private final SplitClient splitClient;
    private final FeatureState featureState;

    public FeatureStateUpdater(@Autowired SplitClient splitClient, @Autowired FeatureState featureState) {
        this.splitClient = splitClient;
        this.featureState = featureState;

        updateState();
    }

    public void updateState() {
        String multipleTiersFlag = splitClient.getTreatment("key", "multiple-tiers");
        featureState.setAllowMultipleTiers("on".equals(multipleTiersFlag));
    }
}
