
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Unlock, Crown, Star, Eye, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SecretMenuProps {
  walletConnected: boolean;
  loyaltyPoints: number;
}

const SecretMenu = ({ walletConnected, loyaltyPoints }: SecretMenuProps) => {
  const [unlockedItems, setUnlockedItems] = useState<string[]>([]);
  const { toast } = useToast();

  const secretItems = [
    {
      id: 'mcgold',
      name: 'McRoyale Gold',
      description: 'Premium wagyu beef with truffle sauce and gold leaf',
      price: 49.99,
      cryptoPrice: '0.02 ETH',
      requirement: 1000,
      tier: 'Gold',
      icon: '👑',
      rarity: 'Legendary',
      available: true
    },
    {
      id: 'secret-sauce',
      name: 'Secret Sauce Burger',
      description: 'The original recipe from 1955, never before available',
      price: 24.99,
      cryptoPrice: '0.01 ETH',
      requirement: 500,
      tier: 'Silver',
      icon: '🤫',
      rarity: 'Epic',
      available: true
    },
    {
      id: 'diamond-fries',
      name: 'Diamond Dust Fries',
      description: 'Fries coated in edible diamond dust and premium seasoning',
      price: 99.99,
      cryptoPrice: '0.05 ETH',
      requirement: 5000,
      tier: 'Diamond',
      icon: '💎',
      rarity: 'Mythic',
      available: loyaltyPoints >= 5000
    },
    {
      id: 'founders-shake',
      name: 'Founders Edition Shake',
      description: 'Limited edition shake with rare vanilla and NFT collection',
      price: 19.99,
      cryptoPrice: '0.008 ETH',
      requirement: 250,
      tier: 'Bronze',
      icon: '🥤',
      rarity: 'Rare',
      available: true
    }
  ];

  const handleUnlock = (itemId: string, requirement: number) => {
    if (!walletConnected) {
      toast({
        title: "Wallet Required",
        description: "Connect your wallet to access the secret menu.",
        variant: "destructive",
      });
      return;
    }

    if (loyaltyPoints < requirement) {
      toast({
        title: "Insufficient Points",
        description: `You need ${requirement} $McTokens to unlock this item. You have ${loyaltyPoints}.`,
        variant: "destructive",
      });
      return;
    }

    setUnlockedItems(prev => [...prev, itemId]);
    toast({
      title: "Item Unlocked!",
      description: "Secret menu item is now available for order.",
    });
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Bronze': return 'bg-amber-600';
      case 'Silver': return 'bg-gray-400';
      case 'Gold': return 'bg-yellow-500';
      case 'Diamond': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Rare': return 'border-blue-400';
      case 'Epic': return 'border-purple-400';
      case 'Legendary': return 'border-yellow-400';
      case 'Mythic': return 'border-pink-400';
      default: return 'border-gray-400';
    }
  };

  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-gray-900 text-white">
      <CardHeader className="bg-gradient-to-r from-purple-800 to-black">
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-6 h-6" />
          Secret Sauce Menu
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black">
            Token Gated
          </Badge>
        </CardTitle>
        <p className="text-purple-200 text-sm">
          Exclusive items for premium members only. Unlock with $McTokens.
        </p>
      </CardHeader>
      <CardContent className="p-6 bg-gradient-to-br from-gray-900 to-black">
        {/* Member Status */}
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold flex items-center gap-2">
                <Crown className="w-5 h-5" />
                Member Status
              </h3>
              <p className="text-sm opacity-90">Current Points: {loyaltyPoints} $McTokens</p>
            </div>
            <div className="text-right">
              <div className="text-2xl">
                {loyaltyPoints >= 5000 ? '💎' : loyaltyPoints >= 1000 ? '👑' : loyaltyPoints >= 500 ? '🥈' : '🥉'}
              </div>
              <div className="text-xs">
                {loyaltyPoints >= 5000 ? 'Diamond' : loyaltyPoints >= 1000 ? 'Gold' : loyaltyPoints >= 500 ? 'Silver' : 'Bronze'}
              </div>
            </div>
          </div>
        </div>

        {/* Secret Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {secretItems.map((item) => {
            const isUnlocked = unlockedItems.includes(item.id) || loyaltyPoints >= item.requirement;
            const canAfford = loyaltyPoints >= item.requirement;
            
            return (
              <Card 
                key={item.id} 
                className={`bg-gradient-to-br from-gray-800 to-gray-900 border-2 ${getRarityColor(item.rarity)} ${!item.available ? 'opacity-50' : ''} transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20`}
              >
                <CardContent className="p-4">
                  {/* Tier Badge */}
                  <div className="flex justify-between items-start mb-3">
                    <Badge className={`${getTierColor(item.tier)} text-white text-xs`}>
                      {item.tier} Tier
                    </Badge>
                    <div className="text-2xl">{item.icon}</div>
                  </div>

                  {/* Item Info */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-white flex items-center gap-2">
                      {!isUnlocked && <Lock className="w-4 h-4" />}
                      {isUnlocked && <Unlock className="w-4 h-4 text-green-400" />}
                      {item.name}
                    </h4>
                    
                    <p className={`text-sm ${isUnlocked ? 'text-gray-300' : 'text-gray-500 blur-sm'}`}>
                      {item.description}
                    </p>

                    {/* Pricing */}
                    <div className={`${isUnlocked ? '' : 'blur-sm'}`}>
                      <div className="font-bold text-green-400">${item.price}</div>
                      <div className="text-xs text-blue-400">{item.cryptoPrice}</div>
                    </div>

                    {/* Unlock Requirements */}
                    <div className="text-xs text-gray-400">
                      Requires: {item.requirement} $McTokens
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      {!isUnlocked ? (
                        <Button 
                          onClick={() => handleUnlock(item.id, item.requirement)}
                          disabled={!canAfford || !walletConnected || !item.available}
                          size="sm"
                          className="w-full bg-purple-600 hover:bg-purple-700"
                        >
                          <Lock className="w-3 h-3 mr-1" />
                          {!walletConnected ? 'Connect Wallet' : 
                           !canAfford ? 'Insufficient Points' : 
                           !item.available ? 'Coming Soon' : 'Unlock Item'}
                        </Button>
                      ) : (
                        <Button 
                          size="sm"
                          className="w-full bg-green-600 hover:bg-green-700"
                        >
                          <Wallet className="w-3 h-3 mr-1" />
                          Order Now
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Rarity Indicator */}
                  <div className="mt-3 text-center">
                    <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                      <Star className="w-3 h-3 mr-1" />
                      {item.rarity}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Unlock Progress */}
        <div className="mt-6 bg-gray-800 p-4 rounded-lg">
          <h4 className="font-semibold mb-3 text-white">Next Unlock Progress</h4>
          <div className="space-y-2">
            {[250, 500, 1000, 5000].map((milestone) => {
              const progress = Math.min((loyaltyPoints / milestone) * 100, 100);
              const isAchieved = loyaltyPoints >= milestone;
              
              return (
                <div key={milestone} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full ${isAchieved ? 'bg-green-500' : 'bg-gray-600'} flex items-center justify-center text-xs font-bold`}>
                    {isAchieved ? '✓' : milestone === 5000 ? '💎' : milestone === 1000 ? '👑' : milestone === 500 ? '🥈' : '🥉'}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">{milestone} Points</span>
                      <span className="text-gray-400">{Math.min(loyaltyPoints, milestone)}/{milestone}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${isAchieved ? 'bg-green-500' : 'bg-purple-500'}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecretMenu;
