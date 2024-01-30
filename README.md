![Seneca Slack-Provider](http://senecajs.org/files/assets/seneca-logo.png)

> _Seneca Slack-Provider_ is a plugin for [Seneca](http://senecajs.org)


Provides access to the Slack API using the Seneca *provider*
convention. Slack API entities are represented as Seneca entities so
that they can be accessed using the Seneca entity API and messages.

See [seneca-entity](https://github.com/senecajs/seneca-entity/blob/master/README.md) and the [Seneca Data
Entities
Tutorial](https://senecajs.org/docs/tutorials/understanding-data-entities.html) for more details on the Seneca entity API.

NOTE: underlying third party SDK needs to be replaced as out of date and has a security issue.

[![npm version](https://img.shields.io/npm/v/@seneca/slack-provider.svg)](https://npmjs.com/package/@seneca/slack-provider)
[![build](https://github.com/senecajs/seneca-slack-provider/actions/workflows/build.yml/badge.svg)](https://github.com/senecajs/seneca-slack-provider/actions/workflows/build.yml)
[![Coverage Status](https://coveralls.io/repos/github/senecajs/seneca-slack-provider/badge.svg?branch=main)](https://coveralls.io/github/senecajs/seneca-slack-provider?branch=main)
[![Known Vulnerabilities](https://snyk.io/test/github/senecajs/seneca-slack-provider/badge.svg)](https://snyk.io/test/github/senecajs/seneca-slack-provider)
[![DeepScan grade](https://deepscan.io/api/teams/5016/projects/19462/branches/505954/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=5016&pid=19462&bid=505954)
[![Maintainability](https://api.codeclimate.com/v1/badges/f76e83896b731bb5d609/maintainability)](https://codeclimate.com/github/senecajs/seneca-slack-provider/maintainability)


| ![Voxgig](https://www.voxgig.com/res/img/vgt01r.png) | This open source module is sponsored and supported by [Voxgig](https://www.voxgig.com). |
|---|---|


## Quick Example


```js

// Setup - get the key value (<SECRET>) separately from a vault or
// environment variable.
Seneca()
  // Get API keys using the seneca-env plugin
  .use('env', {
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
  .use('slack-provider')

let conversation = await seneca.entity('provider/slack/conversation')
  .list$({ id: '<slack-channel-id>' })

Console.log('CONVERSATION', conversation)

```

## Install

```sh
$ npm install @seneca/slack-provider @seneca/env
```



<!--START:options-->


## Options

* `entity` : object
* `debug` : boolean
* `init$` : boolean


<!--END:options-->

<!--START:action-list-->


## Action Patterns

* ["action":"postMessage","service":"slack"](#-actionpostMessageserviceslack-)
* ["sys":"entity","base":"slack","cmd":"list","name":"channel","zone":"provider"](#-sysentitybaseslackcmdlistnamechannelzoneprovider-)
* ["sys":"entity","base":"slack","cmd":"list","name":"conversation","zone":"provider"](#-sysentitybaseslackcmdlistnameconversationzoneprovider-)
* ["sys":"provider","get":"info","provider":"slack"](#-sysprovidergetinfoproviderslack-)


<!--END:action-list-->

<!--START:action-desc-->


## Action Descriptions

### &laquo; `"action":"postMessage","service":"slack"` &raquo;

No description provided.


#### Parameters


* _id_ : [Function: String]
* _text_ : [Function: String]


----------
### &laquo; `"sys":"entity","base":"slack","cmd":"list","name":"channel","zone":"provider"` &raquo;

List channel data into an entity.





#### Replies With


```
{}
```


----------
### &laquo; `"sys":"entity","base":"slack","cmd":"list","name":"conversation","zone":"provider"` &raquo;

List conversation data into an entity.





#### Replies With


```
{}
```


----------
### &laquo; `"sys":"provider","get":"info","provider":"slack"` &raquo;

Get information about the Slack SDK.



----------


<!--END:action-desc-->

## More Examples

## Motivation

## Support

Check out our sponsors and supporters, Voxgig, on their website [here](https://www.voxgig.com).

## API

## Contributing

The [SenecaJS org](http://senecajs.org/) encourages participation. If you feel you can help in any way, be
it with bug reporting, documentation, examples, extra testing, or new features, feel free
to [create an issue](https://github.com/senecajs/seneca-maintain/issues/new), or better yet - [submit a Pull Request](https://github.com/senecajs/seneca-maintain/pulls). For more
information on contribution, please see our [Contributing Guide](http://senecajs.org/contribute).

## Background

Check out the SenecaJS roadmap [here](https://senecajs.org/roadmap/)!
