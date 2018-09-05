class EzyAppResponseHandler {
    handle(context, data) {
        var appId = data[0];
        var responseData = data[1];
        var app = context.zone.appsById[appId];
        var handler = app.dataHandler;
        if(handler)
            handler.handle(app, responseData);
        else
            console.log("app: " + app.name + " has no handler");
    }
}

export default EzyAppResponseHandler