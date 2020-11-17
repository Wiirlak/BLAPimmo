# BLAPimmo

Projet de blockchain sur le Marketplace immobilier.

## Installation

First ensure you are in a new and empty directory.

1. Run the `unbox` command via `npx` and skip to step 3. This will install all necessary dependencies. A Create-React-App is generated in the `client` directory.
   ```js
   npx truffle unbox react
   ```

2. Run the development console.
    ```javascript
    npx truffle develop
    ```

4. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.
    ```javascript
    compile
    migrate
    ```

5. In the `client` directory, we run the React app. Smart contract changes must be manually recompiled and migrated.
    ```javascript
    // in another terminal (i.e. not in the truffle develop prompt)
    cd client
    npm run start
    ```

6. Truffle can run tests written in Solidity or JavaScript against your smart contracts. Note the command varies slightly if you're in or outside of the development console.
    ```javascript
    // inside the development console.
    test

    // outside the development console..
    truffle test
    ```

7. Jest is included for testing React components. Compile your contracts before running Jest, or you may receive some file not found errors.
    ```javascript
    // ensure you are inside the client directory when running this
    npm run test
    ```

8. To build the application for production, use the build script. A production build will be in the `client/build` folder.
    ```javascript
    // ensure you are inside the client directory when running this
    npm run build
    ```
   
 Read more on https://github.com/truffle-box/react-box or https://www.trufflesuite.com/boxes/react