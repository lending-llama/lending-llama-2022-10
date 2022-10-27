package com.example;

import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
public class FeatureState {
    private boolean allowMultipleTiers = false;
}
