# ezyfox-server-es6-client <img src="https://github.com/youngmonkeys/ezyfox-server/blob/master/logo.png" width="48" height="48" />
javascript emacs 6 client for ezyfox server

# Synopsis

javascript emacs 6 client for ezyfox server

# Code Example

**1. Create ws client**
```javascript
var config = new Ezy.ClientConfig;
config.zoneName = "freechat";
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
var setupApp = setup.setupApp("freechat");
setupApp.addDataHandler("1", function(app, data) {
    controller.contactController.handleSuggestedContactsResponse(data);
});

setupApp.addDataHandler("2", function(app, data) {
    controller.contactController.handleAddContactsResponse(data);
});

setupApp.addDataHandler("4", function(app, data) {
    controller.messageController.handleSystemMessageResponse(data);
});

setupApp.addDataHandler("5", function(app, data) {
    controller.contactController.handleContactsResponse(data);
});

setupApp.addDataHandler("6", function(app, data) {
    controller.messageController.handleUserMessageResponse(data);
});
```

**3. Connect to server**

```javascript
client.connect("ws://localhost:2208/ws");
```