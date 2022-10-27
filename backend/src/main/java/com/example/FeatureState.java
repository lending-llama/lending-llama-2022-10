package com.example;

public class FeatureState {
    private boolean multipleTiersEnabled = false;
    public void setMultipleTiersEnabled(boolean enabled) {
        multipleTiersEnabled = enabled;
    }

    public boolean isMultipleTiersDisabled() {
        return !multipleTiersEnabled;
    }
}
