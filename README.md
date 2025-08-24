# Invoice Application

This project is a lightweight invoice management application built with **Vue 3**, **Vuex** and **Firebase**.  It allows you to create, read, update and delete (CRUD) invoices and synchronises your data with [Firebase Firestore](https://firebase.google.com/products/firestore), Google's hosted NoSQL database.  The project is designed to be easy to understand and extend.

## Features

- **Add invoices** – Capture basic invoice details such as client name, due date, amount and payment status.
- **Edit invoices** – Modify existing invoices directly from the list.
- **Delete invoices** – Remove invoices that are no longer needed.
- **Realtime updates** – Data is stored in Firestore so changes appear almost instantly across sessions.
- **State management** – All invoices are managed through a centralised Vuex store.

## Project Structure

```text
invoice-app/
├── package.json          # NPM metadata and dependency definitions
├── .gitignore            # Files and folders Git should ignore
├── README.md             # This guide
└── src/
    ├── main.js           # Entry point that creates the Vue app
    ├── App.vue           # Root component
    ├── firebase.js       # Firebase configuration and helper functions
    ├── store/
    │   └── index.js      # Vuex store definition
    └── components/
        ├── InvoiceList.vue   # Lists invoices and provides edit/delete actions
        └── InvoiceForm.vue   # Form for creating and editing invoices
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* [Node.js](https://nodejs.org/) (version 14 or later recommended)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* A [Firebase](https://firebase.google.com/) project with Firestore enabled

### Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/yourusername/invoice-app.git
   cd invoice-app
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Configure Firebase**

   The file `src/firebase.js` contains a placeholder configuration.  Replace the placeholder values with your own Firebase project settings.  You can find these in your Firebase console under Project Settings → General.

   ```js
   // src/firebase.js
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT_ID.appspot.com",
     messagingSenderId: "SENDER_ID",
     appId: "APP_ID"
   };
   ```

4. **Run the development server**

   ```sh
   npm run serve
   ```

   The app should now be available at `http://localhost:8080` (or another port if 8080 is taken).

### Building for Production

To create a production‑ready build, run:

```sh
npm run build
```

This will generate a minified build in the `dist` directory.

## Customising

Feel free to extend this project to suit your needs.  For example, you can:

- Add authentication so each user sees only their own invoices.
- Add more invoice fields (e.g. line items, currency, description) and validation.
- Use Vue Router to break the app into multiple pages.
- Style the application using a CSS framework like Tailwind or Bootstrap.

## Contributing

Contributions are welcome!  Please fork the repository and open a pull request with your improvements.

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.