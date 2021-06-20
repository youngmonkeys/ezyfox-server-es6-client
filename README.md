# ezyfox-server-es6-client <img src="https://github.com/youngmonkeys/ezyfox-server/blob/master/logo.png" width="64" />
javascript emacs 6 client for ezyfox server

# Synopsis

javascript emacs 6 client for ezyfox server

# Documentation

[https://youngmonkeys.org/ezyfox-es6-client-sdk/](https://youngmonkeys.org/ezyfox-es6-client-sdk/)

# Code Example

You can find the full example [here](https://github.com/youngmonkeys/freechat/tree/master/reactjs/src/socket)

**1. Create ws client**
```javascript
var config = new Ezy.ClientConfig;
config.zoneName = "zoneName";
var clients = Ezy.Clients.getInstance();
var client = clients.newDefaultClient(config);
```

**2. Setup ws client***

```javascript
var setup = client.setup;
setup.addEventHandler(Ezy.EventType.DISCONNECTION, disconnectionHandler);
setup.addDataHandler(Ezy.Command.HANDSHAKE, handshakeHandler);
setup.addDataHandler(Ezy.Command.LOGIN, userLoginHandler);
setup.addDataHandler(Ezy.Command.APP_ACCESS, accessAppHandler);
var setupApp = setup.setupApp("appName");
setupApp.addDataHandler("command", function(app, data) {
    controller.contactController.handleSuggestedContactsResponse(data);
});
```

**3. Connect to server**

```javascript
client.connect("ws://localhost:2208/ws");
```

# Installation

```
npm i ezyfox-es6-client
```