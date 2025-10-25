export const paginate = (model) => async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const { filter } = req;
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;
    const totalDocuments = await model.countDocuments(filter);
    const totalPages = Math.ceil(totalDocuments / limitNumber);
    req.pagination = {
      limit: limitNumber,
      skip,
      totalPages,
      currentPage: pageNumber,
      totalDocuments,
    };
    next();
  } catch (error) {
    next(error);
  }
};
