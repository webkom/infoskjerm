import App, { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';

export default class Infoskjerm extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head>
          <title>Webkom · Infoskjerm</title>
        </Head>
        <Component {...pageProps} />
      </Container>
    );
  }
}
