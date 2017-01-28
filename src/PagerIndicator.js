// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  pagerContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});

function getPagerIndicatorStyle(color, pagerMargin, pagerSize) {
  return {
    backgroundColor: color,
    borderRadius: pagerSize / 2,
    height: pagerSize,
    margin: pagerMargin,
    width: pagerSize,
  };
}

function PagerIndicator({
  activePagerColor,
  currentPage,
  pagerColor,
  pagerMargin,
  pagerOffset,
  pagerSize,
  children,
}) {
  const pager = children.map((child, index) => {
    let color = pagerColor;
    if (index + 1 === currentPage) {
      color = activePagerColor;
    }

    const pagerIndicatorStyle = getPagerIndicatorStyle(color, pagerMargin, pagerSize);
    return <View key={index} style={pagerIndicatorStyle} />;
  });

  const bottom = pagerOffset;
  return (
    <View style={[styles.pagerContainer, { bottom }]}>
      {pager}
    </View>
  );
}

PagerIndicator.propTypes = {
  activePagerColor: React.PropTypes.string,
  children: React.PropTypes.arrayOf(React.PropTypes.shape({})),
  currentPage: React.PropTypes.number,
  pagerColor: React.PropTypes.string,
  pagerMargin: React.PropTypes.number,
  pagerOffset: React.PropTypes.number,
  pagerSize: React.PropTypes.number,
};

PagerIndicator.defaultProps = {
  pagerOffset: 10,
  pagerMargin: 2,
  pagerSize: 10,
};

export default PagerIndicator;
