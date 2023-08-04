export interface UserData {
    email: string;
    password: string;
    name: string;
    mobile: string;
    permanentAddress: string;
    currentAddress: string;
    membershipFrom: string;
    NFAMembershipNumber: string;

    gender: string;
    employmentStatus: string;
    employmentType?: string;
    isNFA: string;
    isLifeMember?: string;
    hasRenewed?: string;
}

export type EditableUserData = Omit<UserData, 'email'>;
export type NewUserData = UserData & {
    code: string;
};
