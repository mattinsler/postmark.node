Rest = require 'rest.node'

Api = {
  Emails: class EmailsApi
    constructor: (@client) ->
    send: (data, cb) -> @client.post('/email', data, cb)
    batch: (data, cb) -> @client.post('/email/batch', data, cb)
}

class Postmark extends Rest
  @hooks:
    server_token: (server_token) ->
      (request_opts, opts) ->
        request_opts.headers ?= {}
        request_opts.headers['X-Postmark-Server-Token'] = server_token
    
    json: (request_opts, opts) ->
      request_opts.headers ?= {}
      request_opts.headers.Accept = 'application/json'
      request_opts.headers['Content-Type'] = 'application/json'
    
    get: (request_opts, opts) ->
      request_opts.qs = opts
    
    post: (request_opts, opts) ->
      request_opts.json = opts
    
    debug: ->
      console.log arguments
  
  constructor: (@options = {}) ->
    super(base_url: 'https://api.postmarkapp.com')
    
    @hook('pre:request', Postmark.hooks.json)
    @hook('pre:request', Postmark.hooks.server_token(@options.api_key)) if @options.api_key?
    @hook('pre:get', Postmark.hooks.get)
    @hook('pre:post', Postmark.hooks.post)
    
    @emails = new Api.Emails(@)

module.exports = Postmark
