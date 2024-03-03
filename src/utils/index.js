const extractPublicIdFromUrl = (url) => {
  const parts = url.split("/");
  const publicIdWithExtension = parts[parts.length - 1]; // Get the last part which contains public_id with extension
  const publicId = publicIdWithExtension.split(".")[0]; // Remove the file extension
  return publicId;
};

module.exports = {
  extractPublicIdFromUrl,
};
