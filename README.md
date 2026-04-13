# Portfolio Site

これまでの制作物をまとめたポートフォリオサイト

[Live Demo](https://Sh1n1230.github.io/Portfolio/)

## 概要
直感的でストレスのない操作性を目指し、シンプルなUIとアニメーションを組み合わせて実装。

## 技術スタック
- Framework: React
- Build Tool: Vite
- Styling: Vanilla CSS
- Animation: Anime.js
- Hosting: GitHub Pages

## 主な機能と実装の工夫
- **スクロール連動UI**: Intersection Observer APIを活用し、各セクションが可視領域に入った際にフェードインするラッパーコンポーネントを実装。
- **アクセシビリティ**: ハンバーガーメニュー展開時のオーバーレイなどユーザーの視点に立ったナビゲーションを構築。

## ローカルでの環境構築

```bash
git clone https://github.com/Sh1n1230/Portfolio.git
cd Portfolio
npm install
npm run dev
