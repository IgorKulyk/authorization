import React from "react";
import { View } from "react-native";
import firebase from "firebase";
import { Header, Button, CardSection, Spinner } from "./src/components/common";
import LoginForm from "./src/components/LoginForm";

class App extends React.Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyCY7r3QBLW2gw7zu-snTjHf4qWBxLb__ow",
      authDomain: "auth-f30b0.firebaseapp.com",
      databaseURL: "https://auth-f30b0.firebaseio.com",
      projectId: "auth-f30b0",
      storageBucket: "",
      messagingSenderId: "561854267058",
      appId: "1:561854267058:web:e20a420f15597c5c5a93ab"
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <CardSection>
            <Spinner size="large" />
          </CardSection>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
