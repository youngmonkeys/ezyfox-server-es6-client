import EzyAppAccessHandler from './ezy-app-access-handler'
import EzyAppDataHandler from './ezy-app-data-handler'
import EzyAppResponseHandler from './ezy-app-response-handler'
import EzyApp from './ezy-app'
import EzyClient from './ezy-client'
import EzyClients from './ezy-clients'
import EzyCommand from './ezy-command'
import EzyCommands from './ezy-commands'
import EzyConnectionEventHandler from './ezy-connection-event-handler'
import EzyDisconnectReason from './ezy-disconnect-reason'
import EzyDisconnectionEventHandler from './ezy-disconnection-event-handler'
import EzyEventType from './ezy-event-type'
import EzyGuid from './ezy-guid'
import EzyHandshakeHandler from './ezy-handshake-handler'
import EzyLoginHandler from './ezy-login-handler'
import EzyMessageEventHandler from './ezy-message-event-handler'
import EzyPongHandler from './ezy-pong-handler'
import EzyRSAKeyPairGenerator from './ezy-rsa-keypair-generator'
import EzyUnlogCommands from './ezy-unlog-commands'
import EzyUser from './ezy-user'
import EzyZone from './ezy-zone'

const Ezy = Ezy || {};
Ezy.AppAccessHandler = EzyAppAccessHandler;
Ezy.AppDataHandler = EzyAppDataHandler;
Ezy.AppResponseHandler = EzyAppResponseHandler;
Ezy.App = EzyApp;
Ezy.Client = EzyClient;
Ezy.Clients = EzyClients;
Ezy.Command = EzyCommand;
Ezy.Commands = EzyCommands;
Ezy.ConnectionEventHandler = EzyConnectionEventHandler;
Ezy.DisconnectReason = EzyDisconnectReason;
Ezy.DisconnectionEventHandler = EzyDisconnectionEventHandler;
Ezy.EventType = EzyEventType;
Ezy.Guid = EzyGuid;
Ezy.HandshakeHandler = EzyHandshakeHandler;
Ezy.LoginHandler = EzyLoginHandler;
Ezy.MessageEventHandler = EzyMessageEventHandler;
Ezy.PongHandler = EzyPongHandler;
Ezy.RSAKeyPairGenerator = EzyRSAKeyPairGenerator;
Ezy.UnlogCommands = EzyUnlogCommands;
Ezy.User = EzyUser;
Ezy.Zone = EzyZone;

Object.freeze(Ezy);

export default Ezy;