# Family Circle

Family Circle is a web application designed to help families—both immediate and extended—connect and stay updated on each other's lives. It serves as a central hub for sharing family news, events, photos, and messages.

## Features

- **Authentication & User Management**: Sign up, login, profile setup
- **Family Feed & Communication**: Activity feed, posts, comments, messaging
- **Media & Event Management**: Photo sharing, event creation and management
- **Shared To-Do List & Goals**: Family tasks and goal tracking
- **Family Directory & Privacy**: Contact information and privacy controls

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Styling**: Tailwind CSS for responsive design
- **Icons**: Lucide React for beautiful icons

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/family-circle-app.git
   cd family-circle-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
family-circle-app/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js app router pages
│   ├── components/      # Reusable UI components
│   │   ├── auth/        # Authentication components
│   │   ├── common/      # Common UI components
│   │   ├── feed/        # Feed and activity components
│   │   ├── layout/      # Layout components (header, navigation)
│   │   ├── profile/     # Profile components
│   │   ├── events/      # Event components
│   │   ├── tasks/       # Task components
│   │   └── messaging/   # Messaging components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── services/        # API services
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
└── ...
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
