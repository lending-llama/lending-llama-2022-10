package com.example;

import io.split.client.SplitClient;
import org.springframework.stereotype.Component;

@Component
public class MultipleTiersFeatureUpdater {

    public MultipleTiersFeatureUpdater(final SplitClient client, final FeatureState featureState) {
        var treatment = client.getTreatment("key","multiple-tiersx");
        featureState.setMultipleTiersEnabled(treatment.equals("on"));
    }
}
