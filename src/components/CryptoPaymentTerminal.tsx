
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Wallet, Zap, CheckCircle, Clock, TrendingUp, TrendingDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CryptoPaymentTerminalProps {
  order: any;
  walletConnected: boolean;
  onPaymentComplete: () => void;
}

const CryptoPaymentTerminal = ({ order, walletConnected, onPaymentComplete }: CryptoPaymentTerminalProps) => {
  const [paymentStatus, setPaymentStatus] = useState('idle');
  const [selectedCrypto, setSelectedCrypto] = useState('ETH');
  const [prices, setPrices] = useState({
    ETH: 2340.50,
    BTC: 67890.00,
    McToken: 3.47
  });
  const { toast } = useToast();

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => ({
        ETH: prev.ETH + (Math.random() - 0.5) * 10,
        BTC: prev.BTC + (Math.random() - 0.5) * 100,
        McToken: prev.McToken + (Math.random() - 0.5) * 0.1
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const cryptoOptions = [
    { symbol: 'ETH', name: 'Ethereum', icon: '⟠', color: 'bg-blue-500' },
    { symbol: 'BTC', name: 'Bitcoin', icon: '₿', color: 'bg-orange-500' },
    { symbol: 'McToken', name: 'McToken', icon: '🍟', color: 'bg-yellow-500' }
  ];

  const handlePayment = async () => {
    if (!walletConnected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to proceed with payment.",
        variant: "destructive",
      });
      return;
    }

    if (!order) {
      toast({
        title: "No Order Selected",
        description: "Please select an item from the menu first.",
        variant: "destructive",
      });
      return;
    }

    setPaymentStatus('processing');
    
    // Simulate blockchain transaction
    setTimeout(() => {
      setPaymentStatus('confirming');
      setTimeout(() => {
        setPaymentStatus('completed');
        onPaymentComplete();
        toast({
          title: "Payment Successful!",
          description: `Order paid with ${selectedCrypto}. NFT minted and sent to your wallet.`,
        });
      }, 2000);
    }, 3000);
  };

  const calculateCryptoAmount = () => {
    if (!order) return '0';
    const usdAmount = order.price;
    return (usdAmount / prices[selectedCrypto]).toFixed(6);
  };

  return (
    <Card className="border-green-200 bg-gradient-to-br from-green-50 to-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-700">
          <Wallet className="w-6 h-6" />
          Crypto Payment Terminal
          <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
            Live Prices
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Live Price Ticker */}
        <div className="bg-black text-green-400 p-3 rounded-lg font-mono text-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white">LIVE CRYPTO PRICES</span>
            <div className="flex gap-1">
              {[1,2,3].map(i => (
                <div key={i} className="w-1 h-1 bg-green-400 rounded-full animate-pulse" style={{animationDelay: `${i * 0.3}s`}} />
              ))}
            </div>
          </div>
          {cryptoOptions.map((crypto) => {
            const priceChange = Math.random() > 0.5 ? 1 : -1;
            const Icon = priceChange > 0 ? TrendingUp : TrendingDown;
            return (
              <div key={crypto.symbol} className="flex justify-between items-center">
                <span>{crypto.icon} {crypto.symbol}</span>
                <div className="flex items-center gap-2">
                  <span>${prices[crypto.symbol].toFixed(2)}</span>
                  <Icon className={`w-3 h-3 ${priceChange > 0 ? 'text-green-400' : 'text-red-400'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        {order && (
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-bold mb-2">Order Summary</h4>
            <div className="flex justify-between items-center">
              <span>{order.name}</span>
              <span className="font-bold">${order.price}</span>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              + NFT #{order.nftId} ({order.rarity})
            </div>
          </div>
        )}

        {/* Crypto Selection */}
        <div>
          <h4 className="font-semibold mb-3">Select Payment Method</h4>
          <div className="grid grid-cols-3 gap-2">
            {cryptoOptions.map((crypto) => (
              <Button
                key={crypto.symbol}
                variant={selectedCrypto === crypto.symbol ? "default" : "outline"}
                className={`p-3 ${selectedCrypto === crypto.symbol ? crypto.color + ' text-white' : ''}`}
                onClick={() => setSelectedCrypto(crypto.symbol)}
              >
                <div className="text-center">
                  <div className="text-lg">{crypto.icon}</div>
                  <div className="text-xs">{crypto.symbol}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Payment Amount */}
        {order && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span>Total Amount:</span>
              <div className="text-right">
                <div className="font-bold text-lg">{calculateCryptoAmount()} {selectedCrypto}</div>
                <div className="text-sm text-gray-600">${order.price} USD</div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Processing */}
        {paymentStatus !== 'idle' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              {paymentStatus === 'processing' && <Clock className="w-4 h-4 animate-spin" />}
              {paymentStatus === 'confirming' && <Zap className="w-4 h-4 text-yellow-500" />}
              {paymentStatus === 'completed' && <CheckCircle className="w-4 h-4 text-green-500" />}
              <span className="font-medium">
                {paymentStatus === 'processing' && 'Processing transaction...'}
                {paymentStatus === 'confirming' && 'Confirming on blockchain...'}
                {paymentStatus === 'completed' && 'Payment completed!'}
              </span>
            </div>
            <Progress 
              value={
                paymentStatus === 'processing' ? 30 : 
                paymentStatus === 'confirming' ? 70 : 100
              } 
              className="w-full"
            />
          </div>
        )}

        {/* Payment Button */}
        <Button 
          onClick={handlePayment}
          disabled={!walletConnected || !order || paymentStatus === 'processing' || paymentStatus === 'confirming'}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3"
        >
          <Wallet className="w-4 h-4 mr-2" />
          {paymentStatus === 'idle' ? 'Pay with Crypto + Mint NFT' : 
           paymentStatus === 'completed' ? 'Payment Complete!' : 'Processing...'}
        </Button>

        {/* Gas Fee Estimate */}
        <div className="text-xs text-gray-500 text-center">
          Estimated gas fee: 0.003 ETH (~$7.02) • Network: Ethereum Mainnet
        </div>
      </CardContent>
    </Card>
  );
};

export default CryptoPaymentTerminal;
