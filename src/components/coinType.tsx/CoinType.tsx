"use client";
import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Button from "../ui/button/Button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Coin = {
    id: string;
    symbol: string;
    name: string;
    image: string;       // logo URL
    current_price: number;
    market_cap_rank: number;
};

export default function CryptoInvestPage() {
    const [coins, setCoins] = useState<Coin[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchTopCoins() {
            try {
                const res = await fetch(
                    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
                );
                if (!res.ok) throw new Error("Failed fetching coins");
                const data: Coin[] = await res.json();
                setCoins(data);
            } catch (err) {
                // console.error(err);
                toast.error("Failed to load crypto data. Please reload page.");
            } finally {
                setLoading(false);
            }
        }
        fetchTopCoins();
    }, []);

    const handleInvest = (coin: Coin) => {
        router.push(`/investments/${coin.id}`); // ← pushes slug to URL
    };

    if (loading) {
        return <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-56 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800" />
            ))}
        </div>
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {coins.map((coin) => (
                <div key={coin.id} className="group flex flex-col justify-between border rounded-2xl p-5 shadow-sm bg-white dark:bg-white/[0.02] dark:border-white/[0.05] hover:shadow-md transition">
                    <div className="flex items-center space-x-4">
                        <img src={coin.image} alt={coin.name} className="w-10 h-10" />
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-primary transition">
                            {coin.name} ({coin.symbol.toUpperCase()})
                        </h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Price: ${coin.current_price.toLocaleString()}
                    </p>
                    <Button
                        variant="outline"
                        className="mt-5"
                        onClick={() => handleInvest(coin)}
                    >
                        Invest in {coin.name} <ArrowRight size={16} />
                    </Button>
                </div>
            ))}
        </div>
    );
}
