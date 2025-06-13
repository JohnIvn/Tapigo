# Tapigo

> Fast, secure, and built for the future of entry.

![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Arduino](https://img.shields.io/badge/Arduino-00979D?logo=arduino&logoColor=white)
![ESP32](https://img.shields.io/badge/ESP32-Microcontroller-blue)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black)
![Angular](https://img.shields.io/badge/Angular-DD0031?logo=angular&logoColor=white)

---

## About

Tapigo is a smart, modern ticketing system designed for fast and secure access control using RFID/NFC technology.
It combines a responsive web-based ticketing platform with a self-service kiosk interface, offering users a
seamless experience from ticket purchase to venue entry.

Whether you're managing events, transportation, or secure facilities, Tapigo simplifies access with just a tap.

---

## Table of Contents

- [Requirements](#requirements)
- [Features](#features)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [License](#license)

---

## REQUIREMENTS

To run this project locally, ensure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- A modern browser (for testing)
- Web server (e.g., Express.js for backend)
- RFID/NFC Reader compatible with your kiosk setup
- Any Database Access (This is built with Firebase)

---

## Features

- Ticket purchase and management system
- RFID/NFC tap-to-enter integration
- Responsive UI for both web and kiosk environments
- Admin dashboard for managing events and access control
- Fast check-in/check-out flow
  
---

## Installation

### 1. Clone the Repository

```bash
   git clone https://github.com/JohnIvn/tapigo.git
```

### 2. Install Dependencies

Backend

```bash
cd backend
npm install
```

Frontend

```bash
cd frontend
npm install
```

Hardware

```bash
cd hardware
npm install
```

### 3. Configure Environment
Create a .env file in the root directory and add your configuration:

Backend

```bash
PORT=
JWT_SECRET=

FIREBASE_DATABASE_URL=
FIREBASE_STORAGE_BUCKET=
```

Hardware

```bash
PORT=
JWT_SECRET=

FIREBASE_DATABASE_URL=
FIREBASE_STORAGE_BUCKET=
```

Export your firebase service account and rename it:

```bash
key.json
```
### 4. Wiring Diagram

ESP32:

| MFRC522 Pin | ESP32 Pin          |
| ----------- | ------------------ |
| SDA         | 5                  |
| SCK         | 18                 |
| MOSI        | 23                 |
| MISO        | 19                 |
| IRQ         | Not connected      |
| GND         | GND                |
| RST         | 4                  |
| 3.3V        | 3.3V (**not 5V!**) |

Arduino UNO R3

| MFRC522 Pin | Arduino Uno Pin    |
| ----------- | ------------------ |
| SDA         | 10                 |
| SCK         | 13                 |
| MOSI        | 11                 |
| MISO        | 12                 |
| IRQ         | Not connected      |
| GND         | GND                |
| RST         | 9                  |
| 3.3V        | 3.3V (**not 5V!**) |

### 5. Run the hardware

The arduino script is inside Ino/rfid.

### 6. Run the server

npm
```bash
   cd backend
   npm run backend

   cd frontend
   npm run frontend

   cd hardware
   npm run hardware
```
yarn
```bash
   cd backend
   yarn backend

   cd frontend
   yarn frontend

   cd hardware
   yarn hardware
```
---

## Technologies-Used

| Category | Tools                              |
| -------- | ---------------------------------- |
| Frontend | Angular                            | 
| Backend  | Node JS & Socket IO                |
| Database | Firebase                           |
| Hardware | Esp 32, Arduino UNO R3 & RC522     |

---

## Testing

Once everything is set up and the server is running, you can test simply by going to the url.

---

## License

See the [LICENSE](LICENSE) file for more information.

---

> Built with ❤️ by JohnIvn
