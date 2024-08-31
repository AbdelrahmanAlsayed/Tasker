# Tasker

Tasker helps you organize and manage your daily tasks. Stay productive with an easy-to-use and intuitive interface.

**Check out the live application at [Tasker](https://taskerappp.vercel.app/).**

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Setup and Installation](#setup-and-installation)
4. [Configuration](#configuration)
5. [Running the Application](#running-the-application)
6. [Deployment](#deployment)
7. [Usage](#usage)
8. [Made By](#made-by)
9. [Contact Information](#contact-information)

## Project Overview

Tasker is a collaborative to-do list application built with Next.js, Tailwind CSS, Supabase, TypeScript, TanStack Query, and Zustand. It allows users to manage their tasks with real-time updates and authentication through GitHub OAuth and will have more features in the future..

## Features

- **Email and Password Authentication**: Secure login with email/password and GitHub OAuth. Email confirmation is required for account activation.
- **GitHub OAuth**: Allows users to log in using their GitHub accounts.
- **TypeScript**: Ensures type safety and better development experience.
- **Server-Side Rendering (SSR)**: Implemented with Next.js for optimized performance and SEO.
- **Supabase Integration**: Manages backend CRUD operations and real-time updates through Supabase’s real-time capabilities.
- **Tailwind CSS**: Used for a clean and responsive design.
- **Toasters**: Provides real-time feedback and notifications for better user experience.

## Setup and Installation

To set up and run the application locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/AbdelrahmanAlsayed/Tasker.git
   cd tasker
   ```
2. **Install Dependencies: You can use either pnpm or npm to install dependencies:**:

```bash
pnpm install
# or
npm install
```

3. **Configure Environment Variables: Create a .env file in the root directory and add the following variables::**:

```bash
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>

```

4. **Start the Development Server::**:

```bash
pnpm dev
# or
npm run dev

```

4. **Access the Application: Open your browser and navigate to http://localhost:3000**:

## Configuration

Ensure you have configured your Supabase project correctly. This includes setting up authentication methods, database tables, and any required Supabase settings. Refer to the Supabase documentation for detailed setup instructions.

## Running the Application

The application supports different environments, and you can run it locally for development or build it for production. For development, use `npm run dev` or `pnpm dev`. For production, make sure to build the project with `npm run build` or `pnpm build`, and then start it with `npm start` or `pnpm start`.

## Deployment

The application is deployed on Vercel. To deploy changes:

1. Push your changes to the main branch of your repository.
2. Vercel will automatically handle the deployment process and update your application.

## Usage

After starting the development server:

1. Open your browser and go to `http://localhost:3000`.
2. **Login**: Use email/password or GitHub OAuth to log in.
3. **Manage Tasks**: Add, edit, and delete tasks in the to-do list. Changes will be reflected in real-time for all users.
4. **Notifications**: Observe toasts providing feedback on your actions.

## Made By

This project was developed by Abdelrahman Alsayed.

## Contact Information

For questions or feedback, please contact me at dev.abdelrahman7@gmail.com
or connect with me on [LinkedIn](https://www.linkedin.com/in/abdelrahmmaan/).
