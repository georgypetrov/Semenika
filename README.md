### Table of Contents

- [Installation](#markdown-header-installation)
- [Usage](#markdown-header-usage)
- [Builds](#markdown-header-builds)




### Installation

#### Clone repo

``` bash
# clone the repo
$ git clone ...

# go into app's directory
$ cd semenika

# install app's dependencies
$ npm install

# add cordova 
$ vue add cordova
```

#### Usage

``` bash
# serve with hot reload at localhost:8080
$ npm run cordova-serve-browser

# serve Android
$ npm run cordova-serve-android

# serve iOS
$ npm run cordova-serve-ios

# build 
$ npm run build

# build Android
$ npm run cordova-build-android

# build iOS
$ npm run cordova-build-ios
```


#### Builds

### Build Android app for mobile devices with Vue.js and Cordova

In order to build Android app you need to download the target SDK Platforms, "Android SDK Tools",  "Android SDK Platform-Tools". The easiest way to do that is to
download Android Studio and use the build in SDK manager ("Android SDK Tools" is found under SDK Tools, when Hide Obsolete Packages is disabled).

Next step is to download and install Java SE JDK 8 from [here](https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html).

Next step is to install gradle with a command (requires SDKMAN! package manager): "sdk install gradle 6.1.1" or manually as described here: https://docs.gradle.org/current/userguide/installation.html

After that you have to go to the environment variables of your computer and to set value for the following variables
** Replace the ------ with your username **
```bash
1. ANDROID_HOME - C:\Users\------\AppData\Local\Android\Sdk
2. ANDROID_SDK_ROOT - C:\Users\------\AppData\Local\Android\Sdk\tools\bin
3. JAVA_HOME - C:\Program Files\Java\jdk1.8.0_241
4. PATH - C:\Users\------\AppData\Local\Android\Sdk\tools;      C:\Users\------\AppData\Local\Android\Sdk\platform-tools; C:\Users\------\AppData\Local\Android\Sdk\tools\bin
```

When you are ready with that you have to add the Android platform to the project with:
``` bash
cordova platform add android .
```
** NOTE! To check whether the platform has been added or not enter the src-cordova folder and run**
``` bash
 cordova platform ls
```

And you can run your project with command: npm run cordova-serve-android
Or build it for production: npm run cordova-build-android



# Code pattern used in Project and Links for ref.

### For API 
    https://medium.com/canariasjs/vue-api-calls-in-a-smart-way-8d521812c322