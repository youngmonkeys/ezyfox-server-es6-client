export class EzyGuid {
    static generate() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return (
            s4() +
            s4() +
            '-' +
            s4() +
            '-' +
            s4() +
            '-' +
            s4() +
            '-' +
            s4() +
            s4() +
            s4()
        );
    }
}

export class EzyLogger {
    static debug() {
        return true;
    }

    static console(message) {
        if (EzyLogger.debug()) console.log(message);
    }
}

export default { EzyGuid, EzyLogger };
