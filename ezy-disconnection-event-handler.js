class EzyDisconnectionEventHandler {
    handle(context, reason) {
        console.log("disconnected, reason: " + reason.name);
        context.stopPing();
        this.handleDisconnection(context, reason);
    }

    handleDisconnection(context, reason) {
    }
}

export default EzyDisconnectionEventHandler