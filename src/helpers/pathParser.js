const pathParser = (str) => {
  const formattedStr = str.replace(/%/g, " ");

  const regex = /(["'])(.*?)\1|(\S+)/g;
  const matches = [...formattedStr.matchAll(regex)].map((match) =>
    (match[2] || match[3] || "").replace(/\\ /g, " "),
  );

  if (matches.length === 0) return [];
  return [matches.join(" ")];
};

export default pathParser;
