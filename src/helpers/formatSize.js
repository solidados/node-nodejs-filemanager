const formatSize = (size) => {
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(size) / Math.log(1024));

  if (size === 0) return "0 bytes";
  return `${(size / Math.pow(1024, i)).toFixed(2) * 1} ${units[i]}`;
};

export default formatSize;
