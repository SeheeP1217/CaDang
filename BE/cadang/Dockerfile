FROM openjdk:11-jdk-slim
VOLUME /tmp
EXPOSE 8080
ARG JAR_FILE=./build/libs/cadang-0.0.1-SNAPSHOT.jar//
COPY ${JAR_FILE} a808.jar
ENTRYPOINT  ["java", "-Duser.timezone=Asia/Seoul", "-jar", "a808.jar"]
