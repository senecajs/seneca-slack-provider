/* Copyright © 2022 Seneca Project Contributors, MIT License. */

import * as Fs from 'fs'

// const Fetch = require('node-fetch')


const Seneca = require('seneca')
const SenecaMsgTest = require('seneca-msg-test')

import SlackProvider from '../src/slack-provider'
import SlackProviderDoc from '../src/SlackProvider-doc'

const BasicMessages = require('./basic.messages.js')


// Only run some tests locally (not on Github Actions).
let Config = undefined
if (Fs.existsSync(__dirname + '/local-config.js')) {
  Config = require('./local-config')
}


describe('slack-provider', () => {

  test('happy', async () => {
    expect(SlackProvider).toBeDefined()
    expect(SlackProviderDoc).toBeDefined()

    const seneca = await makeSeneca()

    expect(await seneca.post('sys:provider,provider:slack,get:info'))
      .toMatchObject({
        ok: true,
        name: 'slack',
      })
  })


  test('messages', async () => {
    const seneca = await makeSeneca()
    await (SenecaMsgTest(seneca, BasicMessages)())
  })


  test('list-channel', async () => {
    if (!Config) return;
    const seneca = await makeSeneca()
    const list = await seneca.entity("provider/slack/channel").list$()
    
    expect(list.length > 0).toBeTruthy()
  })
  
  test('list-conversation, post-message', async () => {
    if (!Config) return;
    const seneca = await makeSeneca()
    
    const text = 'bot interacted ' + Math.random()
    

    const channel_list = await seneca.entity("provider/slack/channel").list$()
    
    let res = await seneca.post('service:slack,action:postMessage', { 
      id: channel_list[2].id,
      text,
    })
    
    const list = await seneca.entity("provider/slack/conversation").list$(
      { id: channel_list[2].id, sort$: { ts: 1 } }
    )
    
    expect(
      res.message.text === text &&
      list[list.length-1].text === text
    ).toBeTruthy()
    
    // console.log('LIST: ', list)
    
    expect(list.length > 0).toBeTruthy()
  })

})


async function makeSeneca() {
  const seneca = Seneca({ legacy: false })
    .test()
    .use('promisify')
    .use('entity')
    .use('env', {
      // debug: true,
      file: [__dirname + '/local-env.js;?'],
      var: {
        $SLACK_TOKEN: String,
      }
    })
    .use('provider', {
      provider: {
        slack: {
          keys: {
            token: { value: '$SLACK_TOKEN' },
          }
        }
      }
    })
    .use(SlackProvider, {
      // fetch: Fetch,
    })

  return seneca.ready()
}

