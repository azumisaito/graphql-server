const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql")
// const { schema } = require("./schema");
const resolvers = require("./resolvers");


const dice = 3;
const sides = 6;

// スキーマ言語を使用して、スキーマを初期化する
const schema = buildSchema(`
  type Query {
    quoteOfTheDay: String,
    random: Float!,
    rollThreeDice: [Int],
    query RollDice($dice: Int!, $sides: Int) {
      rollDice(numDice: $dice, numSides: $sides): [Int]
    }
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
  },
  rollDice: ({numDice, numSides}) => {
    let output = [];
    for (let i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
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


const port = process.env.PORT || 4200;

app.listen(port);

console.log(`🚀 Server ready at http://localhost:4200/graphql`);
