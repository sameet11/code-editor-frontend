
# Project Name
Code-Editor-frontend

## Description
Its the frontend of the code-editor
## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Installation

Instructions on how to set up and install the project.

### Prerequisites

- Node js (20 or higher)
- Docker

### Steps

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/yourproject.git
    ```

3. Install dependencies:
    ```sh
    npm install

## Usage

### set enviroment variables

copy .env.exmaple to .env.local file 
add backend url and ws url

### Starting the Server

1. Start the server:
    ```sh
    npm run dev
    ```
2. Open your browser and navigate to `http://localhost:3000`

Example `.env` file:

```plaintext
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_SOCKET_URL=ws://localhost:3001
