FROM openjdk:11-jdk-slim

COPY build/libs/*.jar app.jar

# Run the jar file when the container starts
ENTRYPOINT  ["java", "-jar", "app.jar"]