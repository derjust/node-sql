'use strict';

var Harness = require('./support');
var post = Harness.definePostTable();
var user = Harness.defineUserTable();

Harness.test({
  query: post.select(post.star()).forUpdate(),
  pg: {
    text  : 'SELECT "post".* FROM "post" FOR UPDATE',
    string: 'SELECT "post".* FROM "post" FOR UPDATE'
  },
  mysql: {
    text  : 'SELECT `post`.* FROM `post` FOR UPDATE',
    string: 'SELECT `post`.* FROM `post` FOR UPDATE'
  },
  mssql: {
    text  : 'SELECT [post].* FROM [post] WITH (updlock)',
    string: 'SELECT [post].* FROM [post] WITH (updlock)'
  },
  params: []
});

Harness.test({
  query: post.select(post.star()).from(post.join(user).on(user.id.equals(post.userId))).where(post.content.equals('foo')).forUpdate(),
  pg: {
    text  : 'SELECT "post".* FROM "post" INNER JOIN "user" ON ("user"."id" = "post"."userId") WHERE ("post"."content" = $1) FOR UPDATE',
    string: 'SELECT "post".* FROM "post" INNER JOIN "user" ON ("user"."id" = "post"."userId") WHERE ("post"."content" = \'foo\') FOR UPDATE'
  },
  mysql: {
    text  : 'SELECT `post`.* FROM `post` INNER JOIN `user` ON (`user`.`id` = `post`.`userId`) WHERE (`post`.`content` = ?) FOR UPDATE',
    string: 'SELECT `post`.* FROM `post` INNER JOIN `user` ON (`user`.`id` = `post`.`userId`) WHERE (`post`.`content` = \'foo\') FOR UPDATE'
  },
  mssql: {
    text  : 'SELECT [post].* FROM [post] INNER JOIN [user] ON ([user].[id] = [post].[userId]) WITH (updlock) WHERE ([post].[content] = @param1)',
    string: 'SELECT [post].* FROM [post] INNER JOIN [user] ON ([user].[id] = [post].[userId]) WITH (updlock) WHERE ([post].[content] = \'foo\')'
  },
  params: ["foo"]
});
