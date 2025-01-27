# Product Comparison App

## Overview

This application allows users to view and compare products from an e-commerce platform. It fetches product data from a public API, displays the products in a sortable grid, and provides functionality for selecting products for comparison.

## Features

1. **Data Fetching**:

   - Product data is fetched from [Fake Store API](https://fakestoreapi.com/products).
   - Error handling is implemented to show user-friendly messages in case of API failure.

2. **Sorting**:

   - Products can be sorted by price or rating using a dropdown menu.

3. **Product Comparison**:

   - Users can select multiple products to compare.
   - Selected products are displayed in a dedicated comparison section.
   - The products can be filtered to just display the selected products.

4. **Responsive Design**:

   - The app uses Tailwind CSS for a responsive and clean user interface.

5. **State Management**:

   - Redux Toolkit is used for state management, ensuring scalability and maintainability.

   Redux Toolkit was chosen because it is better suited to fetch and store data. It gives access to hooks for loading and error handling, also it's easier to test than context API. 

## Architecture

### File Structure:

- \`\`: Main source folder.
  - \`\`: Reusable UI components.
  - \`\`: Contains Redux slices for state management.
  - \`\`: Redux store configuration.
  - \`\`: Main app component.
  - \`\`: Entry point for the React application.

### Technologies Used:

- **React**: For building the user interface.
- **TypeScript**: For type safety and improved developer experience.
- **Redux Toolkit**: For efficient state management.
- **Axios**: For API requests.
- **Tailwind CSS**: For styling.
- **Vitest & React Testing Library**: For testing.

## Usage

### Running the App:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run start
   ```
3. Open your browser and go to `http://localhost:5173`.

### Formatting:

Run the following command to check for errors:

```bash
npm run lint
```

### Running Tests:

Run the following command to execute tests:

```bash
npm run test
```

## Known Limitations

1. **API Dependency**: The app relies on the Fake Store API, so any downtime or changes to the API might affect functionality.
2. **Basic Comparison**: Product comparison is limited to listing selected products and does not include detailed side-by-side comparisons.
3. **Limited Sorting Options**: Currently, sorting is only available for price and rating.
4. **Text length**: The text for some of the titles and description is a lot and will cause issues displaying in tabular format on mobile. 

## Future Enhancements

1. Add advanced comparison features (e.g., side-by-side comparison tables).
2. Add an extra property in the products data for shorter and longer titles so the content doesn't break the table layout.
3. Implement additional filtering options (e.g., categories, price range).
4. Enhance error handling by logging errors in Newrelic or Datadog.
5. Add pagination or infinite scrolling for better performance if the product data length exceeds 100.
6. Build a dedicated product page for each product with all the information about the product displayed. Also on this page other coparisons of the product can be made like colour combinations.


