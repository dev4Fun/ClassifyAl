import React, { Component } from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ImageGrid from './components/ImageGrid';
import MostPopular from './components/MostPopularSection';
import SubmitImageSection from './components/SubmitImageSection';
import Footer from './components/Footer';
import ChipList from './components/ChipList';
import IntroText from './components/IntroText';
import CallToAction from './components/CallToAction';
import { Container, Row, Col } from 'react-grid-system';

import {
  white, indigo200, indigo500, indigo700,
  blueA200, grey900, grey600, grey400
} from 'material-ui/styles/colors';

const styles = {
  container: {
    margin: '8px'
  },

  background: {
    backgroundImage: 'url("./assets/background1.jpg")',
    backgroundPosition: 'right'
  }
};

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo500,
    primary2Color: indigo700,
    primary3Color: indigo200,
    textColor: grey900,
    alternateTextColor: white,
    accent1Color: blueA200,
    accent2Color: grey600,
    accent3Color: grey900,

  },
});

class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
    };
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <section style={styles.background}>
            <IntroText />
            <ImageGrid />
            <ChipList />
            <CallToAction />
          </section>

          <div style={styles.container}>
            <Row>
              <Col lg={2} md={3} sm={4}>
                <MostPopular />
              </Col>
              <Col lg={10} md={9} sm={8}>
                <SubmitImageSection />
              </Col>
            </Row>
          </div>

          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
