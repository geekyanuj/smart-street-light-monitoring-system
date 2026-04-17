# Smart Street Light Monitoring System (SSLMS) - Setup Guide

This project consists of an Express.js backend, a React-based interactive frontend, and a MongoDB database.

## Prerequisites
- Node.js (v18+)
- Docker and Docker Compose
- MQTT Broker (Default: `broker.emqx.io`)

## Quick Start

### 1. Database Setup
Start the MongoDB container:
```bash
docker-compose up -d
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
npm run dev
```

### 3. Frontend Setup
Navigate to the frontend directory and install dependencies:
```bash
cd frontend
npm install
npm run dev
```

## System Architecture

- **Hardware**: ESP8266/ESP32 + SIM800L + PZEM-004T. Sends compressed JSON telemetry.
- **MQTT**: Serves as the message broker.
- **Backend**: Subscribes to telemetry, stores data in MongoDB, and broadcasts live updates via Socket.io.
- **Frontend**: A premium React dashboard with real-time charts and manual relay control.

## MQTT Topics
- **Telemetry**: `smart_street/report` (JSON: `{"v":230.1, "c":1.2, "p":276.0, "e":10.5, "r":1}`)
- **Control**: `smart_street/control` (Message: `1` for ON, `0` for OFF)

## Interactive Features
- **Real-time Dashboard**: Live telemetry stats with smooth animations.
- **Power Trends**: Area charts showing power consumption over time.
- **Manual Control**: Toggle the street light relay directly from the UI.
- **Live Feed**: WebSocket-driven sensor stream for instant debugging.
- **Premium UI**: Glassmorphism design with Framer Motion transitions.
