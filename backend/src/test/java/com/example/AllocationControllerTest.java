package com.example;

import com.example.model.Platform;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

class AllocationControllerTest {

    @Test
    void mapPlatformsToPlatformTiers() {
        var controller = new AllocationController(null,null);
        Platform.Tier[] tier = {new Platform.Tier()};
        tier[0].setMax(null);
        tier[0].setRate(1.0);
        Platform[] platform = {new Platform()};
        platform[0].setName("Ledn");
        platform[0].setTiers(tier);

        var platformTiers = controller.mapPlatformsToPlatformTiers(platform);

        assertThat(platformTiers.get(0).getMax()).isNotNull();
    }

    @Test
    void getCandidateCount() {
        var controller = new AllocationController(null,null);

        Platform.Tier[] tier = {new Platform.Tier()};
        tier[0].setMax(null);
        tier[0].setRate(1.0);
        Platform[] platform = {new Platform()};
        platform[0].setName("Ledn");
        platform[0].setTiers(tier);

        var platformTiers = controller.mapPlatformsToPlatformTiers(platform);

        var count = controller.getCountOfOffersForAmount(1.2, platformTiers);

        assertThat(count).isEqualTo(0);
    }

    @Test
    void getCandidateCount2() {
        var controller = new AllocationController(null,null);

        Platform.Tier[] tier = {new Platform.Tier(), new Platform.Tier()};
        tier[0].setMax(1.0);
        tier[0].setRate(1.0);
        tier[1].setMax(null);
        tier[1].setRate(1.0);
        Platform[] platform = {new Platform()};
        platform[0].setName("Ledn");
        platform[0].setTiers(tier);

        var platformTiers = controller.mapPlatformsToPlatformTiers(platform);

        var count = controller.getCountOfOffersForAmount(1.2, platformTiers);

        assertThat(count).isEqualTo(1);
    }
}
