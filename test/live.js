const Seneca = require('seneca')

Seneca({ legacy: false })
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
  .use('../', {
  })
  .ready(async function() {
    const seneca = this

    console.log(await seneca.post('sys:provider,provider:slack,get:info'))
    
    const channels = await seneca.entity("provider/slack/channel").list$({})
    console.log('channels', channels.length)
    
    let res = await seneca.post('service:slack,action:postMessage', { 
      id: channels[2]?.id,
      text: 'bot interacted ' + Math.random(),
    })
    console.log("RES: ", res)
    
  })

