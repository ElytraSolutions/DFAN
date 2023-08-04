import Joi from 'joi';
import Countries from '../../public/data/Countries.json';
import States from '../../public/data/States.json';

function toBool(val: any) {
    if (val instanceof Boolean) {
        return val;
    }
    if (typeof val !== 'string') return val;
    if (['false', 'no'].indexOf(val.toLowerCase()) !== -1) {
        return false;
    }
    if (['true', 'yes'].indexOf(val.toLowerCase()) !== -1) {
        return true;
    }
}

const requiredStringMessages = {
    'string.empty': 'This field is required',
    'string.base': 'This field is required',
};
const selectMessages = {
    ...requiredStringMessages,
    'boolean.base': 'This field is required',
    'any.required': 'This field is required',
    'any.only': 'Select an option from the list',
};
export const UserProfileSchema = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            ...requiredStringMessages,
        }),
    gender: Joi.string()
        .required()
        .messages({
            ...requiredStringMessages,
        }),
    mobile: Joi.string()
        .required()
        .min(10)
        .max(10)
        .messages({
            ...requiredStringMessages,
            'string.min': 'Mobile number have 10 digits',
            'string.max': 'Mobile number have 10 digits',
        }),
    permanentAddress: Joi.any()
        .allow(...States)
        .only()
        .required()
        .messages({
            ...selectMessages,
        }),
    currentAddress: Joi.string()
        .allow(...Countries)
        .only()
        .required()
        .messages({
            ...selectMessages,
        }),
    employmentStatus: Joi.any()
        .valid('Employed', 'Unemployed')
        .required()
        .messages({
            ...selectMessages,
        }),
    employmentType: Joi.when('employmentStatus', {
        is: 'Employed',
        then: Joi.string()
            .allow('Government Job', 'Non-Government Job')
            .only()
            .required()
            .messages({
                ...selectMessages,
            }),
        otherwise: null,
    }),
    NFAMembershipNumber: Joi.string().allow(null).optional(),
    membershipFrom: Joi.when('NFAMembershipNumber', {
        is: Joi.exist().disallow(null),
        then: Joi.string()
            .allow(...States)
            .only()
            .required(),
        otherwise: Joi.any().optional().strip(),
    }),
    isLifeMember: Joi.when('NFAMembershipNumber', {
        is: Joi.exist().disallow(null),
        then: Joi.boolean().required(),
        otherwise: null,
    }),
    hasRenewed: Joi.when('NFAMembershipNumber', {
        is: Joi.exist().disallow(null),
        then: Joi.when('isLifeMember', {
            is: false,
            then: Joi.boolean().required(),
            otherwise: null,
        }),
        otherwise: null,
    }),
    avatar: Joi.any().optional(),
});

export function sanitizer(obj: Record<string, any>) {
    if ('isLifeMember' in obj) obj.isLifeMember = toBool(obj.isLifeMember);
    if ('hasRenewed' in obj) obj.hasRenewed = toBool(obj.hasRenewed);
    return obj;
}
