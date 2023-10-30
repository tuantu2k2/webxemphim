const { ObjectId } = require("mongodb");

class userInfor {
    constructor(client) {
        this.Contact = client.db().collection("Film_comments");
    };

    extractConactData(payload) {
        const contact = {
            slug:payload.slug,
            name: payload.name,
            content:payload.content
        };

        Object.keys(contact).forEach(
            (key) => contact[key] === undefined && delete contact[key]
        );
        return contact;
    }
    async create(payload) {
        const contact = this.extractConactData(payload);
        const result = await this.Contact.insertOne(
            contact,
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Contact.find(filter);
        return await cursor.toArray();

    }

    async findByName(name) {
        return await this.find({
            name: name,
        });
    }

    async findCommentBySlug(slug){
        return await this.find({
            slug:slug
        })
    }

    async findById(id) {
        return await this.Contact.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractConactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Contact.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async findFavorite() {
        return await this.find({ favorite: true });
    }

    async deleteAll() {
        const result = await this.Contact.deleteMany({});
        return result.deletedCount;
        }


}


module.exports = userInfor;