package com.awesome.kit.core.diagnostics;

import org.springframework.boot.diagnostics.AbstractFailureAnalyzer;
import org.springframework.boot.diagnostics.FailureAnalysis;
import org.springframework.transaction.CannotCreateTransactionException;

public class DatabaseFailureAnalyzer extends AbstractFailureAnalyzer<CannotCreateTransactionException> {

    @Override
    protected FailureAnalysis analyze(Throwable rootFailure, CannotCreateTransactionException cause) {
        String description = String.format(
                "Cannot connect to the PostgreSQL database.\nRoot cause: %s",
                cause.getMessage()
        );

        String action = """
                1. Ensure your PostgreSQL container is running by executing: 'docker compose up -d'.
                2. Check your .env file to verify DB_URL, DB_USER, and DB_PASSWORD match docker-compose.yml.
                3. Verify that port 5432 is not occupied by another local service.""";

        return new FailureAnalysis(description, action, cause);
    }
}
