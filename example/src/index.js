// @flow
import React from 'react';
import { StyleSheet } from 'react-native';
import Carousel from 'react-native-lfcarousel';

import Slide from './Slide';
import data from './data';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function renderSlides() {
  return data.slides.map((slide, index) => <Slide key={index} slide={slide} />);
}

function App() {
  return (
    <Carousel
      style={styles.container}
      speed={5000}
      pagerColor="#000"
      activePagerColor="#fff"
    >
      {renderSlides()}
    </Carousel>
  );
}

export default App;
