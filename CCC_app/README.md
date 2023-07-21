This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Run CCC_backend on any system

## Step 2: Replace Keys and ips:

Add your google maps API key:

line 45 : CCC_app/src/screens/googlemaps/map.jsx
![image](https://github.com/Blackfyre1/CCC/assets/31318864/0769d837-81d7-4466-b778-87deafa4b7e3)

Replace CCC_backend Server ip:

line 19 : CCC_app/src/screens/googlemaps/Register.jsx
![image](https://github.com/Blackfyre1/CCC/assets/31318864/ecb500db-d9d3-4eb4-8e27-8af71ac59c84)

line 139 and 173: CCC_app/src/screens/googlemaps/index.jsx
![image](https://github.com/Blackfyre1/CCC/assets/31318864/88a0741c-ecce-4314-823f-ae67e711d116)
![image](https://github.com/Blackfyre1/CCC/assets/31318864/d0cb44c9-7e1d-4e3b-bfd5-87ac8ab77f40)

line 13 : CCC_app/src/screens/googlemaps/login.jsx
![image](https://github.com/Blackfyre1/CCC/assets/31318864/02a4ec43-acf9-4535-8a5d-a2a88d3df5df)

>**Note**: It is recommended to run the CCC_backend server on a separate device if using the app on an actual phone instead of an emulator.

## Step 3: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 4: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 5: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.jsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
