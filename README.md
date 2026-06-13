# AutoWerkstatt Portal

A fullstack web application for managing repair orders in car workshops with QR-based public repair status tracking.

## Overview

AutoWerkstatt Portal is designed for small and medium-sized car repair shops that want to provide customers with transparent repair updates without requiring customer accounts.

The workshop creates a repair order, the system generates a unique public tracking link, and the customer can access the current repair status by scanning a QR code.

````md
## How it works

````mermaid
flowchart TD
    A[Workshop Admin] --> B[Creates service request]
    B --> C[Admin Dashboard]
    C --> D[(MongoDB Database)]
    D --> E[Generate public tracking token]
    E --> F[QR Code / Tracking Link]
    F --> G[Customer scans QR code]
    G --> H[Customer Tracking Page]
    H --> I[Shows repair status, comments, cost and photos]

The MVP focuses on repair order management, public status tracking, estimated costs, and workshop feedback.

## MVP Scope

### Workshop

The workshop can:

- create repair orders
- view all repair orders
- open repair order details
- update repair status
- add estimated repair costs
- add internal or customer-facing workshop comments
- generate a public tracking link for each order

### Customer

The customer can:

- open a public tracking page using a QR code or direct link
- view the current repair status
- view vehicle information
- view the problem description
- view estimated costs
- view workshop feedback

The customer does not need to create an account or log in.

## Public Tracking

Each repair order receives a unique `publicToken`.

Example route:

```txt
/track/:publicToken
````

The public tracking page exposes only customer-safe repair information:

- vehicle make
- vehicle model
- repair status
- problem description
- estimated cost
- workshop comment
- last update date

Personal customer data such as name, phone number, email address, and full license plate are not displayed on the public tracking page.

## Main Entity

### ServiceRequest

The `ServiceRequest` entity represents a repair order.

```txt
id
publicToken
vehicleMake
vehicleModel
licensePlate
problemDescription
status
estimatedCost
workshopComment
createdAt
updatedAt
```

The database entity is named `ServiceRequest`.
In the user interface, it is presented as an `Auftrag`.

## Repair Statuses

```txt
ANGELEGT
ANGENOMMEN
IN_ARBEIT
WARTET_AUF_TEILE
WARTET_AUF_FREIGABE
FERTIG
ABGEHOLT
STORNIERT
```

`WARTET_AUF_FREIGABE` represents the stage where the workshop has provided feedback or an estimated cost and is waiting for customer approval before continuing.

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- React Router
- Axios

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- cors
- pino-http
- http-errors

## Project Structure

```txt
auto-werkstatt-portal/
├── client/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── App.jsx
│       └── main.jsx
│
├── server/
│   └── src/
│       ├── controllers/
│       ├── db/
│       ├── middlewares/
│       ├── models/
│       ├── routes/
│       ├── services/
│       └── server.js
│
└── README.md
```

## Planned Frontend Pages

```txt
/
```

Landing page.

```txt
/admin/orders
```

Workshop dashboard with repair order overview.

```txt
/admin/orders/:id
```

Repair order details and update form.

```txt
/track/:publicToken
```

Public repair status page for customers.

## Backend API

### Service Requests

| Method | Endpoint                    | Description                                  |
| ------ | --------------------------- | -------------------------------------------- |
| GET    | `/api/service-requests`     | Get all repair orders                        |
| POST   | `/api/service-requests`     | Create a new repair order                    |
| GET    | `/api/service-requests/:id` | Get repair order details                     |
| PATCH  | `/api/service-requests/:id` | Update repair order status, cost, or comment |

### Public Tracking

| Method | Endpoint                  | Description                                |
| ------ | ------------------------- | ------------------------------------------ |
| GET    | `/api/track/:publicToken` | Get public repair status by tracking token |

## Token Generation

A secure random token is generated when a new repair order is created.

Example:

```js
crypto.randomBytes(16).toString("hex");
```

The generated token is used for the public tracking route and QR code.

## Installation

### Clone the repository

```bash
git clone https://github.com/Larimar4you/auto-werkstatt-portal.git
cd auto-werkstatt-portal
```

### Install and start the frontend

```bash
cd client
npm install
npm run dev
```

Frontend:

```txt
http://localhost:5173
```

### Install and start the backend

```bash
cd server
npm install
npm run dev
```

Backend:

```txt
http://localhost:3000
```

## Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
```

## Development Roadmap

### Phase 1: Backend Foundation

- [ ] Connect MongoDB
- [ ] Create `ServiceRequest` model
- [ ] Implement repair order creation
- [ ] Implement repair order listing
- [ ] Implement repair order details
- [ ] Implement repair order updates

### Phase 2: Public Tracking

- [ ] Generate `publicToken` for each repair order
- [ ] Implement public tracking endpoint
- [ ] Create public tracking page
- [ ] Restrict public response data to non-sensitive fields

### Phase 3: Workshop Interface

- [ ] Create repair order form
- [ ] Create repair order dashboard
- [ ] Create repair order details page
- [ ] Add status update controls
- [ ] Add estimated cost and workshop comment fields

### Phase 4: QR Tracking

- [ ] Generate QR code for public tracking link
- [ ] Display QR code in repair order details
- [ ] Add customer-facing tracking route

### Future Improvements

- Admin authentication
- Customer approval flow
- Repair photo timeline
- TÜV reminders
- Email notifications
- Google review request flow
- Multi-language interface
- Customer accounts
- AI-assisted repair category suggestions

## Current Status

The project currently includes:

- React frontend setup
- Express backend setup
- Basic API health check
- Initial service request route structure

## Author

Lara Kosta
Fullstack Developer
````
