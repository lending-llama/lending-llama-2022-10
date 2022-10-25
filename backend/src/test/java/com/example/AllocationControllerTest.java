package com.example;

import org.junit.jupiter.api.Test;

import java.util.Arrays;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

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
}
