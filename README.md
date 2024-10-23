# Run Blog locally

Hugo blog, with React componets 

## Prerequisites

- Git
- Hugo
- Node.js & npm

## Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/RevaHQ/blog
```

2. You'll need two terminal windows open.

### Terminal 1: Hugo Server
```bash
cd blog
hugo server -D
```
This will start the Hugo dev server. 

### Terminal 2: React Components
```bash
cd blog/components
npm install
npm run dev
```
This will install the necessary Node dependencies and start the React development server.

## Testing the Blog

Go to `http://localhost:1313` Hot loading is enabled so it should render any change you make instantly
