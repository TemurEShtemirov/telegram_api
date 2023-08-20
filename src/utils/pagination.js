const paginate = (query, { page = 1, pageSize = 10 }) => {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    return {
        ...query,
        offset,
        limit,
    };
};

export default  paginate
