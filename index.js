import EzyGuid from './ezy-guid'
import EzyApp from './ezy-app'
import EzyUser from './ezy-user'
import EzyZone from './ezy-zone'
import EzyClient from './ezy-client'
import EzyClients from './ezy-clients'
import EzyCommand from './ezy-command'
import EzyCommands from './ezy-commands'
import EzyEventType from './ezy-event-type'
import EzyConnectionStatus from './ezy-connection-status'
import EzyConnectionFailedReason from './ezy-connection-failed-reason'
import EzyDisconnectReason from './ezy-disconnect-reason'
import EzyConnectionSuccessHandler from './ezy-connection-success-handler'
import EzyDisconnectionEventHandler from './ezy-disconnection-handler'
import EzyHandshakeHandler from './ezy-handshake-handler'
import EzyLoginHandler from './ezy-login-handler'
import EzyPongHandler from './ezy-pong-handler'
import EzyAppAccessHandler from './ezy-app-access-handler'
import EzyAppResponseHandler from './ezy-app-response-handler'


const Ezy = {
    Guid                        : EzyGuid,
    App                         : EzyApp,
    Client                      : EzyClient,
    Clients                     : EzyClients,
    Command                     : EzyCommand,
    Commands                    : EzyCommands,
    DisconnectReason            : EzyDisconnectReason,
    EventType                   : EzyEventType,
    ConnectionFailedReason      : EzyConnectionFailedReason,
    ConnectionStatus            : EzyConnectionStatus,
    User                        : EzyUser,
    Zone                        : EzyZone,
    ConnectionEventHandler      : EzyConnectionSuccessHandler,
    DisconnectionEventHandler   : EzyDisconnectionEventHandler,
    HandshakeHandler            : EzyHandshakeHandler,
    LoginHandler                : EzyLoginHandler,
    AppAccessHandler            : EzyAppAccessHandler,
    AppResponseHandler          : EzyAppResponseHandler,
    PongHandler                 : EzyPongHandler
}

export default Ezy