function pathParser(str) {
  const regex = /(["'])(.*?)\1|(?<!\\)\S+/g;
  return [...str.matchAll(regex)].map((match) =>
    (match[2] || match[0]).replace(/\\ /g, " "),
  );
}

export default pathParser;
