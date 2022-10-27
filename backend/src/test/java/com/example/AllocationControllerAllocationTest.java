package com.example;

import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withStatus;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.example.allocation.Allocation;
import com.example.allocation.Platform;
import com.example.feature.FeatureState;
import com.example.feature.Feature;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collections;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.client.RestTemplate;

@SpringBootTest
@AutoConfigureMockMvc
class AllocationControllerAllocationTest {

    private static final String BTC_RATES_URL = "https://priceless-khorana-4dd263.netlify.app/btc-rates.json";

    @Autowired
    private MockMvc mvc;

    @Autowired
    private FeatureState featureState;

    @Autowired
    private RestTemplate restTemplate;

    private MockRestServiceServer mockServer;
    private ObjectMapper mapper = new ObjectMapper();

    @BeforeEach
    public void beforeEach() {
        mockServer = MockRestServiceServer.createServer(restTemplate);
    }

    @Test
    void fetchesRatesFromExternalServiceAndDeterminesAllocationsWhenFeatureIsEnabled() throws Exception {
        // given
        featureState.enable(Feature.MULTIPLE_TIERS);
        final String anyPlatformName = "platform";
        final double anyRate = 1.0;
        final var anyPlaform = new Platform()
            .setName(anyPlatformName)
            .setTiers(new Platform.Tier[]{new Platform.Tier().setRate(anyRate)});

        setupMockServer(anyPlaform, BTC_RATES_URL);

        final var expected = Collections.singletonList(
            new Allocation().setName(anyPlatformName).setRate(anyRate)
        );

        // when + then
        final String anyAmount = "1";
        mvc.perform(MockMvcRequestBuilders.get("/allocations?amount=" + anyAmount)
                .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(content().json(mapper.writeValueAsString(expected)));
    }

    @Test
    void respondsWith404WhenFeatureIsDisabled() throws Exception {
        // given
        featureState.disable(Feature.MULTIPLE_TIERS);

        // when + then
        final String anyAmount = "1";
        mvc.perform(MockMvcRequestBuilders.get("/allocations?amount=" + anyAmount)
                .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNotFound());
    }

    private void setupMockServer(final Platform responseModel, final String url)
        throws URISyntaxException, JsonProcessingException {
        mockServer
            .expect(
                requestTo(new URI(url)))
            .andExpect(method(HttpMethod.GET))
            .andRespond(withStatus(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(mapper.writeValueAsString(List.of(responseModel)))
            );
    }
}
