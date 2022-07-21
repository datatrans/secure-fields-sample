
function SecureFields() {
  var instance = {};
  var instanceId = generateRandomId();
  var callbacks = {};

  var Mode = {
      TOKENIZE: "TOKENIZE",
      PAY: "PAY",
      REGISTER: "REGISTER"
  };

  var context = "/upp/payment/SecureFields",
      options,
      fields,
      fieldNames,
      masterFieldName,
      ready,
      merchantId,
      transactionId,
      formId,
      mode,
      paymentMethods;

  function reset() {
      options = {};
      fields = {};
      fieldNames = [];
      ready = false;
      formId = "";
      paymentMethods = null;
      masterFieldName = null;
      callbacks = {};
  }

  reset();

  function log() {
      if (window.console && options.debug) {
          var args = Array.prototype.slice.call(arguments).map( function(o) {
              return (typeof o === "object" ) ? JSON.stringify(o, null, "\t") : o;
          });
          args.splice(1, 0, "color: blue");
          args[0] = "%c" + args[0];
          console.log.apply(console, args);
      }
  }

  function generateRandomId() {
      return Math.random().toString(36).substr(2, 9);
  }

  function getFrameName(field) {
      return 'securefields-' + instanceId + '--' + field;
  }

  instance.initTokenize = function( _merchantId, _fields, _options ) {
      mode = Mode.TOKENIZE;
      _init( _merchantId, null, _fields, _options );
  };

  instance.initPay = function( _merchantId, _fields, _options ) {
      mode = Mode.PAY;
      _init( _merchantId, null, _fields, _options );
  };

  instance.initRegister = function( _merchantId, _fields, _options ) {
      mode = Mode.REGISTER;
      _init( _merchantId, null, _fields, _options );
  };

  instance.init = function( _transactionId, _fields, _options ) {
      _init( null, _transactionId, _fields, _options );
  };

  /**
   *
   * var options = { debug: true };
   *
   * SecureFields.initTokenize( "1000011011", {
   *     cardNumber: "cardNumberPlaceholder",
   *     cvv: "cvvPlaceholder"
   * }, options);
   *
   * @param _merchantId
   * @param _transactionId
   * @param _fields
   * @param _options
   */
  function _init(_merchantId, _transactionId, _fields, _options) {
      reset();

      merchantId = _merchantId;
      transactionId = _transactionId;
      options = _options || {};

      for (var fieldName in _fields) {
          if (!_fields.hasOwnProperty(fieldName) ) {
              return;
          }

          var value = _fields[fieldName];
          var placeholderElementId;

          if ( typeof value === "object" ) {
              placeholderElementId = value.placeholderElementId;
          }
          else {
              placeholderElementId = value;
          }

          fields[fieldName] = {
              "fieldName": fieldName,
              "placeholderElementId": placeholderElementId,
              "placeholder": value.placeholder,
              "ariaLabel": value.ariaLabel,
              "inputType": value.inputType,
              "iframeTitle": value.iframeTitle,
              "alive": false
          };

          fieldNames.push(fieldName);
      }

      fieldNames.sort(function(fa, fb) {
          if (fa === "cardNumber") {
              return -1;
          } else
          if (fb === "cardNumber") {
              return 1;
          } else {
              return fa.localeCompare(fb);
          }
      });

      if (Object.prototype.toString.call(options.paymentMethods) === Object.prototype.toString.call([]) &&
          options.paymentMethods.length > 0) {
          paymentMethods = options.paymentMethods.join(",");
      }

      log( "Initializing iframes for merchantId/transactionId %s/%s", merchantId, transactionId, fields, options);

      masterFieldName = fieldNames[0];

      createIframe(fields[masterFieldName]);
  }

  function createIframe(field) {
      var placeholder = document.getElementById(field.placeholderElementId);

      var parameters = {
          "mode": mode,
          "merchantId": merchantId,
          "transactionId": transactionId,
          "fieldName": field.fieldName,
          "formId": formId,
          "placeholder": field.placeholder,
          "ariaLabel": field.ariaLabel,
          "inputType": field.inputType,
          "debug": options.debug,
          "countryCode": options.countryCode,
          "version": datatransPaymentConfig.version,
          "paymentMethods": paymentMethods,
          "fieldNames": fieldNames.join(","),
          "instanceId": instanceId
      };

      var frameName = getFrameName(field.fieldName);

      var attributes = {
          "id": frameName,
          "name": frameName,
          "src": datatransPaymentConfig.endpoint + context + "/paymentField?" + param(parameters),
          "sandbox": "allow-scripts allow-same-origin allow-forms",
          "frameborder": "0",
          "scrolling": "no",
          "class": frameName,
          "title": field.iframeTitle
      };
      var iframe = document.createElement('iframe');
      Object.keys(attributes)
          .filter(function (key) {
              return attributes[key] !== undefined;
          })
          .forEach(function (key) {
              iframe.setAttribute(key, attributes[key]);
          });
      iframe.setAttribute('style', 'width: 100%; height: 100%');

      while (placeholder.hasChildNodes()) {
          placeholder.removeChild(placeholder.lastChild);
      }
      placeholder.appendChild(iframe);

      log("Created iframe for field %s", field);
      field.iframe = iframe[0];
  }

  function createRemainingIframes() {
      for (var i = 1; i < fieldNames.length; i++) {
          createIframe(fields[fieldNames[i]]);
      }
  }

  function deleteIframe(field) {
      var iframe = document.getElementById(getFrameName(field.fieldName));
      if (iframe) {
          iframe.parentNode.removeChild(iframe);
      }
  }

  function deleteIframes() {
      for (var i = 0; i < fieldNames.length; i++) {
          deleteIframe(fields[fieldNames[i]]);
      }
  }

  instance.setStyle = function(p1,p2,globalSelector) {
      var styles = (typeof p1 === "object") ? p1 : (function() { var p = {}; p[p1] = p2; return p; })();

      for (var selector in styles) {
          if (!styles.hasOwnProperty(selector)) {
              continue;
          }

          var style = styles[selector],
              selectorTokens = [],
              regex = /(^cardNumber|^cvv|^\*|:{1,2}[\w-]([\w\-.]|\(.*\))+|\.\w+|^@media\s.*|^@font-face)/gi,
              matched;

          while(matched = regex.exec(selector)) {
              selectorTokens.push(matched[1]);
          }

          if (selectorTokens.length > 0 &&
              (selectorTokens[0].indexOf("@media") === 0 || selectorTokens[0].indexOf("@font-face") === 0)) {
              instance.setStyle(style,null,selectorTokens[0]);
              continue;
          }

          var targetFieldName = selectorTokens.shift();

          for (var fieldName in fields) {
              if (fields.hasOwnProperty(fieldName) && (targetFieldName === "*" || targetFieldName === fieldName) ) {
                  window.frames[getFrameName(fieldName)].postMessage({
                      "messageType": "setStyle",
                      "selectors": selectorTokens,
                      "style": style,
                      "globalSelector": globalSelector
                  }, "*");
              }
          }
      }
  };

  instance.setPlaceholder = function(fieldName,placeholder) {
      if (fields.hasOwnProperty(fieldName)) {
          window.frames[getFrameName(fieldName)].postMessage({
              "messageType": "setPlaceholder",
              "placeholder": placeholder
          }, "*");
      }
  };

  instance.setAriaLabel = function(fieldName, ariaLabel) {
      if (fields.hasOwnProperty(fieldName)) {
          window.frames[getFrameName(fieldName)].postMessage({
              "messageType": "setAriaLabel",
              "ariaLabel": ariaLabel
          }, "*");
      }
  };

  instance.submit = function(parameters, callback) {
      postMessageToForm("submitRequest", {
          "parameters": parameters,
          "browserDetails": {
              "browserUserAgent": navigator.userAgent,
              "browserJavaEnabled": navigator.javaEnabled(),
              "browserLanguage": navigator.language,
              "browserColorDepth": screen.colorDepth,
              "browserScreenHeight": screen.height,
              "browserScreenWidth": screen.width,
              "browserTZ": (new Date()).getTimezoneOffset()
          }
      }, callback);
  };

  instance.validate = function() {
      log("Sending validate event");
      window.frames[getFrameName(masterFieldName)].postMessage( {
          "messageType": "validateRequest"
      }, "*");
  };

  instance.getCardInfo = function(callback) {
      postMessageToForm("cardInfoRequest", {}, callback);
  };

  function postMessageToForm(messageType, data, callback) {
      if (callback !== undefined && callback instanceof Function) {
          var messageId = messageType + ":" + generateRandomId();
          callbacks[messageId] = callback;
          data.messageId = messageId;
      }
      data.messageType = messageType;

      log(">>> %s\n%s", messageType, data);

      window.frames[getFrameName(masterFieldName)].postMessage( data, "*");
  }

  instance.focus = function(field) {
      window.frames[getFrameName(field)].focus();
  };

  instance.clear = function(field) {
      window.frames[getFrameName(field)].postMessage( {
          "messageType": "clear"
      }, "*")
  };

  function receiveMessage(event) {
      if (instanceId !== event.data.instanceId) {
          return;
      }

      log( "<<< (instance id: %s)\n\torigin: %s\n\tdata: %s", instanceId, event.origin, event.data);

      if (datatransPaymentConfig.endpoint !== event.origin) {
          log( "message ignored. origin should be: %s", datatransPaymentConfig.endpoint );
          return;
      }

      var handlers = {
          "fieldReady": function(data) {
              if (!fields[data.fieldName]) {
                  return;
              }

              fields[data.fieldName].alive = true;

              if (data.fieldName === masterFieldName) {
                  formId = data.formId;
                  createRemainingIframes();
              }

              checkReadiness();
          },
          "initResponse": function(data) {
              data.error.action = "init";
              emit("error", data.error);
          },
          "submitResponse": function(data) {
              var response = data.response;
              var success = response.result === "success";
              delete response.result;
              if (success) {
                  emit("success", data.response);
              } else {
                  data.response.action = "submit";
                  emit("error", data.response);
              }
          },
          "validateResponse": function(data) {
              emit("validate", data.response);
          },
          "cardInfoResponse": function(data) {
              emit("cardInfo", data.response);
          },
          "change": function(data) {
              emit("change", data.response);
          }
      };

      var messageId = event.data.messageId;
      var callback = callbacks[messageId];

      if (callback !== undefined) {
          delete callbacks[messageId];
          callback.apply(instance, [event.data.response]);
      } else {
          var handler = handlers[event.data.messageType];
          if (handler) {
              handler.apply(instance, [event.data]);
          }
      }
  }

  window.addEventListener("message", receiveMessage, false);

  //////////////////////////////////////////
  function checkReadiness() {
      ready = Object.keys(fields)
          .map(function(key, index) {
              return fields[key].alive;
          })
          .reduce(function(a, b) { return a && b; }, true);

      if (ready) {
          log("All iframes are ready. Sending ready event.");
          if (typeof options.styles !== "undefined") {
              instance.setStyle(options.styles);
          }
          if (typeof options.focus !== "undefined") {
              instance.focus(options.focus);
          }
          emit("ready");

          initFocusHack();
      }
  }

  function checkFocus(event) {
      Object.keys(fields).map(function (fieldName) {
            var frame = window.frames[getFrameName(fieldName)];
            if (typeof frame !== "undefined") {
                frame.postMessage({
                    "messageType": "checkFocus"
                }, "*");
            }
        });
    }

    function initFocusHack() {
        document.addEventListener("touchend", checkFocus, true);
    }

    //////////////////////////////////////////
    var handlers = {};

    instance.on = function(event, handler) {
        handlers[event] = handler;
    };

    var emit = function() {
        var args = Array.prototype.slice.call(arguments);
        var handler = handlers[args.shift()];
        if (handler) {
            handler.apply(null, args);
        }
    };
    //////////////////////////////////////////

    function param(parameters) {
        var str = Object.keys(parameters)
            .filter(function(key) {
                var value = parameters[key];
                return key && typeof value !== "undefined" && value !== null;
            })
            .map(function(key) {
                return key + '=' + parameters[key];
            }).join('&');

        return encodeURI(str);
    }

    instance.destroy = function() {
        window.removeEventListener("touchend", checkFocus, true);
        window.removeEventListener("message", receiveMessage, false);
        deleteIframes();
    };

    return instance;
};
var datatransPaymentConfig = {"endpoint":"https://pay.sandbox.datatrans.com","version":"2.0.0"};

export { SecureFields, datatransPaymentConfig}
