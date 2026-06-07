// true → シャッター演出（工事中モード）、false → 通常表示
export const SHUTTER_MODE = true;

// SpotifyEmbedded API のベースURL（右上「再生中」ウィジェットの取得先）
//   ローカル開発: 'http://localhost:3000'（サーバー側 PORT 既定）
//   公開後:       'https://xxx.up.railway.app' などのデプロイURLに差し替え
//   '' （空文字）にするとウィジェット自体を無効化（非表示）にできる
// ※ サーバーが起動していない／到達できない場合はウィジェットを自動で隠す
export const SPOTIFY_API_BASE = 'https://spotify-embedded.onrender.com';
