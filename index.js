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
import EzyClientConfig from './ezy-client-config'
import EzyConnectionSuccessHandler from './ezy-connection-success-handler'
import EzyDisconnectionHandler from './ezy-disconnection-handler'
import EzyHandshakeHandler from './ezy-handshake-handler'
import EzyLoginSuccessHandler from './ezy-login-success-handler'
import EzyPongHandler from './ezy-pong-handler'
import EzyAppAccessHandler from './ezy-app-access-handler'
import EzyAppResponseHandler from './ezy-app-response-handler'
import EzyConnectionFailureHandler from './ezy-connection-failure-handler'


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
    ClientConfig                : EzyClientConfig,
    User                        : EzyUser,
    Zone                        : EzyZone,
    ConnectionSuccessHandler    : EzyConnectionSuccessHandler,
    ConnectionFailureHandler    : EzyConnectionFailureHandler,
    DisconnectionHandler        : EzyDisconnectionHandler,
    HandshakeHandler            : EzyHandshakeHandler,
    LoginSuccessHandler         : EzyLoginSuccessHandler,
    AppAccessHandler            : EzyAppAccessHandler,
    AppResponseHandler          : EzyAppResponseHandler,
    PongHandler                 : EzyPongHandler
}

export default Ezy