
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Wallet, QrCode, Zap, Users, Star, Coins, Utensils, ShoppingCart, Eye, Camera, Gamepad2 } from "lucide-react";
import NFTMenuBoard from '../components/NFTMenuBoard';
import CryptoPaymentTerminal from '../components/CryptoPaymentTerminal';
import ARKiosk from '../components/ARKiosk';
import SecretMenu from '../components/SecretMenu';
import OrderTracker from '../components/OrderTracker';
import LoyaltyWall from '../components/LoyaltyWall';
import HeroCharacter from '../components/HeroCharacter';

const Index = () => {
  const [activeStation, setActiveStation] = useState('cashier');
  const [walletConnected, setWalletConnected] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [loyaltyPoints, setLoyaltyPoints] = useState(1250);

  const stations = [
    { id: 'cashier', name: 'Crypto Cashier', icon: Wallet },
    { id: 'kitchen', name: 'Digital Kitchen', icon: Utensils },
    { id: 'ar-kiosk', name: 'AR Experience', icon: Camera },
    { id: 'secret-menu', name: 'Secret Sauce Menu', icon: Eye },
    { id: 'loyalty', name: 'NFT Loyalty', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-green-50 relative overflow-hidden">
      {/* Ambient blockchain pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Main Restaurant Layout */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header with McDonald's Web3 Branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-6xl font-black text-yellow-400 drop-shadow-lg">
              McDonald's
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full">
              <Wallet className="w-5 h-5" />
              <span className="font-bold">Web3</span>
            </div>
          </div>
          <p className="text-gray-600 text-lg">The Future of Fast Food • Blockchain Powered</p>
          
          {/* Connection Status */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <Button 
              onClick={() => setWalletConnected(!walletConnected)}
              className={`${walletConnected ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
            >
              <Wallet className="w-4 h-4 mr-2" />
              {walletConnected ? 'Wallet Connected' : 'Connect Wallet'}
            </Button>
            <Badge variant="outline" className="text-sm">
              <Coins className="w-4 h-4 mr-1" />
              {loyaltyPoints} $McTokens
            </Badge>
          </div>
        </div>

        {/* Station Navigation */}
        <div className="mb-8">
          <Tabs value={activeStation} onValueChange={setActiveStation} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-red-100">
              {stations.map((station) => {
                const Icon = station.icon;
                return (
                  <TabsTrigger 
                    key={station.id} 
                    value={station.id}
                    className="flex items-center gap-2 data-[state=active]:bg-red-600 data-[state=active]:text-white"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{station.name}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* Cashier Station */}
            <TabsContent value="cashier" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <HeroCharacter station="cashier" />
                  <NFTMenuBoard onOrderSelect={setCurrentOrder} />
                </div>
                <div className="space-y-6">
                  <CryptoPaymentTerminal 
                    order={currentOrder}
                    walletConnected={walletConnected}
                    onPaymentComplete={() => setLoyaltyPoints(prev => prev + 50)}
                  />
                  <OrderTracker currentOrder={currentOrder} />
                </div>
              </div>
            </TabsContent>

            {/* Kitchen Station */}
            <TabsContent value="kitchen" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <HeroCharacter station="kitchen" />
                <div className="space-y-6">
                  <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center gap-2">
                        <Utensils className="w-5 h-5" />
                        Smart Kitchen Operations
                      </h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Big Mac Assembly</span>
                          <Progress value={75} className="w-24" />
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Fries Cooking</span>
                          <Progress value={90} className="w-24" />
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Shake Preparation</span>
                          <Progress value={45} className="w-24" />
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-green-100 rounded-lg">
                        <p className="text-sm text-green-800">
                          🔗 All recipes verified on-chain • Temperature sensors connected to IoT
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* AR Kiosk */}
            <TabsContent value="ar-kiosk" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <HeroCharacter station="ar-kiosk" />
                <ARKiosk />
              </div>
            </TabsContent>

            {/* Secret Menu */}
            <TabsContent value="secret-menu" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <HeroCharacter station="secret-menu" />
                <SecretMenu walletConnected={walletConnected} loyaltyPoints={loyaltyPoints} />
              </div>
            </TabsContent>

            {/* Loyalty Wall */}
            <TabsContent value="loyalty" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <HeroCharacter station="loyalty" />
                <LoyaltyWall userPoints={loyaltyPoints} />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Live Restaurant Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">247</div>
              <div className="text-sm opacity-90">Orders Today</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">1,892</div>
              <div className="text-sm opacity-90">NFTs Minted</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">$3.47</div>
              <div className="text-sm opacity-90">$McToken Price</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">94%</div>
              <div className="text-sm opacity-90">Customer Satisfaction</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Floating UI Elements */}
      <div className="fixed bottom-4 right-4 space-y-2">
        <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
          <QrCode className="w-4 h-4 mr-2" />
          Scan Menu
        </Button>
        <Button size="sm" className="bg-green-600 hover:bg-green-700">
          <Zap className="w-4 h-4 mr-2" />
          Quick Order
        </Button>
      </div>
    </div>
  );
};

export default Index;
