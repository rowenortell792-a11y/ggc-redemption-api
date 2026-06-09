import { MotherCore } from '../../core/MotherCore';

export const initEntity = (entityName) => {
    return MotherCore.verifyLink(entityName);
};

export const handleTraffic = (data) => {
    return MotherCore.processClickDashData(data);
};
