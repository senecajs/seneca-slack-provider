/* Copyright © 2022-2023 Seneca Project Contributors, MIT License. */


const Pkg = require('../package.json')

const { WebClient } = require("@slack/web-api")


type SlackProviderOptions = {
  entity: Record<string, any>
  debug: boolean
}


function SlackProvider(this: any, options: SlackProviderOptions) {
  const seneca: any = this

  const makeUtils = this.export('provider/makeUtils')

  const {
    makeUrl,
    getJSON,
    postJSON,
    entityBuilder
  } = makeUtils({
    name: 'slack',
  })


  seneca
    .message('sys:provider,provider:slack,get:info', get_info)


  const makeConfig = (config?: any) => seneca.util.deep({
    headers: {
      ...seneca.shared.headers
    }
  }, config)
  
  function throw_error(message: string = "") {
    throw new Error(message)
  }
  
  async function get_info(this: any, _msg: any) {
    return {
      ok: true,
      name: 'slack',
      version: Pkg.version,
    }
  }


  entityBuilder(this, {
    provider: {
      name: 'slack'
    },
    entity: {
      channel: {
        cmd: {
          list: {
            action: async function(this: any, entize: any, msg: any) {
              let list = await this.shared.sdk.conversations.list()
              list = list.channels.map((data: any) => entize(data))
              return list
            },
          },
        }
      },
      conversation: {
        cmd: {
          list: {
            action: async function(this: any, entize: any, msg: any) {
              let q = msg.q || {}
              let channel_id = q.id || throw_error('Please, provide the channel id')
              let sortkey: any = null != typeof q.sort$
                && 1 == Object.keys(q.sort$ || {}).length
                && Object.keys(q.sort$)[0]
              
              let list: any = await this.shared.sdk.conversations.history({ channel: channel_id })
              if (list.ok) {
                const { messages }: any = list
                if (false !== sortkey) {
                    list.messages = q.sort$[sortkey] === -1 ?
                      messages.sort((a: any, b: any) => b[sortkey] - a[sortkey]) :
                      messages.sort((a: any, b: any) => a[sortkey] - b[sortkey])
                }
                list = list.messages.map((data: any) => entize(data))
              }
              
              return list
            },
          },
        }
      }
    }
  })
  
  seneca.message(
    'service:slack,action:postMessage',
    {
      id: String,
      text: String
    },
    async function(this: any, msg: any) {
      const id = msg.id || throw_error('Please, provide the channel id')
      const { chat } = this.shared.sdk
      let result = await chat.postMessage({ channel: id, text: msg.text })
      return result
    }
  )

  seneca.prepare(async function(this: any) {
    let res =
      await this.post('sys:provider,get:keymap,provider:slack')

    if (!res.ok) {
      throw this.fail('keymap')
    }

    let token = res.keymap.token.value
    this.shared.sdk = new WebClient(token)

  })


  return {
    exports: {
      sdk: () => this.shared.sdk,
    }
  }
}


// Default options.
const defaults: SlackProviderOptions = {

  entity: {},

  // TODO: Enable debug logging
  debug: false
}


Object.assign(SlackProvider, { defaults })

export default SlackProvider

if ('undefined' !== typeof (module)) {
  module.exports = SlackProvider
}
