FROM openjdk:11-jdk-slim
COPY build/libs/*.jar app.jar
ENTRYPOINT  ["java", "-Duser.timezone=Asia/Seoul", "-jar", "app.jar"]