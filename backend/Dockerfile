# Use official Eclipse Temurin JDK 22 image
FROM eclipse-temurin:22-jdk-alpine

# Set working directory
WORKDIR /app

# Copy Maven wrapper + config
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

# Pre-download dependencies to speed up builds
RUN ./mvnw dependency:go-offline

# Copy source code
COPY . .

# Build the application
RUN ./mvnw clean install -DskipTests

# Expose Spring Boot default port
EXPOSE 8080

# Run the generated JAR file
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]
