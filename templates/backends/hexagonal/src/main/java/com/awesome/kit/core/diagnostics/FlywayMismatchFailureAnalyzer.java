package com.awesome.kit.core.diagnostics;

import org.flywaydb.core.api.exception.FlywayValidateException;
import org.springframework.boot.diagnostics.AbstractFailureAnalyzer;
import org.springframework.boot.diagnostics.FailureAnalysis;

public class FlywayMismatchFailureAnalyzer extends AbstractFailureAnalyzer<FlywayValidateException> {

    @Override
    protected FailureAnalysis analyze(Throwable rootFailure, FlywayValidateException cause) {
        String description = String.format(
                "Flyway database migration failed checksum validation or conflict check.\nDetails: %s",
                cause.getMessage()
        );

        String action = """
                1. A migration script in db/migration was modified after being executed, or you switched branches with differing migration histories.
                2. For local development, reset the database with clean volume:
                   docker compose down -v && docker compose up -d
                3. Or repair the existing flyway_schema_history table:
                   ./mvnw flyway:repair""";

        return new FailureAnalysis(description, action, cause);
    }
}
