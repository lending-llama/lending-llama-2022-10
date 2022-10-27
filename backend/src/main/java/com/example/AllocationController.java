package com.example;

import com.example.allocation.Allocation;
import com.example.allocation.Platform;
import com.example.allocation.PlatformTier;
import com.example.feature.Feature;
import com.example.feature.FeatureState;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import static java.util.Arrays.stream;

@RestController
public class AllocationController {

    private static final String COIN_BTC = "btc";
    private static final String COIN_ETH = "eth";
    private RestTemplate restTemplate;
    private FeatureState featureState;

    public AllocationController(RestTemplate restTemplate, FeatureState featureState) {
        this.restTemplate = restTemplate;
        this.featureState = featureState;
    }

    @GetMapping("/best-rate")
    public Allocation getBestRate() {
        var tier1 = getPlatformTiersDescByRate(COIN_BTC).get(0);
        return new Allocation().setName(tier1.getName()).setRate(tier1.getRate());
    }

    @GetMapping("/allocations")
    public Stream<Allocation> getAllocation(@RequestParam Double amount) throws Exception {

        if (!featureState.isEnabled(Feature.MULTIPLE_TIERS)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        var platformTiers = getPlatformTiersDescByRate(COIN_BTC);

        int count = getCountOfOffersForAmount(amount, platformTiers);

        return platformTiers.subList(0, count+1).stream().map(
            t -> new Allocation().setName(t.getName()).setRate(t.getRate())
        );
    }

    public int getCountOfOffersForAmount(Double amount, List<PlatformTier> platformTiers) {
        var count = (int) IntStream.range(1, platformTiers.size())
            .takeWhile(i -> platformTiers.stream().limit(i).mapToDouble(PlatformTier::getMax).sum() < amount)
            .count();
        return count;
    }

    private List<PlatformTier> getPlatformTiersDescByRate(String coin) {
        var url = String.format("https://priceless-khorana-4dd263.netlify.app/%s-rates.json", coin);
        var platforms = restTemplate.getForObject(url, Platform[].class);
        return mapPlatformsToPlatformTiers(platforms);
    }

    public List<PlatformTier> mapPlatformsToPlatformTiers(Platform[] platforms) {
        return stream(platforms).flatMap(p -> stream(p.getTiers()).map(t -> {
                var maxInput = t.getMax();
                var max = Double.MAX_VALUE;
                if (maxInput != null) {
                    max = maxInput;
                }
                return new PlatformTier()
                    .setName(p.getName())
                    .setRate(t.getRate())
                    .setMax(max);
            }))
            .sorted(Comparator.comparingDouble(PlatformTier::getRate).reversed())
            .collect(Collectors.toList());
    }


    public Allocation getBestEthRate() {
        var platformTiers = getPlatformTiersDescByRate(COIN_ETH);
        var tier1 = platformTiers.get(0);
        return new Allocation().setName(tier1.getName()).setRate(tier1.getRate());
    }
}
