# Stage 1: Build stage using Maven 3.9.x with Temurin JDK 17
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy wrapper files and configuration for optimized dependencies layer caching
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Download dependencies offline (cache layer)
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

# Copy the source code
COPY src src

# Package the application (build runnable fat JAR)
RUN ./mvnw clean package -DskipTests

# Stage 2: Minimalist JRE 17 runtime stage
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy final fat JAR from build stage
COPY --from=build /app/target/portfolio-backend-*.jar app.jar

# Expose port 8080 as required
EXPOSE 8080

# Environment variables for deployment safety
ENV PORT=8080

# ENTRYPOINT java execution
ENTRYPOINT ["java","-jar","app.jar"]
