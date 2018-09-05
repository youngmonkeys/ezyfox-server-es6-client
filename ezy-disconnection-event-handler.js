class EzyDisconnectionEventHandler {
    handle(context, reason) {
        console.log("disconnected, reason: " + reason.name);
        context.stopPing();
    }
}

export default EzyDisconnectionEventHandler