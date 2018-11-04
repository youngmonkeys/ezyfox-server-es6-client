import Const from './ezy-constants'
import Event from './ezy-events'

class EzyEventMessageHandler {

    constructor(client) {
        this.client = client;
        this.handlerManager = client.handlerManager;
        this.unloggableCommands = client.unloggableCommands;
    }

    handleEvent(event) {
        var eventHandler = this.handlerManager.getEventHandler(event.getType());
        if(eventHandler)
            eventHandler.handle(event);
        else
            console.log('has no handler with event: ' + event.getType());
    }

    handleDisconnection(reason) {
        this.client.onDisconnected(reason);
        var event = new Event.EzyDisconnectionEvent(reason);
        this.handleEvent(event);
    }

    handleMessage(message) {
        var cmd = Const.EzyCommands[message[0]];
        var data = message.length > 1 ? message[1] : [];
        if(!this.unloggableCommands.includes(cmd))
            console.log('received cmd: ' + cmd.name + ", data: " + JSON.stringify(data));
        if(cmd === Const.EzyCommand.DISCONNECT)
            this.handleDisconnectionData(data);
        else
            this.handleResponseData(cmd, data);
    }

    handleDisconnectionData(resonseData) {
        var reason = resonseData[0];
        this.handleDisconnection(reason);
    }

    handleResponseData(cmd, responseData) {
        var handler = this.handlerManager.getDataHandler(cmd);
        if(handler)
            handler.handle(responseData);
        else
            console.log("has no handler with command: " + cmd.name);
    }
}

export default EzyEventMessageHandler