import Util from './ezy-util'
import Entity from './ezy-entities'
import Const from './ezy-constants'
import Config from './ezy-configs'
import EventHandler from './ezy-event-handlers'
import DataHandler from './ezy-data-handlers'
import EzyClient from './ezy-client'
import EzyClients from './ezy-clients'

const Ezy = {
    Guid                        : Util.EzyGuid,
    App                         : Entity.EzyApp,
    User                        : Entity.EzyUser,
    Zone                        : Entity.EzyZone,
    Command                     : Const.EzyCommand,
    Commands                    : Const.EzyCommands,
    DisconnectReason            : Const.EzyDisconnectReason,
    ConnectionFailedReason      : Const.EzyConnectionFailedReason,
    ConnectionStatus            : Const.EzyConnectionStatus,
    EventType                   : Const.EzyEventType,
    ClientConfig                : Config.EzyClientConfig,
    ConnectionSuccessHandler    : EventHandler.EzyConnectionSuccessHandler,
    ConnectionFailureHandler    : EventHandler.EzyConnectionFailureHandler,
    DisconnectionHandler        : EventHandler.EzyDisconnectionHandler,
    HandshakeHandler            : DataHandler.EzyHandshakeHandler,
    LoginSuccessHandler         : DataHandler.EzyLoginSuccessHandler,
    AppAccessHandler            : DataHandler.EzyAppAccessHandler,
    AppResponseHandler          : DataHandler.EzyAppResponseHandler,
    PongHandler                 : DataHandler.EzyPongHandler,
    Client                      : EzyClient,
    Clients                     : EzyClients
}

export default Ezy