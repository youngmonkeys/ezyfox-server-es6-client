import EzyCommand from './ezy-command'
import EzyCommands from './ezy-commands'
import EzyEventType from './ezy-event-type'
import EzyDisconnectReasons from './ezy-disconnect-reasons'
import EzyDisconnectionEvent from './ezy-disconnection-event'

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
        this.client.onDisconected(reason);
        var event = new EzyDisconnectionEvent(reason);
        this.handleEvent(event);
    }

    handleMessage(message) {
        var cmd = EzyCommands[message[0]];
        var data = message.length > 1 ? message[1] : [];
        if(!this.unloggableCommands.includes(cmd))
            console.log('received cmd: ' + cmd.name + ", data: " + JSON.stringify(data));
        if(cmd === EzyCommand.DISCONNECT)
            this.handleDisconnectionData(data);
        else
            this.handleResponseData(cmd, data);
    }

    handleDisconnectionData(resonseData) {
        var reasonId = resonseData[0];
        var reason = EzyDisconnectReasons[reasonId];
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