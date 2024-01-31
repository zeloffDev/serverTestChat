const mapPayload = {
  mapData: (data) => {
    const result = data.map((item) => {
      return {
        avatar: item.avatar,
        _id: item._id,
        name: item.name,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        listFriendRequest: item.listFriendRequest,
      };
    });
    return result;
  },
  mapObject: (obj) => {
    return {
      avatar: obj.avatar,
      _id: obj._id,
      name: obj.name,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt,
      listFriendRequest: obj.listFriendRequest,
    };
  },
};

module.exports = mapPayload;
