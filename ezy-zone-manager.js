
class EzyZoneManager {

    constructor() {
        this.zoneList = [];
        this.zonesBydId = {};
        this.zonesByName = {};
    }
    
    addZone(zone) {
        this.zoneList.push(zone);
        this.zonesBydId[zone.id] = zone;
        this.zonesByName[zone.name] = zone;
    }

    getZoneById(zoneId) {
        var zone = this.zonesBydId[zoneId];
        return zone;
    }

    getZoneByName(zoneName) {
        var zone = this.zonesByName[zoneName];
        return zone;
    }

    getZone() {
        if(this.zoneList.length == 0)
            return null;
        var zone = this.zoneList[0];
        return zone;
    }

    getZoneList() {
        return this.zoneList;
    }

    reset() {
        this.zoneList = [];
        this.zonesBydId = {};
        this.zonesByName = {};
    }
}

export default EzyZoneManager