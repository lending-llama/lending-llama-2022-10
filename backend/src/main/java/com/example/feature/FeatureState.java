package com.example.feature;

import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class FeatureState {

    private final Map<Feature, Boolean> featureStates = new HashMap<>();

    public void enable(final Feature feature) {
        featureStates.put(feature, true);
    }

    public boolean isEnabled(final Feature feature) {
        return featureStates.getOrDefault(feature, false);
    }

    public void disable(final Feature feature) {
        featureStates.put(feature, false);
    }
}
