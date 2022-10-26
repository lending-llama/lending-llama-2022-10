package com.example;

import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withStatus;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URI;
import java.util.Arrays;
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

    @Autowired
    private MockMvc mvc;

    @Autowired
    private RestTemplate restTemplate;

    private MockRestServiceServer mockServer;
    private ObjectMapper mapper = new ObjectMapper();

    @BeforeEach
    public void beforeEach() {
        mockServer = MockRestServiceServer.createServer(restTemplate);
    }

    @Test
    void findsBest() throws Exception {
        final String anyPlatformName = "platform";
        final double anyRate = 1.0;
        final var anyPlaform = new Platform()
            .setName(anyPlatformName)
            .setTiers(new Platform.Tier[]{new Platform.Tier().setRate(anyRate)});

        final String btcRatesUrl = "https://priceless-khorana-4dd263.netlify.app/btc-rates.json";
        mockServer
            .expect(
                requestTo(new URI(btcRatesUrl)))
            .andExpect(method(HttpMethod.GET))
            .andRespond(withStatus(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(mapper.writeValueAsString(List.of(anyPlaform)))
            );

        final var expected = Collections.singletonList(
            new Allocation().setName(anyPlatformName).setRate(anyRate)
        );

        final String anyAmount = "1";
        mvc.perform(MockMvcRequestBuilders.get("/allocations?amount=" + anyAmount)
                .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(content().json(mapper.writeValueAsString(expected)));
    }
}
