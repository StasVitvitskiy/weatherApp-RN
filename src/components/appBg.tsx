import * as React from 'react';
import {connect} from 'react-redux';
import {PureComponent, ReactNode} from 'react';
import {Dimensions, ImageBackground, StyleSheet} from 'react-native';
import {RootState} from '../store';
import {BackgroundState, requestBackground} from '../store/backgroundSlice';

const Dev_Height = Dimensions.get('window').height;
const Dev_Width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  bgImage: {
    height: Dev_Height,
    width: Dev_Width,
  },
});

export const AppBackground = connect((state: RootState) => state.background, {
  requestBackground,
})(
  class extends PureComponent<
    BackgroundState & {
      requestBackground: typeof requestBackground;
      children: ReactNode;
    }
  > {
    componentDidMount() {
      this.props.requestBackground();
    }

    render() {
      return (
        <ImageBackground
          source={{uri: this.props.background}}
          resizeMode="cover"
          style={styles.bgImage}>
          {this.props.children}
        </ImageBackground>
      );
    }
  },
);
