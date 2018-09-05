import EzyCommand from './ezy-command'
import EzyUnlogCommands from './ezy-unlog-commands'
import EzyEventType from './ezy-event-type'
import EzyCommands from './ezy-commands'

class EzyMessageEventHandler {
    handle(context, message) {
        var cmd = EzyCommands[message[0]];
        var data = message.length > 1 ? message[1] : [];
        if(!EzyUnlogCommands.includes(cmd)) {
            console.log('received cmd: ' + cmd.name + ", data: " + JSON.stringify(data));
        }
        if(cmd === EzyCommand.DISCONNECT) {
            context.connected = false;
            context.disconnected = true;
            var disconnectReason = data[0];
            var eventHandler = context.getEventHandler(EzyEventType.DISCONNECTION);
            eventHandler.handle(context, disconnectReason);
        }
        else if(cmd === EzyCommand.PONG) {
            var dataHandler = context.getDataHandler(EzyCommand.PONG);
            dataHandler.handle(context);
        }
        else {
            var handler = context.getDataHandler(cmd);
            if(handler)
                handler.handle(context, data);
            else
                console.log("has no handler with command: " + cmd.name);
        }
    }
}

export default EzyMessageEventHandler