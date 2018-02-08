var eseict;
(function (eseict) {
    var MessageBroker = (function () {
        function MessageBroker() {
            this.uid = this.getGUID();
            this.callbackMap = new MessageCallbackMap();
            this.bDebugMode = false;
            this.initListener();
            //console.log(this.callbackMap);
        }
        MessageBroker.prototype.addCommandHandler = function (command, callback) {
            this.callbackMap.put(command, callback);
        };
        MessageBroker.prototype.sendMessage = function (command, params, target) {
            var msg = {};
            if (arguments[1] == null) {
                throw "Second param : [Command] is Not Allowed Null";
            }
            else {
                msg.command = command;
                msg.uid = this.uid;
                msg.data = params;
            }
            if (this.isDefined(arguments[2])) {
            	target.postMessage(msg, '*');
            }else{
            	throw "First param : [Target] is not allowed null";
            }
        };
        MessageBroker.prototype.setDebugLog = function (flag) {
            this.bDebugMode = flag;
        };
        MessageBroker.prototype.initListener = function () {
            var thisAsign = this;
            function messageHandling(e) {
                var uid = e.data.uid;
                if (thisAsign.uid != uid) {
                    var command = e.data.command;
                    if (thisAsign.callbackMap.containsKey(command)) {
                        var callbackFunction = thisAsign.callbackMap.get(command);
                        if (callbackFunction instanceof Function) {
                            var msgData = e.data.data;
                            //console.log(e);
                            msgData.tttttt = "123123";
                            callbackFunction(msgData);
                        }
                    }
                }
                if (thisAsign.bDebugMode) {
                    console.log("PostMessage Object : ");
                    console.log(e);
                    console.log("Brokers UID : " + thisAsign.uid);
                    if (thisAsign.callbackMap.containsKey(command)) {
                        console.log("Command Handler exist");
                    }
                    else {
                        console.log("Command Handler is not exist");
                    }
                }
            }
            if (window.addEventListener) {
                window.addEventListener('message', messageHandling, false);
            }
            else if (window.attachEvent) {
                window.attachEvent('onmessage', messageHandling);
            }
        };
        MessageBroker.prototype.getGUID = function () {
            var lut = [];
            for (var i = 0; i < 256; i++) {
                lut[i] = (i < 16 ? '0' : '') + (i).toString(16);
            }
            var d0 = Math.random() * 0xffffffff | 0;
            var d1 = Math.random() * 0xffffffff | 0;
            var d2 = Math.random() * 0xffffffff | 0;
            var d3 = Math.random() * 0xffffffff | 0;
            return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
                lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
                lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
                lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
        };
        MessageBroker.prototype.isDefined = function (obj) {
            return typeof obj !== 'undefined';
        };
        return MessageBroker;
    }());
    eseict.MessageBroker = MessageBroker;
    var MessageCallbackMap = (function () {
        function MessageCallbackMap() {
            this.ar = [];
        }
        MessageCallbackMap.prototype.put = function (key, value) {
            var indx = this.getIndex(key);
            if (indx > -1) {
                this.ar[indx] = { key: key, value: value };
            }
            else {
                this.ar.push({ key: key, value: value });
            }
        };
        MessageCallbackMap.prototype.get = function (key) {
            var indx = this.getIndex(key);
            if (indx > -1) {
                return this.ar[indx].value;
            }
            else {
                return null;
            }
        };
        MessageCallbackMap.prototype.clearImmediate = function () {
            this.ar = new Array(0);
        };
        MessageCallbackMap.prototype.containsKey = function (key) {
            var indx = this.getIndex(key);
            return indx > -1;
        };
        MessageCallbackMap.prototype.getIndex = function (key) {
            var index = -1;
            for (var i = 0; i < this.ar.length; i++) {
                var item = this.ar[i];
                if (item.key == key) {
                    index = i;
                    break;
                }
            }
            return index;
        };
        return MessageCallbackMap;
    }());
})(eseict || (eseict = {}));
export default eseict.MessageBroker;
//# sourceMappingURL=messageBroker.js.map