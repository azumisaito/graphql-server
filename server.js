const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql")
// const { schema } = require("./schema");
const resolvers = require("./resolvers");

// スキーマ言語を使用して、スキーマを初期化する
const schema = buildSchema(`
  type Query {
    hello: String
  }
  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

// ルートは、APIエンドポイントごとにリゾルバー関数を提供します
const root = {
  hello: () => {
    return 'Hello world!';
  },
};

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root, // execute()関数に渡す値
    // rootValue: resolvers,
    graphiql: true
  })
);


const port = process.env.PORT || 4200;

app.listen(port);

console.log(`🚀 Server ready at http://localhost:4200/graphql`);
