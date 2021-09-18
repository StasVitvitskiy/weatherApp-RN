import * as React from 'react';
import {PureComponent} from 'react';
import {View, TextInput, StyleSheet, Button, Text} from 'react-native';
import {connect} from 'react-redux';
import {requestForecast, setCity, WeatherState} from '../store/weatherSlice';
import {RootState} from '../store';
import {getCityFomIp} from '../store/geoSaga';

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#414141',
    opacity: 0.5,
    color: 'white',
    borderRadius: 5,
  },
});
export const SearchBar = connect((state: RootState) => state.weather, {
  setCity,
  requestForecast,
  getCityFomIp,
})(
  class extends PureComponent<
    WeatherState & {
      setCity: typeof setCity;
      requestForecast: typeof requestForecast;
      getCityFomIp: typeof getCityFomIp;
    }
  > {
    componentDidMount() {
      this.props.getCityFomIp();
    }

    render() {
      return (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Find a city"
            placeholderTextColor="#FFF"
            onChangeText={text => this.props.setCity(text)}
            value={this.props.city}
          />
          <Button
            onPress={() => {
              this.props.requestForecast({
                city: this.props.city,
                lang: this.props.lang,
              });
            }}
            title="Find"
            color="#841584"
          />
          <Text>
            THE TEMP IN {this.props?.forecast?.city?.name}{' '}
            {(this.props?.forecast?.list || [])[0]?.main?.temp}
          </Text>
        </View>
      );
    }
  },
);
