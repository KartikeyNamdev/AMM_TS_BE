# AMM Backend - Potato & Apple Exchange

A simple Automated Market Maker (AMM) implementation using the Constant Product Formula ($x \times y = k$). This backend allows users to swap potatoes for apples and manage liquidity in a sample pool.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1.  Navigate to the backend directory:
    ```bash
    cd BE
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Project

To compile and start the server:

```bash
# Compile TypeScript to JavaScript
npx tsc

# Start the server
node dist/index.js
```

The server will be running at `http://localhost:3000`.

## 🛠 Features

-   **Constant Product Market Maker (CPMM)**: Uses the standard $x \times y = k$ formula to determine swap rates.
-   **Liquidity Management**: Basic functionality to add liquidity to the pool.
-   **TypeScript & ESM**: Built with modern TypeScript and configured as an ECMAScript Module (ESM).

## 📡 API Endpoints

### 1. Welcome
-   **URL**: `/`
-   **Method**: `GET`
-   **Description**: Returns a simple welcome message.

### 2. Ticker
-   **URL**: `/ticker`
-   **Method**: `GET`
-   **Description**: Returns the current state of the Potato-Apple Liquidity Pool.

### 3. Swap
-   **URL**: `/swap`
-   **Method**: `POST`
-   **Body**:
    ```json
    {
      "potatoesAmount": 7000
    }
    ```
-   **Description**: Swaps your potatoes for apples based on the pool's current constant $k$.

### 4. Add Liquidity
-   **URL**: `/addLiquidity`
-   **Method**: `POST`
-   **Body**:
    ```json
    {
      "potatoesAmount": 1000,
      "applesAmount": 1000
    }
    ```
-   **Description**: Adds more potatoes and apples to the pool to increase its depth.

## 📁 Project Structure

-   `src/index.ts`: Express server configuration and API routes.
-   `src/potatoAppleLP.ts`: Core AMM logic and swap formulas.
-   `package.json`: Project dependencies and configuration (ESM).
-   `tsconfig.json`: TypeScript compiler settings.

## ⚖️ License

ISC License
