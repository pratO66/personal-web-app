# ── build stage ──────────────────────────────────────────────────────────────
FROM maven:3.9.9-amazoncorretto-21 AS build
WORKDIR /app

# Layer dependency downloads separately for better cache reuse
COPY pom.xml .
RUN mvn dependency:go-offline -B -q

COPY src ./src
RUN mvn clean package -DskipTests -B -q

# ── runtime stage ─────────────────────────────────────────────────────────────
FROM amazoncorretto:21-alpine AS runtime
WORKDIR /app

# Non-root user (12-factor: security)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

COPY --from=build --chown=appuser:appgroup /app/target/*.jar app.jar

EXPOSE 8080

# Container-aware JVM flags + fast entropy + exec for proper SIGTERM handling
ENTRYPOINT ["java", \
  "-XX:+UseContainerSupport", \
  "-XX:MaxRAMPercentage=75.0", \
  "-Djava.security.egd=file:/dev/./urandom", \
  "-jar", "app.jar"]
