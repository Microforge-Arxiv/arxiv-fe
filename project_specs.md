Below is a refined project specifications document split into six sections. Each section describes the technical details needed to implement that part of the application using Next.js, Supabase (for auth and database operations), Shadcn, and Tailwind CSS. Note that setup for Supabase authentication and the database schema is assumed to be preconfigured.

---

### 1. User Authentication (Sign Up / Login)

- **Overview:**  
  Implement a Next.js authentication page that allows users to sign up or log in with their email and password via Supabase auth.

- **Key Tasks:**
  - Create a Next.js page (e.g., `/auth`) with two forms: one for sign-up and one for login.
  - Use Supabase’s built-in auth methods to handle email/password authentication.
  - Style forms using Tailwind CSS and Shadcn UI components for consistency.
  - Handle and display error messages for authentication failures.
  - On successful authentication, store the session and redirect to the next step (organization association check).

---

### 2. Organization Association Check and Form

- **Overview:**  
  After authentication, verify whether the user’s profile in the Supabase `profiles` table contains an organization association. If not, prompt the user to enter organization details.

- **Key Tasks:**
  - On login, query the Supabase `profiles` table for the current user’s record.
  - If the record does not include organization data, redirect to an organization form page (e.g., `/organization-setup`).
  - Build a form using Shadcn components and Tailwind CSS that includes fields for:
    - Organization Name
    - Organization URL
    - Organization Requirements (or other details as needed)
  - On form submission, update the user's profile in the database with the provided organization details.
  - Ensure form validation and error handling for a smooth user experience.
  - After a successful update, redirect the user to the dashboard.

---

### 3. Dashboard Access

- **Overview:**  
  Once the user is authenticated and associated with an organization, they are routed to the dashboard.

- **Key Tasks:**
  - Create a Next.js dashboard page (e.g., `/dashboard`).
  - Implement a routing check to ensure that only users with a valid organization in their profile can access the dashboard.
  - Use client-side or server-side redirection logic (e.g., Next.js middleware or useEffect hook) to enforce this flow.
  - Provide appropriate loading and error states if the organization check is pending or fails.

---

### 4. Dashboard Layout with Sidebar and Search Bar

- **Overview:**  
  The dashboard features a two-part layout:

  - A left sidebar listing previous search queries for the user's organization.
  - A right/main section containing a search bar for new queries.

- **Key Tasks:**
  - Design a responsive layout using Tailwind CSS (using flexbox or CSS grid) that divides the screen into two sections.
  - **Sidebar:**
    - Create a component to fetch and display previously searched queries related to the organization.
    - Each query should be rendered as a clickable list item.
  - **Main Section:**
    - Create a centered search bar component with an input field and submit button using Shadcn UI components.
    - Ensure the search bar is styled appropriately for desktop and mobile views.
  - Implement state management (e.g., React context or local state) to handle the selection of a query from the sidebar.

---

### 5. Query Transformation and Execution

- **Overview:**  
  When a user either selects a previous query or enters a new search, the system transforms the natural language query into an SQL query using an external API (Gemini/ChatGPT), then executes that SQL against the Supabase database.

- **Key Tasks:**
  - Create a service or utility function that takes a natural language query as input.
  - Integrate with the Gemini/ChatGPT API:
    - Send the user query to the API.
    - Receive the SQL query transformation as the response.
  - After receiving the SQL query, use Supabase’s client to execute the SQL query against the database.
  - Implement error handling for both the API call and the SQL execution.
  - Provide loading indicators while the API call and database query are in progress.
  - Ensure that both new queries (from the search bar) and selected queries (from the sidebar) trigger this transformation and execution flow.

---

### 6. Display Query Results

- **Overview:**  
  The results from the SQL query execution are displayed in a tabular format within the dashboard.

- **Key Tasks:**
  - Develop a table component using Shadcn components and styled with Tailwind CSS.
  - The table should dynamically render columns and rows based on the returned query data.
  - Implement features such as:
    - Responsive design to handle different screen sizes.
    - Optional pagination or scrolling if the dataset is large.
  - Include error and empty state displays in case the query returns no results or an error occurs.
  - Optimize for readability and performance, ensuring the table is accessible and user-friendly.

---

This document outlines the core technical components and integration points for building the application. Each section is focused on its respective functionality, ensuring a modular approach that an AI coding tool like Cursor can use to generate or scaffold the necessary code.
