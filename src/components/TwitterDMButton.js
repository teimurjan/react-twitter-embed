import React, { Component } from 'react'
import PropTypes from 'prop-types'

const script = require('scriptjs')

script('https://platform.twitter.com/widgets.js', 'twitter-embed')

export default class TwitterDMButton extends Component {
  static propTypes = {
    /**
         * Twitter user id for DM button
         */
    id: PropTypes.number.isRequired,
    /**
         * Additional options to be added to the button
         */
    options: PropTypes.object
  };

  componentDidMount() {
    script.ready('twitter-embed', () => {
      if (!window.twttr) {
        console.error('Failure to load window.twttr in TwitterDMButton, aborting load.')
        return
      }

      if (!this.isMountCanceled) {
        window.twttr.widgets.createDMButton(
          this.props.id,
          this.refs.embedContainer,
          this.props.options
        )
      }
    })
  }

  componentWillUnmount() {
    this.isMountCanceled = true
  }

  render() {
    return (
      <div ref='embedContainer' />
    )
  }
}
