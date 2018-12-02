# tic_tac_toe-react

[Play the game!](https://kyletolle.github.io/tic_tac_toe-react/)

Followed the [tutorial](https://reactjs.org/tutorial/tutorial.html) for [React](https://reactjs.org/) to build this Tic Tac Toe game and learn the library.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Includes these extras on top of the base tutorial app:
- Display location (row, col) for each move in the history list
- Bolds the currently selected item in the move list
- Displays button to sort the move list in ascending/descending order
- Highlights the squares that win
- Displays a message if the game is a draw

## Screenshot

![Sceenshot of the Tic Tac Toe Game](tic_tac_toe_screenshot.png)

## Development Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Deployment Scripts

To deploy to Github Pages, I followed the [`create-react-app` deployment](https://facebook.github.io/create-react-app/docs/deployment#github-pages-https-pagesgithubcom) steps.

### `npm run deploy`

Uses the `npm run build` step below and deploys the production code to Github Pages.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Other Scripts

These aren't currently used in this project, but could be.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## License

MIT

