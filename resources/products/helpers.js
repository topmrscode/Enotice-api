exports.ERROR_FILE_IS_REQUIRED = "File is required";
exports.ERROR_TITLE_IS_REQUIRED = "Reference is required";
exports.ERROR_VIDEO_IS_REQUIRED = "Video id/url is required";
exports.splitVideoId = (videoId) => {
  return videoId.includes("https://") ? videoId.split("v=")[1] : videoId;
};
exports.splitFile = ({ host, files }) => {
  return `http://${host}/` + files.file.path.split("/")[1];
};
