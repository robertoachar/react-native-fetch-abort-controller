import React, { Component } from 'react';
import { Button, StyleSheet, Text, ScrollView } from 'react-native';
import 'abortcontroller-polyfill';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: null,
      data: null,
      error: null
    };

    this.handleFetch = this.handleFetch.bind(this);
    this.handleAbort = this.handleAbort.bind(this);
  }

  handleFetch() {
    if (!AbortController) {
      return this.setState({ status: 'Not implemented' });
    }

    this.controller = new window.AbortController();
    this.signal = this.controller.signal;

    this.setState({ status: 'loading...' });

    fetch('https://swapi.co/api/people/1', { signal: this.signal })
      .then((response) => response.json())
      .then((data) => this.setState({ status: 'loaded', error: null, data }))
      .catch((error) => this.setState({ error: error.name }));
  }

  handleAbort() {
    this.controller.abort();
    this.setState({ status: 'aborted' });
  }

  render() {
    const { data, status, error } = this.state;

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.welcome}>
          React Native + fetch + Abort Controller
        </Text>

        <Button title="Fetch data" onPress={this.handleFetch} />
        <Button title="Abort" onPress={this.handleAbort} />
        <Text style={styles.instructions}>{`Status: ${status}`}</Text>
        <Text style={styles.instructions}>{`Error: ${error}`}</Text>
        <Text style={styles.instructions}>Data</Text>
        <Text style={styles.instructions}>{JSON.stringify(data, null, 2)}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
