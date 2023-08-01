import Countries from '../data/Countries';
import States from '../data/States';
import UserProfile from '../models/UserProfile';

function isBool(val: any) {
    return (
        ['true', 'false', true, false].indexOf((val + '').toLowerCase()) !== -1
    );
}

function isTruthy(val: string) {
    return val && !!(val.trim()) && val.toLowerCase() === 'true';
}

function isFalsy(val: string) {
    return !val || !(val.trim()) || val.toLowerCase() === 'false';
}

const validations = {
    name: {
        validation: (val: any) => !!(val?.trim()) && /^.+$/i.test(val),
        message: 'Invalid value for name',
        skipValidation: {},
    },
    gender: {
        validation: (val: any) => !!(val?.trim()) && /^.+$/i.test(val),
        message: 'Invalid value for gender',
        skipValidation: {},
    },
    mobile: {
        validation: (val: any) => !!(val?.trim()) && /^[\d+]+$/i.test(val),
        message: 'Invalid value for mobile number',
        skipValidation: {},
    },
    permanentAddress: {
        validation: (val: any) => States.indexOf(val) !== -1,
        message: 'Invalid value for permanent address',
        skipValidation: {},
    },
    currentAddress: {
        validation: (val: string) => Countries.indexOf(val) !== -1,
        message: 'Invalid value for current address',
        skipValidation: {},
    },
    employmentStatus: {
        validation: (val: string) => !!(val?.trim()) && /^.+$/i.test(val),
        message: 'Invalid value for employment status',
        skipValidation: {},
    },
    employmentType: {
        validation: (val: string) =>
            ['Government Job', 'Non-Government Job'].indexOf(val) !== -1,
        message: 'Invalid value for employment type',
        skipValidation: {
            employmentStatus: (val: any) =>
                val !== 'Employed',
        },
    },
    NFAMembershipNumber: {
        validation: (val: string) => true,
        message: 'Invalid value for NFA membership number',
        skipValidation: {},
    },
    membershipFrom: {
        validation: (val: any) => States.indexOf(val) !== -1,
        message: 'Invalid value for membership from',
        skipValidation: {
            NFAMembershipNumber: (val: any) => isFalsy(val),
        },
    },
    isLifeMember: {
        validation: (val: any) => isBool(val),
        message: 'Invalid value for life membership',
        skipValidation: {
            NFAMembershipNumber: (val: any) => isFalsy(val),
        },
    },
    hasRenewed: {
        validation: (val: string) => isBool(val),
        message: 'Invalid value for renewal status',
        skipValidation: {
            NFAMembershipNumber: (val: any) => isFalsy(val),
            isLifeMember: (val: any) => isTruthy(val),
        },
    },
};

type ObjectKeys = keyof typeof validations;

export function sanitizer(obj: Record<ObjectKeys, any>) {
    const sanitized: Partial<Record<ObjectKeys, string | null>> = {};
    Object.entries(validations).forEach(
        (entry) => {
            const key = entry[0] as ObjectKeys;
            const { skipValidation } = entry[1];
            var shouldCheck = true;
            Object.entries(skipValidation).forEach(entry => {
                const skipKey = entry[0] as ObjectKeys;
                const skipFunc = entry[1] as (val: string) => boolean;
                if (skipFunc(obj[skipKey])) {
                    shouldCheck = false;
                }
            });
            if (shouldCheck) {
                sanitized[key] = obj[key];
            } else {
                sanitized[key] = null;
            }
        });
    return sanitized;
}

export default function (obj: Record<ObjectKeys, any>) {
    const errors: Partial<Record<ObjectKeys, string>> = {};
    Object.entries(validations).forEach(
        (entry) => {
            const key = entry[0] as ObjectKeys;
            const { validation, message, skipValidation } = entry[1];
            var shouldCheck = true;
            Object.entries(skipValidation).forEach(entry => {
                const skipKey = entry[0] as ObjectKeys;
                const skipFunc = entry[1] as (val: string) => boolean;
                if (skipFunc(obj[skipKey])) {
                    shouldCheck = false;
                }
            });
            if (shouldCheck && !validation(obj[key])) {
                errors[key] = message;
            }
        }
    );
    return errors;
}
