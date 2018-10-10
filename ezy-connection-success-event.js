import EzyEventType from './ezy-event-type'

class EzyConnectionSuccessEvent {

    getType() {
        return EzyEventType.CONNECTION_SUCCESS;
    }

}

export default EzyConnectionSuccessEvent