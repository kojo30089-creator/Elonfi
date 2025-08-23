"use client";

import { useEffect, useRef } from "react";

export default function TradingViewTicker() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Clear previous widget
        containerRef.current.innerHTML = "";

        const script = document.createElement("script");
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
        script.async = true;
        script.innerHTML = JSON.stringify({
            symbols: [
                { proName: "BINANCE:BTCUSDT", title: "Bitcoin" },
                { proName: "BINANCE:ETHUSDT", title: "Ethereum" },
                { proName: "BINANCE:SOLUSDT", title: "Solana" },
                { proName: "BINANCE:XRPUSDT", title: "XRP" },
                { proName: "BINANCE:ADAUSDT", title: "Cardano" },
                { proName: "BINANCE:AVAXUSDT", title: "Avalanche" },
                { proName: "BINANCE:LINKUSDT", title: "Chainlink" },
                { proName: "BINANCE:MATICUSDT", title: "Polygon" },
                { proName: "BINANCE:DOTUSDT", title: "Polkadot" },
                { proName: "BINANCE:TONUSDT", title: "Toncoin" },
                { proName: "BINANCE:PEPEUSDT", title: "Pepe" },
                { proName: "BINANCE:SHIBUSDT", title: "Shiba Inu" },
                { proName: "BINANCE:DOGEUSDT", title: "Dogecoin" },
                { proName: "BINANCE:INJUSDT", title: "Injective" },
                { proName: "BINANCE:NEARUSDT", title: "Near" },
            ],
            showSymbolLogo: true,
            colorTheme: "dark", // ← use automatic theme
            isTransparent: false,
            displayMode: "adaptive", // better for responsive
            locale: "en",
        });

        containerRef.current.appendChild(script);
    }, []);

    return (
        <div className="tradingview-widget-container w-full border-0">
            <div
                className="tradingview-widget-container__widget"
                ref={containerRef}
            ></div>
        </div>
    );
}
