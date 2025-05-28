import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Wallet, Utensils, Camera, Eye, Star } from "lucide-react";

interface HeroCharacterProps {
  station: string;
}

const HeroCharacter = ({ station }: HeroCharacterProps) => {
  const getStationData = (station: string) => {
    switch (station) {
      case 'cashier':
        return {
          title: 'Taking Your Crypto Order',
          description: 'Processing payments via smart contracts',
          action: 'Accepting $ETH, $BTC, $McTokens',
          icon: Wallet,
          gradient: 'from-blue-500 to-purple-600'
        };
      case 'kitchen':
        return {
          title: 'Preparing Your Meal',
          description: 'Using blockchain-verified recipes',
          action: 'Temperature monitored on-chain',
          icon: Utensils,
          gradient: 'from-orange-500 to-red-600'
        };
      case 'ar-kiosk':
        return {
          title: 'AR Experience Guide',
          description: 'Showcasing 3D burger visualization',
          action: 'Scan QR for immersive preview',
          icon: Camera,
          gradient: 'from-green-500 to-teal-600'
        };
      case 'secret-menu':
        return {
          title: 'Secret Menu Curator',
          description: 'Token-gated exclusive items',
          action: 'Premium members only',
          icon: Eye,
          gradient: 'from-purple-500 to-pink-600'
        };
      case 'loyalty':
        return {
          title: 'NFT Loyalty Manager',
          description: 'Managing your membership tier',
          action: 'Upgrading customer status',
          icon: Star,
          gradient: 'from-yellow-500 to-orange-600'
        };
      default:
        return {
          title: 'McDonald\'s Web3 Hero',
          description: 'Ready to serve',
          action: 'How can I help you today?',
          icon: User,
          gradient: 'from-red-500 to-yellow-600'
        };
    }
  };

  const stationData = getStationData(station);
  const Icon = stationData.icon;

  return (
    <Card className="relative overflow-hidden border-2 border-yellow-300 bg-gradient-to-br from-red-50 to-yellow-50">
      <CardContent className="p-6">
        {/* Hero Character Visualization */}
        <div className="flex items-center space-x-4 mb-4">
          {/* Real Hero Character Image */}
          <div className="relative">
            <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${stationData.gradient} flex items-center justify-center text-white shadow-lg`}>
              <Icon className="w-8 h-8" />
            </div>
            {/* Hero Character PNG Image */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <img 
                src="/placeholder.svg" 
                alt="McDonald's Web3 Hero" 
                className="w-16 h-20 object-contain"
                style={{
                  filter: 'drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.3))'
                }}
              />
            </div>
          </div>
          <div className="flex-1 mt-8">
            <h3 className="text-xl font-bold text-gray-800">{stationData.title}</h3>
            <p className="text-gray-600">{stationData.description}</p>
          </div>
        </div>

        {/* McDonald's Uniform Details */}
        <div className="bg-red-600 text-white p-4 rounded-lg mb-4 mt-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-black">McDonald's</div>
              <div className="text-sm opacity-90">Web3 Team Member</div>
            </div>
            <Badge className="bg-yellow-500 text-black hover:bg-yellow-600">
              Staff ID: W3-2024
            </Badge>
          </div>
        </div>

        {/* Current Action */}
        <div className="bg-gray-100 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">{stationData.action}</span>
          </div>
        </div>

        {/* Subtle blockchain elements */}
        <div className="absolute top-2 right-2 opacity-20">
          <div className="text-xs text-gray-500">⛓️ On-Chain</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroCharacter;
