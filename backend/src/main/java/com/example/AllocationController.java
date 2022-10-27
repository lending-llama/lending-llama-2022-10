package com.example;

import io.split.client.SplitClient;
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

    private final RestTemplate restTemplate;
    private final SplitClient splitClient;

    public AllocationController(RestTemplate restTemplate, SplitClient splitClient) {
        this.restTemplate = restTemplate;
        this.splitClient = splitClient;
    }

    @GetMapping("/best-rate")
    public Allocation getBestRate() {
        var tier1 = getPlatformTiersDescByRate().get(0);
        return new Allocation(tier1.getName(), tier1.getRate());
    }

    @GetMapping("/allocations")
    public Stream<Allocation> getAllocation(@RequestParam Double amount) {
        var treatment = splitClient.getTreatment("key", "multiple-tiers");
        if (!"on".equals(treatment)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        var platformTiers = getPlatformTiersDescByRate();

        int count = getCountOfOffersForAmount(amount, platformTiers);

        return platformTiers.subList(0, count + 1).stream().map(
            t -> new Allocation(t.getName(), t.getRate())
        );
    }

    public int getCountOfOffersForAmount(Double amount, List<PlatformTier> platformTiers) {
        var count = (int) IntStream.range(1, platformTiers.size())
            .takeWhile(i -> platformTiers.stream().limit(i).mapToDouble(PlatformTier::getMax).sum() < amount)
            .count();
        return count;
    }

    private List<PlatformTier> getPlatformTiersDescByRate() {
        Platform[] platforms = fetchPlatforms("https://priceless-khorana-4dd263.netlify.app/btc-rates.json");
        return mapPlatformsToPlatformTiers(platforms);
    }

    private Platform[] fetchPlatforms(String url) {
        return restTemplate.getForObject(url, Platform[].class);
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
        Platform[] platforms = fetchPlatforms("https://priceless-khorana-4dd263.netlify.app/eth-rates.json");
        var platformTiers = mapPlatformsToPlatformTiers(platforms);

        var tier1 = platformTiers.get(0);
        return new Allocation(tier1.getName(), tier1.getRate());
    }
}
