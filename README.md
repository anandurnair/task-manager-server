# Task Manager Backend

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/anandurnair/task-manager-server.git
    ```

2. Navigate to the backend directory:

    ```bash
    cd task-manager-backend
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

## Configuration

1. Create a `.env` file in the root directory of the backend project with the following content:

    ```env
    MONGO_URL=mongodb+srv://anandurpallam:ndnIO8FDngxPmUv6@cluster0.qaeck.mongodb.net/task-manager
    GOOGLE_CLIENT_SECRET=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
    GOOGLE_CLIENT_ID=865694764686-ung34u6sdc3g4puj5hkus8f8vl7b24vi.apps.googleusercontent.com
    PORT=4000
    ```

2. Ensure MongoDB and Google API credentials are properly set up.

## Usage

1. Start the server:

    ```bash
    npm start
    ```

2. The API will be available at [http://localhost:4000/api](http://localhost:5000/api).

## Testing

1. Run unit tests:

    ```bash
    npm test
    ```
