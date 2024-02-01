/* Copyright © 2022 Seneca Project Contributors, MIT License. */

const Pkg = require('../package.json')

module.exports = {
  print: false,
  pattern: 'sys:provider,provider:slack',
  allow: { missing: true },
  
  data: {
    slack: {
      conversation: {
        c01: { id: '101', text: "hello" }
      },
      channel: {
        ch01: { id: '102', name: "internal" }
      }
    },
  },
  
  calls: [
    {
      name: 'get_info',
      pattern: 'get:info,provider:slack,sys:provider',
      out: {
        ok: true,
        name: 'slack',
        version: Pkg.version,
      },
    },
    
    {
      name: 'list_conversation',
      pattern: 'base:slack,cmd:list,name:conversation,role:entity',
      params: {},
      out: [
        { 'entity$': '-/slack/conversation', id: '101', text: "hello" }
      ]
    },
    
    {
      name: 'list_channel',
      pattern: 'base:slack,cmd:list,name:channel,role:entity',
      params: {},
      out: [
        { 'entity$': '-/slack/channel', id: '102', name: "internal" }
      ]
    },
    
  ]
}
