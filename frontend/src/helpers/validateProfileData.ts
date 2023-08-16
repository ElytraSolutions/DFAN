import Joi from 'joi';

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
export const UserProfileSchema = (States: string[], Countries: string[]) =>
    Joi.object({
        name: Joi.string()
            .required()
            .messages({
                ...requiredStringMessages,
            }),
        gender: Joi.any().optional(),
        mobile: Joi.any().optional(),
        permanentAddress: Joi.any().optional(),
        currentAddress: Joi.any().optional(),
        employmentStatus: Joi.any().optional(),
        employmentType: Joi.any().optional(),
        isNFA: Joi.any().optional(),
        NFAMembershipNumber: Joi.any().optional(),
        membershipFrom: Joi.any().optional(),
        isLifeMember: Joi.any().optional(),
        hasRenewed: Joi.any().optional(),
        avatar: Joi.any().optional(),
    });

export function sanitizer(obj: Record<string, any>) {
    if ('isLifeMember' in obj) obj.isLifeMember = toBool(obj.isLifeMember);
    if ('hasRenewed' in obj) obj.hasRenewed = toBool(obj.hasRenewed);
    delete obj.isNFA;
    return obj;
}
