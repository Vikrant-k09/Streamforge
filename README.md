# 🚀 StreamForge
### Real-Time Event Processing Pipeline

StreamForge is a **real-time event ingestion and processing pipeline** designed to simulate how modern analytics and telemetry systems handle high-volume event streams.

The system captures application events, streams them through **Apache Kafka**, processes them using **Node.js services**, and stores them for analytics and downstream consumption.

This project demonstrates **event-driven architecture, distributed systems design, and scalable backend infrastructure**.

---

# ✨ What StreamForge Solves

Modern applications generate massive amounts of event data such as:

- user activity events  
- telemetry logs  
- analytics signals  
- system metrics  

StreamForge provides a scalable pipeline to:

1. Ingest events in real time  
2. Process them asynchronously  
3. Store them efficiently  
4. Expose them for analytics and downstream services  

This simulates how real companies process:

- product analytics
- clickstream data
- telemetry pipelines
- monitoring systems

---

# 🏗 Architecture

```
Event Producer
      │
      ▼
   Kafka Broker
      │
      ▼
Event Consumer (Node.js)
      │
      ├── Redis (Caching Layer)
      │
      ▼
PostgreSQL (Persistent Storage)
      │
      ▼
Analytics / API Layer
```

---

# ⚙️ Tech Stack

- **Kafka** – event streaming backbone  
- **Node.js** – producer and consumer services  
- **Redis** – caching layer  
- **PostgreSQL** – persistent storage  
- **Docker** – containerized services  
- **Docker Compose** – service orchestration  
- **Nginx** – API gateway and routing  

---

# 🧠 Key Features

- Real-time event ingestion  
- Producer–consumer streaming architecture  
- Kafka-based distributed event pipeline  
- Redis caching for fast reads  
- Persistent event storage using PostgreSQL  
- Docker containerized services  
- Nginx gateway for routing requests  

---

# 📦 Running StreamForge Locally

You can run the entire system locally using **Docker Compose**.

---

## 1️⃣ Clone the repository

```bash
git clone https://github.com/Vikrant-k09/streamforge.git
cd streamforge
```

---

## 2️⃣ Create a `.env` file

Create a `.env` file in the root directory.

Example configuration:

```
POSTGRES_USER=streamforge
POSTGRES_PASSWORD=streamforge
POSTGRES_DB=streamforge_db

REDIS_PORT=6379

KAFKA_BROKER=localhost:9092
```

---

## 3️⃣ Build and start the containers

Make sure **Docker is installed and running**.

Then run:

```bash
docker compose build
docker compose up
```

This will start all required services:

- Kafka  
- Zookeeper  
- Redis  
- PostgreSQL  
- StreamForge services  
- Nginx gateway  

---

## 4️⃣ Verify containers are running

You should see containers running for:

- kafka  
- redis  
- postgres  
- streamforge-api  
- streamforge-consumer  
- nginx  

---

## 5️⃣ Access the service

Once everything starts successfully, the application will be available at:

```
http://localhost:8080
```

You can now send events into the pipeline.

---

# 📂 Project Structure

```
streamforge
│
├── producer-service
│   └── event producer
│
├── consumer-service
│   └── event processing logic
│
├── database
│   └── postgres schema
│
├── nginx
│   └── gateway configuration
│
├── docker-compose.yml
│
└── README.md
```

---

# 📊 Example Event Flow

1. Application generates event

```
UserLoggedIn
```

2. Producer publishes event to Kafka

```
Kafka Topic → user-events
```

3. Consumer processes event

```
validate → transform → store
```

4. Event stored in PostgreSQL

5. Frequently accessed data cached in Redis

---

# 🔮 Future Improvements

Possible enhancements:

- event schema validation  
- dead letter queues  
- Kafka partition scaling  
- monitoring with Prometheus / Grafana  
- Kubernetes deployment  
- stream processing with Kafka Streams  

---

# 👨‍💻 Author

**Vikrant**

Software Engineer  
NIT Hamirpur  

GitHub:  
https://github.com/Vikrant-k09

---

# ⭐ Purpose

StreamForge was built to explore **event-driven backend architectures** and understand how modern distributed systems process large-scale event streams.
