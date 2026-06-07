import { useEffect, useState } from 'react';
import { SPOTIFY_API_BASE } from '../config';
import './NowPlaying.css';

// 再生中情報の再取得間隔（ミリ秒）
const POLL_MS = 30000;

/**
 * 右上に固定表示する「再生中」ウィジェット。
 * SpotifyEmbedded API (/api/now-playing) を定期取得し、
 * 再生中のときだけアルバム画像・曲名・アーティスト・ムード文を表示する。
 * URL未設定・サーバー未起動・停止中などデータが無いときは何も描画しない。
 */
export const NowPlaying = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!SPOTIFY_API_BASE) return;

        let active = true;
        const controller = new AbortController();

        const load = async () => {
            try {
                const res = await fetch(`${SPOTIFY_API_BASE}/api/now-playing`, {
                    signal: controller.signal,
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();
                if (active) setData(json);
            } catch {
                // サーバー未起動・到達不可・停止中など → 非表示
                if (active) setData(null);
            }
        };

        load();
        const id = setInterval(load, POLL_MS);

        return () => {
            active = false;
            controller.abort();
            clearInterval(id);
        };
    }, []);

    if (!data || !data.is_playing || !data.track) return null;

    const { track, mood } = data;

    return (
        <a
            className="now-playing"
            href={track.spotify_url}
            target="_blank"
            rel="noopener noreferrer"
            title={`${track.name} — ${track.artist}`}
        >
            <img className="np-art" src={track.album_art_url} alt={track.album} />

            <div className="np-info">
                <div className="np-head">
                    <span className="np-eq" aria-hidden="true"><i /><i /><i /></span>
                    <span className="np-label">Now Playing</span>
                </div>
                <div className="np-title">{track.name}</div>
                <div className="np-artist">{track.artist}</div>
                {mood?.text && <div className="np-mood">{mood.text}</div>}
            </div>
        </a>
    );
};
