// Most of the times, table data needs some manipulation before presented
// UserRecord is used as a presentation layer for the records in Users Table
// By Using UserRecord, we not only keep our template clean from business logic but also
// used an abstraction for all such manipulations under one file.

class UserRecord {
    constructor(user) {
        this.gender = user.gender.capitalize();
        this.active = user.status === 'active' ? 'Yes' : 'No'

        Object.assign(this, user.exclude([
            'gender',
        ]));
    }
}

export default UserRecord;
