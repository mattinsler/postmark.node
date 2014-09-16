(function() {
  var Api, EmailsApi, Postmark, Rest,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Rest = require('rest.node');

  Api = {
    Emails: EmailsApi = (function() {
      function EmailsApi(client) {
        this.client = client;
      }

      EmailsApi.prototype.send = function(data, cb) {
        return this.client.post('/email', data, cb);
      };

      EmailsApi.prototype.batch = function(data, cb) {
        return this.client.post('/email/batch', data, cb);
      };

      return EmailsApi;

    })()
  };

  Postmark = (function(_super) {
    __extends(Postmark, _super);

    Postmark.hooks = {
      server_token: function(server_token) {
        return function(request_opts, opts) {
          if (request_opts.headers == null) {
            request_opts.headers = {};
          }
          return request_opts.headers['X-Postmark-Server-Token'] = server_token;
        };
      },
      json: function(request_opts, opts) {
        if (request_opts.headers == null) {
          request_opts.headers = {};
        }
        request_opts.headers.Accept = 'application/json';
        return request_opts.headers['Content-Type'] = 'application/json';
      },
      get: function(request_opts, opts) {
        return request_opts.qs = opts;
      },
      post: function(request_opts, opts) {
        return request_opts.json = opts;
      },
      debug: function() {
        return console.log(arguments);
      }
    };

    function Postmark(options) {
      this.options = options != null ? options : {};
      Postmark.__super__.constructor.call(this, {
        base_url: 'https://api.postmarkapp.com'
      });
      this.hook('pre:request', Postmark.hooks.json);
      if (this.options.api_key != null) {
        this.hook('pre:request', Postmark.hooks.server_token(this.options.api_key));
      }
      this.hook('pre:get', Postmark.hooks.get);
      this.hook('pre:post', Postmark.hooks.post);
      this.emails = new Api.Emails(this);
    }

    return Postmark;

  })(Rest);

  module.exports = Postmark;

}).call(this);
