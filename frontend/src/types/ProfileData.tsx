export interface UserData {
    email: string;
    password: string;
    name: string;
    mobile: string;
    permanentAddress: string;
    currentAddress: string;
    membershipFrom: string | null;
    NFAMembershipNumber: string | null;

    gender: string;
    employmentStatus: string;
    employmentType?: string | null;
    isNFA: string;
    isLifeMember?: string | null;
    hasRenewed?: string | null;

    joinedOn?: Date | null;
    expiresOn?: Date | null;
    membershipType?: string | null;
}

export type EditableUserData = Omit<UserData, 'email'> & { avatar: any };
export type NewUserData = UserData & {
    code: string;
};
