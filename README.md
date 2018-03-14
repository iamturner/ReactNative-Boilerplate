# React Native Starter

A simple starter project for React Native apps.

## Author

Ian Turner ( [@i_am_turner](http://twitter.com/i_am_turner) / [iamturner.co.uk](http://iamturner.co.uk) )

## Dependencies

This project uses:

* RN Vector Icons ([Link](https://github.com/oblador/react-native-vector-icons))
* RN Navigation ([Link](https://github.com/wix/react-native-navigation))
* RN Prompt Android ([Link](https://github.com/shimohq/react-native-prompt-android))

## Installation

On the command prompt run the following commands

```sh
$ git clone https://github.com/iamturner/ReactNative-Vanilla.git

$ cd ReactNative-Vanilla/

$ npm install
```

```sh
$ react-native link
```

### iOS

On the command prompt run the following commands

```sh
$ react-native run-ios
```

**_Note:_** *To allow camera roll access, you must link the RCTCameraRoll library to your project.*

1. Drag RCTCameraRoll.xcodeproj into Libraries in your XCode project. This can be found at:

	> <your_project>/node_modules/react-native/Libraries/CameraRoll/

2. Still in XCode, select *Build Phases*, and then add libRCTCameraRoll.a under *Link Binary With Libraries*
3. Add the following permissions keys to your .plist in XCode
	* Privacy - Photo Library Usage Description
	* Privacy - Camera Usage Description

---

### Android

A few files in the android folder require some editing after installing and linking dependencies. These are:

* android/app/src/main/java/com/starter/MainApplication.java

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