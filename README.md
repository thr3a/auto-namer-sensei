# 利用方法

```
npx create-next-app hogehoge --use-npm --example https://github.com/thr3a/nextjs-template
```

# アップデート

```
npx npm-check-updates -u
```

# ts直接実行する

```
node --loader ts-node/esm src/scripts/sample.ts
```

# GitHub Pages

### https://thr3a.github.io/の場合

https://thr3a.github.io/<レポジトリ名>


next.config.mjsより

```ts
const nextConfig = {
  basePath: process.env.GITHUB_ACTIONS && '/レポジトリ名',
  trailingSlash: true,
  // assetPrefix: '/レポジトリ名',
};
```

### 独自ドメインの場合

.github/workflows/build.ymlより「cname」をコメントアウト外す

# TODO

- データベース？
- デプロイ簡単にする
- フォーム周りのサンプル
