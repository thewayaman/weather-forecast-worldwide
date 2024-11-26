# weather-forecast-worlwide
A single-page application (SPA) built with React, TypeScript, and GraphQL that showcases my expertise in front-end development. This app fetches and displays detailed information about countries using the public Countries GraphQL API and integrates real-time weather data from a public weather API.


## 🌍 Live Demo 🚀

Check out the live version of the **Weather Forecast Worldwide** app hosted on GitHub Pages:

🔗 [**Weather Forecast App**](https://thewayaman.github.io/weather-forecast-worldwide/) 🌤️

Feel free to explore the app, check the weather worldwide, and explore the features we've implemented! 😊


# frontend

# Weather Forecasting App Architecture and Design

The Weather Forecasting app is built using React, with query parameters controlling the state of the application. When a user interacts with the app (e.g., selects a country), the query parameters in the URL are updated. These query parameters trigger state updates within the app, causing the relevant components to re-render and fetch new data (e.g., country details and weather data) for the selected country.

## Query Parameters as Application State

In the Weather Forecasting app, the query parameters in the URL serve as the central source of truth for the application state. Since the application's requirements are relatively simple, I opted not to include complex state management solutions (e.g., Redux, Recoil, or Zustand). This approach allows the app to:


- **Preserve state across navigation**:  
  When a user selects a country, the query parameters in the URL are updated, reflecting the current state of the app. This allows users to navigate to different sections of the app without losing the previously selected country or other state-related data.

- **Allow deep linking**:  
  The URL can be bookmarked or shared, and the app can retrieve the exact same state (e.g., country selection and weather data) when opened again. This enables a seamless experience across devices and users.

- **URL-based state management**:  
  Easy to manage and share state using URL query parameters. By encoding the state directly in the URL, the app ensures that users can easily revisit or share the exact state of the application with others.

- **Data synchronization**:  
  The app always fetches the correct data based on user actions and URL changes. As the query parameters update, the app ensures that the data displayed to the user is consistent with the selected filters, country, and sorting options.

- **Performance**:  
  Minimizes unnecessary re-fetching and renders, leading to better performance. Since the query parameters are tightly coupled with the data fetching logic, the app only fetches new data when necessary, reducing redundant requests and improving responsiveness.



### Handling Country List, Search, and Filtering
For fetching the countries list, searching by country name, retrieving all available languages, and listing all countries, I’m directly making API calls to the backend at [GraphQL Country](https://graphql.country/graphql). However, since the GraphQL server doesn't support advanced sorting and filtering features, so I had to handle those entirely on the **frontend** once the data was fetched. This means the following were done the response returned to me:
- **Sort** the list of countries based on user input from `SortByComponent`.
- **Filter** countries by Region and Language, as these are not handled to the level of sophistication that we want.


### Debounce in Country Search
This is to limit the number of API calls. When the user types, I delay the request until they've stopped typing for a set period (e.g., 300ms, this parameter is by default set to 500ms). This helps me:
- **Reduce server load** by preventing unnecessary requests.
- **Improve performance** by making fewer API calls on every keystroke.
- **Enhance the user experience (UX)** with faster, more responsive feedback and fewer loading delays.

---

### Use case for a Custom-Typed Fetch Utility with Generic Response
I built a custom `fetch-wrapper.ts` utility that accepts a response type as a generic parameter to keep my API calls type-safe and reusable. Here’s why I did this:
- **Ensures type safety**, so I catch any type mismatches at compile time rather than runtime.
- **Increases reusability** by using the same utility across multiple endpoints with different response types.
- **Simplifies my code** by avoiding repetitive type definitions for each fetch request.
- **Improves my development experience (DX)** with better autocompletion and error checking.

---

### Why I Chose TanStack React Query to make REST API calls to OpenWeatherAPI
It simplifies a lot of the complexity around state management and server communication in my opinion. Some of the biggest advantages according to me:
- **Automatic caching**, which prevents redundant network requests and improves app performance.
- **Background refetching**, so the data stays fresh without any extra effort on my part.
- **Optimistic updates**, which allow for smooth UI transitions even before the server responds, making the app feel faster and more responsive.




## Usage of [Ant Design](https://ant.design/) as the choice of design system

As the initial requirements emphasized rapid development with less focus on styling, I chose **Ant Design (antd)** as the design system for the application.It offered advantages such as

- **Previous Usage Experience**: I had utilized this application for some of my consulting work and found it to be versatile enough and different than the lackluster material based options available to see it fit for reuse.
- **Pre-built Components**: Ant Design provides a wide range of ready-to-use components like forms, buttons, tables, and modals, reducing the need for custom development and speeding up the design process.
- **Responsive Design**: The framework includes built-in responsive design features, making it easier to build apps that are mobile-friendly and look great on various screen sizes.
- **Customization**: While it offers a set of default styles, Ant Design is highly customizable, allowing me to tweak themes and components to suit the needs of the application without starting from scratch.



## Reason for using Emojis instead of icon libraries

- I wanted to rapidly prototype the application with minimal dependencies,by using emojis instead of third-party icon libraries, leading to a smaller bundle size and faster development time. 
- This approach allowed me to focus on core functionality without the need to load external assets or manage additional libraries for icons.



## Project Structure Overview

The file/folder structure of the React app is organized for maintainability, scalability, and ease of collaboration. Here’s a breakdown of the key folders and their contents:

### **1. `api/`**
Contains logic for API calls, divided into:
- **`graphql/`**: Handles GraphQL API logic.
    - `apiClient.ts`: GraphQL client setup and configuration.
    - `countryQueries.ts`: GraphQL queries for fetching country data.
- **`rest/`**: Handles REST API logic.
    - `weatherAPI.ts`: Fetches weather data from a REST API.


### **2. `components/`**
Contains reusable UI components:
- `CountryList.tsx`: Displays a list of countries.
- `PopulationDisplay.tsx`: Displays population information for a country.
- `SortByDropdown.tsx`: Dropdown component to sort the country list.
- `TreeFilters.tsx`: Filters for countries based on specific criteria.


### **3. `hooks/`**
Custom React hooks for data fetching and state management:
- `useCityWeatherData.ts`: Fetches weather data for a city.
- `useCountryData.ts`: Fetches country data (e.g., population, capital).


### **4. `types/`**
Contains TypeScript type definitions for data objects:
- `countries.ts`: Type definitions for country data.
- `weather.ts`: Type definitions for weather data.


### **5. `utils/`**
Utility functions for common tasks:
- `debounce.tsx`: Custom hook to debounce API calls and prevent unnecessary requests.
- `emoji-generator.ts`: Generates emoji representations of weather conditions.
- `fetch-wrapper.ts`: A wrapper around fetch to simplify API requests.
- `searchparams-generator.ts`: Utility functions for managing and updating query parameters.



### **6. `views/`**
Page-level components that assemble UI into complete pages:
- `CityWeatherDetail.tsx`: Displays detailed weather information for a city.
- `CountryDetailPage.tsx`: Displays detailed information about a country.
- `Home.tsx`: Home page of the app where users can select countries.
- `CountrySelectionShell.tsx`: Shell component that houses the country selection interface.



## **Overall Advantages**

1. **Modular & Scalable**: Each section is separated by responsibility, making it easy to extend.
2. **Maintainable**: The code is clean and easy to debug and test.
3. **Reusability**: Components and hooks are reusable across the app.
4. **Collaborative**: Clear structure enables multiple developers to work efficiently.
5. **Optimized for TypeScript**: Helps with error checking, autocompletion, and code refactoring.

This structure follows best practices, making it easy to scale and maintain as the app grows.



## Query Parameters in usage within the app

### `country`
- **Type**: `string`
- **Description**: This query parameter represents the selected country for which the weather data and details should be displayed. The value of this parameter is the name of the country chosen by the user from the available list.
- **Example**: `country=India`

### `sortBy`
- **Type**: `string`
- **Description**: This query parameter is used to determine how the list of countries should be sorted. It accepts a value corresponding to a sorting option, such as by country name, population, or area. This allows the user to control how the countries are presented in the list.
- **Default Values as of now**: 
  - `name`: Sort by country name.
  - `area`: Sort by the area of the country.
  - `population`: Sort by the population of the country.
  - `default`: No sorting, use the default order.
- **Example**: `sortBy=population`

### `searchString`
- **Type**: `string`
- **Description**: This query parameter holds the search string entered by the user. It is used to filter the countries based on their names. The search string helps narrow down the list of countries to only those whose names match the query.
- **Example**: `searchString=Germany`

### `filters`
- **Type**: `string[]`
- **Description**: This query parameter contains filters applied by the user to narrow down the list of countries. The value is a comma-separated list of filter options such as region or subregion. This allows users to view countries from a specific region or category.
- **Example**: `filters=Europe,Asia`
- **Note**: The `filters` parameter can accept multiple values (e.g., `filters=Europe,English` or `filters=Africa,Pashto`), separated by commas.


# Weather Forecasting App Architecture and Design

### Challenges Faced and Areas for Improvement

#### 1. **Testing with Jest**
- **Challenge**: Due to time constraints, I wasn't able to write test cases using Jest for the application.
- **Improvement**: 
   - If given more time, I would write comprehensive unit and integration tests using Jest. Would ensure the reliability and stability of the application. 
   - I would focus on testing key components like the search functionality, API calls, and UI updates, ensuring that edge cases and asynchronous behavior are handled correctly.


#### 2. **[Mock Service Worker (MSW)](https://mswjs.io/) for Mocking API Calls**
- **Challenge**: The lack of mocked API responses made it difficult to write automated tests that didn't rely on real API calls, which could be slow or unreliable.
- **Improvement**: 
   - I would integrate **Mock Service Worker (MSW)** to mock API responses during tests. This would prevent unnecessary API calls during test execution, making tests faster and more reliable.
   - MSW would allow me to simulate different API responses (e.g., successful, error, or loading states), helping to test edge cases without depending on the backend.
   - Using MSW would also make the tests more deterministic, avoiding flaky tests caused by external dependencies.

#### 3. **GraphQL Limitations: No Pagination or Sorting**
- **Challenge**: The GraphQL API I used for fetching country data (from [GraphQL Country](https://graphql.country/graphql)) did not support pagination or sorting based on parameters. This limited the scalability and flexibility of the data fetch process, especially as the list of countries could grow large.
- **Improvement**: 
   - I would create a custom backend or extend the existing GraphQL API to support **pagination** and **sorting** parameters. 
   - This would allow the frontend to request data in smaller chunks (with pagination) and sort it based on user preferences (e.g., sorting countries alphabetically or by population).
   - Implementing these features would make the app more scalable and user-friendly, especially when dealing with large datasets.


#### 4. **Lack of Virtualization in the Listing Component**
- **Challenge**: The country listing component didn't have virtualization, which means that all the items were rendered at once. This can lead to performance issues, particularly as the number of items grows.
- **Improvement**: 
   - If I had more time, I would implement **virtualization** in the listing component to improve performance.
   - I would either use the **Ant Design List's Virtual List** suggested way ([Virtual List demo](https://ant.design/components/list#list-demo-virtual-list)) or a custom library like **react-window** to render only the visible items in the list. 


#### 5. **Abort Functionality in Debounce Logic**
- **Challenge**: The current debounce logic doesn't handle cases where a previous API call needs to be aborted if it's no longer needed (e.g., the user types a new search term before the previous request completes).
- **Improvement**:
   - I would add **abort functionality** to the debounce logic to cancel any ongoing requests that are no longer relevant. 
   - This would prevent unnecessary API calls from executing, improving performance and reducing load on the server.
   - With abort logic, the user would experience faster interactions and fewer unnecessary requests would be sent to the server.


#### 6. **GitHub Actions for Linting and Build Validation**
- **Challenge**: Ensuring code quality and validating builds manually can be error-prone and inefficient.
- **Improvement**: 
   - I would set up **GitHub Actions** to automate the process of linting and validating builds on every pull request and push.
   - This would help ensure that the code follows style guidelines and that the build process doesn't break after changes are made.
   - The GitHub Actions pipeline would run tests, linting, and build checks automatically, reducing the manual overhead and helping catch issues early in the development process.


#### 7. **Geolocation-based Weather Display**
- **Challenge**: Currently, the app requires users to manually input their location to fetch the weather information. An area for   improvement is to implement browser-based geolocation to automatically retrieve the user's current location and display the weather accordingly.
- **Improvement**: 
    - Use the browser's geolocation API to detect the user's location.
    - Fetch weather data based on the detected location (latitude and longitude).
    - Provide an option to disable or manually enter a location, ensuring user control over their data.
    - Ensure a smooth and responsive experience across different browsers and devices.



#### 8. **Other Potential Improvements**

- **Enhance UI/UX**: Fine-tuning the user interface with additional styling, better animations, and transitions to improve the overall user experience.
- **Accessibility**: Ensuring the app is fully accessible by adding necessary ARIA attributes and making sure it's keyboard-navigable.




## Setting Up the Weather Forecast App Locally


> **Disclaimer**: This setup guide assumes that [Node.js](https://nodejs.org/), [npm](https://www.npmjs.com/), and [Git](https://git-scm.com/) are already installed on your system. If they are not installed, please make sure to install them before proceeding.


### 1. Clone the Repository

First, clone the repository to your local machine:

```
git clone https://github.com/thewayaman/weather-forecast-worlwide.git

```

### 2. Navigate to the `frontend` Directory

After cloning the repository, navigate to the frontend folder where the React app is located:

```
cd weather-forecast-worldwide/frontend
```

### 3.  Install Dependencies

Next, install the required dependencies using npm

```
npm install
```

### 4.  Start the Development Server

Once the dependencies are installed and environment variables are set, start the development server:

```
npm start
```




### Addendum

### How to Obtain an API Key for OpenWeatherMap (Free Tier)

1. **Create an OpenWeatherMap Account**  
   Visit the OpenWeatherMap website: [https://openweathermap.org](https://openweathermap.org)  
   Click on **Sign Up** in the top-right corner and create an account using your email.

2. **Log In to Your Account**  
   Once you’ve signed up, log in to your OpenWeatherMap account using your credentials.

3. **Navigate to the API Keys Section**  
   After logging in, go to your **Profile** by clicking on your username in the top-right corner.  
   Select **My API Keys** from the dropdown menu.

4. **Generate a New API Key**  
   On the **My API Keys** page, click the **Create Key** button.  
   Enter a name for your API key (e.g., "WeatherAppKey") and click **Generate**.

5. **Copy Your API Key**  
   Once the key is generated, it will appear in the list. Copy the key to use in your application.

6. **Start Using the API**  
   Now that you have your API key, you can use it to make requests to OpenWeatherMap’s API, such as the current weather data:  
   `https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY`
   
   Replace `YOUR_API_KEY` with the key you just copied.

---

Note: The **free tier** provides access to basic weather data. If you need additional features or higher limits, you can explore their paid plans.
