package com.example;

import org.junit.jupiter.api.Test;

import java.util.Arrays;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class AllocationControllerTest {

    @Test
    void mapPlatformsToPlatformTiers() {
        var controller = new AllocationController(null,null);
        Platform.Tier[] tier = {new Platform.Tier().setMax(null)};
        Platform[] platform = {new Platform().setTiers(tier)};

        var platformTiers = controller.mapPlatformsToPlatformTiers(platform);

        assertThat(platformTiers.get(0).getMax()).isNotNull();
    }

    @Test
    void getCandidateCount() {
        var controller = new AllocationController(null,null);
        Platform.Tier[] tier = {new Platform.Tier().setMax(null).setRate(1.0)};
        Platform[] platform = {new Platform().setTiers(tier)};
        var platformTiers = controller.mapPlatformsToPlatformTiers(platform);

        var count = controller.getCountOfOffersForAmount(1.2, platformTiers);

        assertThat(count).isEqualTo(0);
    }

    @Test
    void getCandidateCountForMixedTiers() {
        var controller = new AllocationController(null,null);
        Platform.Tier[] tiers = {new Platform.Tier().setMax(1.0).setRate(1.0), new Platform.Tier().setMax(null).setRate(1.0)};
        Platform[] platform = {new Platform().setTiers(tiers)};
        var platformTiers = controller.mapPlatformsToPlatformTiers(platform);

        var count = controller.getCountOfOffersForAmount(1.2, platformTiers);

        assertThat(count).isEqualTo(1);
    }
}
