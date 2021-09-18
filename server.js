const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql")
// const { schema } = require("./schema");
const resolvers = require("./resolvers");

// スキーマ言語を使用して、スキーマを初期化する
const schema = buildSchema(`
  type Query {
    quoteOfTheDay: String,
    random: Float!,
    rollThreeDice: [Int]
  }
  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

// ルートは、APIエンドポイントごとにリゾルバー関数を提供します
const root = {
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },
  random: () => {
    return Math.random();
  },
  rollThreeDice: () => {
    return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
  }
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


const port = process.env.PORT || 4000;

app.listen(port);

console.log(`🚀 Server ready at http://localhost:4000/graphql`);
