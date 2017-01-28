// @flow
import React, { Component } from 'react';
import { PanResponder, View, StyleSheet } from 'react-native';
import rebound from 'rebound';

import PagerIndicator from './PagerIndicator';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    overflow: 'hidden',
  },
  scrollPanel: {
    flex: 1,
    flexDirection: 'row',
  },
});

let timer = null;

class Carousel extends Component {
  panResponder = {};
  previousLeft = 0;
  previousPage = 0;
  released = true;
  scrollSpring = null;
  springSystem = null;

  state = {
    currentPage: 1,
    width: 0,
    height: 0,
  };

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.onStartShouldSetPanResponder,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this.onPanResponderEnd,
      onPanResponderTerminate: this.onPanResponderEnd,
    });

    this.springSystem = new rebound.SpringSystem();
    this.scrollSpring = this.springSystem.createSpring();
    const springConfig = this.scrollSpring.getSpringConfig();
    springConfig.tension = 110;
    springConfig.friction = 30;

    this.scrollSpring.addListener({
      onSpringUpdate: this.onSpringUpdate,
      onSpringEndStateChange: this.onSpringEndStateChange,
    });

    if (this.props.speed) {
      timer = setTimeout(() => {
        const currentPage = -1;
        this.scrollSpring.setCurrentValue((currentPage + 1) * this.state.width);
        this.released = true;
        this.movePage(currentPage);
      }, this.props.speed);
    }
  }

  componentWillUnmount() {
    this.scrollSpring.removeAllListeners();
    if (timer) {
      clearTimeout(timer);
    }
  }

  onSpringUpdate = () => {
    if (this.released) {
      this.previousLeft = this.scrollSpring.getCurrentValue();
      this.scrollPanel.setNativeProps({
        style: {
          left: this.scrollSpring.getCurrentValue(),
        },
      });
    }
  }

  onSpringEndStateChange = () => {
    if (this.props.speed) {
      timer = setTimeout(() => {
        let currentPage = Math.floor((this.previousLeft + this.state.width / 2) / this.state.width);
        currentPage -= 1;

        if (currentPage < this.props.children.length * -1) {
          currentPage = -1;
          this.scrollSpring.setCurrentValue((currentPage + 1) * this.state.width);
        }

        this.movePage(currentPage);
      }, this.props.speed);
    }
  }

  onStartShouldSetPanResponder = () => {
    if (timer) {
      clearTimeout(timer);
    }

    return true;
  }

  onPanResponderMove = (event: Object, gestureState: Object) => {
    if (timer) {
      clearTimeout(timer);
    }

    this.released = false;

    if (gestureState.dx + this.previousLeft < -1 * (this.state.width * this.props.children.length)) {
      this.previousLeft = gestureState.dx * -1;
    }

    if (gestureState.dx + this.previousLeft > 0) {
      this.previousLeft = this.state.width *- this.props.children.length - gestureState.dx;
    }

    this.scrollPanel.setNativeProps({
      style: {
        left: gestureState.dx + this.previousLeft,
      },
    });

    this.scrollSpring.setCurrentValue(gestureState.dx + this.previousLeft);
  }

  onPanResponderEnd = (event: Object, gestureState: Object) => {
    this.released = true;
    this.previousLeft += gestureState.dx;
    let currentPage = Math.floor((this.previousLeft + this.state.width / 2) / this.state.width);

    if (currentPage === this.previousPage) {
      if (gestureState.dx > 50) {
        currentPage += 1;
      } else if (gestureState.dx < -50) {
        currentPage -= 1;
      } else {
        let realCurrentPage = (currentPage * -1 +1) % (this.props.children.length + 1);
        if (realCurrentPage === 0) {
          realCurrentPage = 1;
        }

        if (Math.abs(gestureState.dx) < 10 && Math.abs(gestureState.dy) < 10) {
          if (this.props.onPress) {
            this.props.onPress(realCurrentPage);
          }
        }
      }
    }

    this.movePage(currentPage);
  }

  movePage(currentPage: number) {
    this.previousPage = currentPage;
    this.scrollSpring.setEndValue(currentPage * this.state.width);

    this.currentPage = currentPage * -1 +1;

    if (this.currentPage > this.props.children.length) {
      this.currentPage = 1;
    }

    this.setState({ currentPage: this.currentPage });

    if (this.props.onChangePage) {
      this.props.onChangePage(this.currentPage);
    }
  }

  onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    this.setState({ width, height });
  }

  render() {
    const width = this.state.width * this.props.children.length;

    const slideStyle = { width: this.state.width, height: this.state.height };
    const slides = this.props.children.map((slide, index) => (
      <View key={index} style={slideStyle}>
        {slide}
      </View>
    ));

    return (
      <View
        style={[styles.container, this.props.style]}
        onLayout={this.onLayout}
        {...this.panResponder.panHandlers}
      >
        <View
          ref={scrollPanel => { this.scrollPanel = scrollPanel; }}
          style={[styles.scrollPanel, { width }]}
        >
          {slides}
          <View style={slideStyle}>
            {this.props.children[0]}
          </View>
        </View>
        <PagerIndicator
          currentPage={this.state.currentPage}
          {...this.props}
        />
      </View>
    );
  }
}

Carousel.propTypes = {
  ...View.props,
};

export default Carousel;
