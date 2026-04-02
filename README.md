# Finance Dashboard UI

A clean and interactive finance dashboard built with React, featuring data visualization, transaction management, and role-based access control.

## Features

- **Dashboard Overview**: Summary cards for total balance, income, and expenses. Time-based balance trend chart and categorical spending breakdown pie chart.
- **Transactions Section**: List of transactions with filtering and search. Admin role can add, edit, and delete transactions.
- **Role-Based UI**: Switch between Viewer (read-only) and Admin (full access) roles.
- **Insights Section**: Displays highest spending category, monthly comparisons, and spending by category.
- **State Management**: Uses React Context for managing application state.
- **Responsive Design**: Works on different screen sizes.
- **Dark Mode**: Toggle between light and dark themes.
- **Data Persistence**: Transactions are saved to localStorage.

## Technologies Used

- React 19
- Tailwind CSS for styling
- Recharts for data visualization
- React Icons

## Installation

1. Clone the repository.
2. Navigate to the frontend directory: `cd frontend`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`

## Usage

- Use the role selector to switch between Viewer and Admin modes.
- In Admin mode, add new transactions using the "Add Transaction" button.
- Filter transactions by type, category, or search term.
- View insights and charts on the dashboard.

## Approach

This dashboard was built with a focus on clean UI/UX, modularity, and responsiveness. Components are structured logically, and state is managed centrally using React Context. Mock data is used for demonstration, and the app handles empty states gracefully.

## Future Enhancements

- Backend integration for real data
- More advanced filtering and sorting
- Export functionality
- Animations and transitions

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
