package com.awesome.kit.core.diagnostics;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;

import java.util.ArrayList;
import java.util.List;

public class EnvMismatchValidator implements ApplicationContextInitializer<ConfigurableApplicationContext> {

    private static final Logger log = LoggerFactory.getLogger(EnvMismatchValidator.class);

    private static final List<String> REQUIRED_ENV_VARS = List.of(
            "SERVER_PORT",
            "DB_URL",
            "DB_USER",
            "DB_PASSWORD",
            "JWT_SECRET"
    );

    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        ConfigurableEnvironment env = applicationContext.getEnvironment();
        List<String> missingVars = new ArrayList<>();

        for (String varName : REQUIRED_ENV_VARS) {
            String val = env.getProperty(varName);
            if (val == null || val.isBlank()) {
                missingVars.add(varName);
            }
        }

        if (!missingVars.isEmpty()) {
            String errorMessage = String.format(
                    "\n================================================================================\n" +
                    "APPLICATION STARTUP FAILED: ENVIRONMENT CONFIGURATION ERROR\n" +
                    "================================================================================\n" +
                    "Missing required environment variable(s):\n%s\n\n" +
                    "Action Required:\n" +
                    "1. Check your .env file against .env.example.\n" +
                    "2. Ensure all required variables are set in your OS environment or .env file.\n" +
                    "3. Notice: Default fallback syntax (${VAR:default}) is strictly forbidden by policy.\n" +
                    "================================================================================\n",
                    String.join("\n - ", missingVars.stream().map(v -> " - " + v).toList())
            );

            log.error(errorMessage);
            throw new IllegalStateException("Missing required environment variables: " + missingVars);
        }
    }
}
