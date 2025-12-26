export const paginate = (model) => async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const { filter } = req;
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;
    const totalDocuments = await model.countDocuments(typeof filter ==="object"&&filter);
    const totalPages = Math.ceil(totalDocuments / limitNumber);
    req.pagination = {
      limit: limitNumber,
      skip,
      totalPages,
      currentPage: pageNumber,
      nextPage: pageNumber + 1 > totalPages ? 1 : pageNumber + 1,
      previousPage: pageNumber - 1 < 1 ? totalPages : pageNumber - 1,
      totalDocuments,
    };
    next();
  } catch (error) {
    next(error);
  }
};
