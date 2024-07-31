class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async get(id) {
        return this.model.findById(id);
    }

    async getAll(limit = 5, page = 1) {
        const skipCount = (page - 1) * limit;

        let query = this.model
                        .find({})
                        .skip(skipCount)
                        .limit(limit)
        const [elements, total] = await Promise.all([
            query.exec(),
            this.model.countDocuments(),
        ]);
        const paginationResult = {
            totalElements: total,
            hasNextPage: limit * page < total,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(total / limit),
        };
        return {
            elements,
            paginationResult,
        };
    }

    async create(entity, opts = undefined) {
        return this.model.create(entity, opts);
    }

    async update(id, entity, opts = undefined) {
        return this.model.findByIdAndUpdate(id, entity, {
            new: true,
            opts
        });
    }

    async delete(id) {
        const result = await this.model.findOneAndDelete({_id: id});
        if (!result) {
            throw new Error('Document not found');
        }
        return true;
    }

    async deleteMany(ids) {
        const result = await this.model.deleteMany({_id: {$in: ids}});
        if (result.deletedCount === 0) {
            throw new Error('No documents found to delete');
        }
        return true;
    }
}

module.exports = BaseRepository;
