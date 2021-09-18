import * as React from 'react';
import {PureComponent} from 'react';
import {SafeAreaView, Dimensions, StyleSheet} from 'react-native';
import {SearchBar} from './src/components/SearchBar';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {AppBackground} from './src/components/appBg';

const Dev_Height = Dimensions.get('window').height;
const Dev_Width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    height: Dev_Height,
    width: Dev_Width,
  },
});

export class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <AppBackground>
            <SearchBar />
          </AppBackground>
        </SafeAreaView>
      </Provider>
    );
  }
}
