/* Copyright © 2024 Seneca Project Contributors, MIT License. */

const Joi = require('@hapi/joi')

const messages = {
  get_info: {
    desc: 'Get information about the Slack SDK.',
  },
  postMessage: {
    desc: 'Send a Slack message in a channel',
    examples: {},
    reply_desc: {}
  },
  
  list_conversation: {
    desc: 'List conversation data into an entity.',
    examples: {},
    reply_desc: {}
  },
  
  load_channel: {
    desc: 'Load channel data into an entity.',
    examples: {},
    reply_desc: {}
  },
  list_channel: {
    desc: 'List channel data into an entity.',
    examples: {},
    reply_desc: {}
  }

}

const sections = {
  /*
  intro: {
    path: '../seneca-provider/doc/intro.md'
  },

  support: {
    path: '../seneca-provider/doc/support.md'
  }
  */

}

export default {
  messages,
  sections,
}

if ('undefined' !== typeof(module)) {
  module.exports = {
    messages,
    sections,
  }
}
