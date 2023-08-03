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

export const UserProfileSchema = Joi.object({
    name: Joi.string().required(),
    gender: Joi.string().required(),
    mobile: Joi.string().required().min(10).max(10).messages({
        'string.min': 'Mobile number have 10 digits',
        'string.max': 'Mobile number have 10 digits',
    }),
    permanentAddress: Joi.any()
        .allow(...States)
        .only()
        .required(),
    currentAddress: Joi.string()
        .allow(...Countries)
        .only()
        .required(),
    employmentStatus: Joi.string().required(),
    employmentType: Joi.when('employmentStatus', {
        is: 'Employed',
        then: Joi.string()
            .allow('Government Job', 'Non-Government Job')
            .only()
            .required(),
        otherwise: Joi.string().strip(),
    }),
    NFAMembershipNumber: Joi.number().optional(),
    membershipFrom: Joi.when('NFAMembershipNumber', {
        is: Joi.exist(),
        then: Joi.string()
            .allow(...States)
            .only()
            .required(),
        otherwise: Joi.string().strip(),
    }),
    isLifeMember: Joi.when('NFAMembershipNumber', {
        is: Joi.exist(),
        then: Joi.boolean().required(),
        otherwise: Joi.string().strip(),
    }),
    hasRenewed: Joi.when('NFAMembershipNumber', {
        is: Joi.exist(),
        then: Joi.when('isLifeMember', {
            is: Joi.boolean().falsy(),
            then: Joi.boolean().required(),
            otherwise: Joi.string().strip(),
        }),
        otherwise: Joi.string().strip(),
    }),
    avatar: Joi.any().optional(),
});

export function sanitizer(obj: Record<string, any>) {
    if ('isLifeMember' in obj) obj.isLifeMember = toBool(obj.isLifeMember);
    if ('hasRenewed' in obj) obj.hasRenewed = toBool(obj.hasRenewed);
    return obj;
}
