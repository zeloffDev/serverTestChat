const payload = {
  createApiResponsePage: ({
    data = null,
    page = 1,
    pageSize = 1,
    totalPage = 1,
    totalRecord = 1,
    status = 200,
  }) => {
    return {
      data,
      page,
      pageSize,
      totalPage,
      totalRecord,
      status,
    };
  },
  createApiResponseSkipCountSuccess: ({
    data = null,
    message = "Success",
    status = 200,
    skip = 0,
    limit = 10,
  }) => {
    const next = data.length < limit;
    return {
      data,
      status,
      message,
      skip,
      limit,
      next: !next,
    };
  },
  createApiResponseSuccess: ({
    data = null,
    message = "Success",
    status = 200,
  }) => {
    return {
      data,
      status,
      message,
    };
  },
  createApiResponseError: ({
    data = null,
    message = "Error",
    status = 500,
  }) => {
    return {
      data,
      status,
      message,
    };
  },
  createResponseAuthenticate: ({ message = "Unauthorized", status = 401 }) => {
    return {
      message,
      status,
    };
  },
};

module.exports = payload;
