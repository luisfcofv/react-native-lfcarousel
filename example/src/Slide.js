// @flow
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },
  textContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginHorizontal: 16,
    marginBottom: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  dateText: {
    fontSize: 12,
    color: 'black',
  },
  titleText: {
    fontSize: 24,
    textAlignVertical: 'center',
    color: 'black',
  },
});

function Slide({ slide }) {
  return (
    <Image style={styles.image} source={{ uri: slide.imageUrl }} resizeMode="cover">
      <View style={styles.textContainer}>
        <Text className="date" style={styles.dateText}>
          {slide.date.toUpperCase()}
        </Text>
        <Text className="titleText" style={styles.titleText}>
          {slide.title.toUpperCase()}
        </Text>
      </View>
    </Image>
  );
}

Slide.propTypes = {
  slide: React.PropTypes.shape({}).isRequired,
};

export default Slide;
