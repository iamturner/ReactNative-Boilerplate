# React Native Starter

A simple starter project for React Native apps.

## Author

Ian Turner ( [@i_am_turner](http://twitter.com/i_am_turner) / [iamturner.co.uk](http://iamturner.co.uk) )

## Installation

On the command prompt run the following commands

```sh
$ git clone https://github.com/iamturner/ReactNative-Vanilla.git

$ cd ReactNative-Vanilla/

$ npm install
```

### Rename App (optional)

To rename the app instead of 'Starter',  run the following commands.

```sh
$ npm install react-native-rename -g

$ react-native-rename "NEW APP NAME" -b com.bundle.identifier
```

### iOS

On the command prompt run the following commands

```sh
$ react-native run-ios
```

### Android

**_Note:_** *Before running ` react-native run-android ` for the first time, open the project in Android Studio to generate local.properties file.*

```sh
$ react-native run-android
```
**_Tip:_** *To open an Android emulator without opening Android Studio (for MacOS).*

On the command prompt run the following commands.

```sh
Library/Android/sdk/tools/emulator -list-avds
```
This returns a list of installed emulators. Choose which emulator you want to run, e.g. Pixel_API_25, and then enter:

```sh
Library/Android/sdk/tools/emulator -avd <EMULATOR_NAME>
```