const isGenerate = process.env.npm_lifecycle_script.startsWith(
  "gqless generate"
);

module.exports = {
  url: isGenerate ? "http://localhost:3001/graphql" : "/graphql",
  outputDir: "src/graphql"
};
