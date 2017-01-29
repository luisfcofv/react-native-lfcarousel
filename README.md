# Carousel component for React Native

[![NPM version](http://img.shields.io/npm/v/react-native-lfcarousel.svg?style=flat)](https://www.npmjs.com/package/react-native-lfcarousel)

Circular carousel for your next [react-native](https://github.com/facebook/react-native/) project. Supports iOS, Android and Web ([react-native-web](https://github.com/necolas/react-native-web)).

## Demo

<img src="https://raw.githubusercontent.com/luisfcofv/react-native-lfcarousel/master/example.gif?" alt="Demo" width="320" height="568" />

## Install

```sh
npm install react-native-lfcarousel --save
```

[Full example code](example/)

## Usage
```
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Carousel from 'react-native-lfcarousel';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function App() {
  return (
    <Carousel
      style={styles.container}
      speed={2000}
      pagerColor="#000"
      activePagerColor="#fff"
    >
      <View style={{ flex: 1, backgroundColor: 'red' }} />
      <View style={{ flex: 1, backgroundColor: 'green' }} />
      <View style={{ flex: 1, backgroundColor: 'blue' }} />
    </Carousel>
  );
}

export default App;

```

## License

react-native-lfcarousel is licensed under the [MIT License](LICENSE).
