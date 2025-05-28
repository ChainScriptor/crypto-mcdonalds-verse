
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Coins, Eye } from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  cryptoPrice: string;
  nftId: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  description: string;
  image: string;
}

interface NFTMenuBoardProps {
  onOrderSelect: (order: MenuItem) => void;
}

const NFTMenuBoard = ({ onOrderSelect }: NFTMenuBoardProps) => {
  const [selectedCategory, setSelectedCategory] = useState('burgers');

  const menuItems: MenuItem[] = [
    {
      id: 'bigmac-nft',
      name: 'Big Mac NFT',
      price: 5.99,
      cryptoPrice: '0.003 ETH',
      nftId: '#1337',
      rarity: 'Legendary',
      description: 'Two all-beef patties, special sauce, lettuce, cheese, pickles, onions on a sesame seed bun. Comes with exclusive NFT artwork.',
      image: '🍔'
    },
    {
      id: 'mcchicken-nft',
      name: 'McChicken Deluxe NFT',
      price: 4.49,
      cryptoPrice: '0.002 ETH',
      nftId: '#2024',
      rarity: 'Epic',
      description: 'Crispy chicken breast with mayo and lettuce. Includes animated NFT collectible.',
      image: '🐔'
    },
    {
      id: 'mcfries-nft',
      name: 'Golden Fries NFT',
      price: 2.99,
      cryptoPrice: '0.001 ETH',
      nftId: '#5555',
      rarity: 'Rare',
      description: 'World-famous golden fries with rare holographic NFT.',
      image: '🍟'
    },
    {
      id: 'mcshake-nft',
      name: 'Cosmic Shake NFT',
      price: 3.49,
      cryptoPrice: '0.0015 ETH',
      nftId: '#9999',
      rarity: 'Epic',
      description: 'Vanilla shake with galaxy-themed NFT animation.',
      image: '🥤'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'bg-gray-500';
      case 'Rare': return 'bg-blue-500';
      case 'Epic': return 'bg-purple-500';
      case 'Legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="border-red-200 bg-gradient-to-br from-red-50 to-yellow-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-700">
          <Star className="w-6 h-6" />
          NFT Menu Board
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            Live Minting
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <Card key={item.id} className="relative overflow-hidden border-2 hover:border-yellow-400 transition-all duration-300 hover:shadow-lg group">
              <CardContent className="p-4">
                {/* NFT Rarity Badge */}
                <div className="absolute top-2 right-2">
                  <Badge className={`${getRarityColor(item.rarity)} text-white text-xs`}>
                    {item.rarity}
                  </Badge>
                </div>

                {/* Item Visual */}
                <div className="text-center mb-3">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {item.image}
                  </div>
                  <div className="text-xs text-gray-500">NFT {item.nftId}</div>
                </div>

                {/* Item Details */}
                <div className="space-y-2">
                  <h4 className="font-bold text-gray-800">{item.name}</h4>
                  <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
                  
                  {/* Pricing */}
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold text-green-600">${item.price}</div>
                      <div className="text-xs text-blue-600">{item.cryptoPrice}</div>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => onOrderSelect(item)}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Order + Mint
                    </Button>
                  </div>
                </div>

                {/* NFT Preview Indicator */}
                <div className="mt-3 flex items-center gap-2 text-xs text-purple-600">
                  <Eye className="w-3 h-3" />
                  <span>Preview NFT artwork</span>
                </div>

                {/* Blockchain verification */}
                <div className="absolute bottom-1 left-1 opacity-30">
                  <div className="text-xs text-gray-400">⛓️ Verified</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Live Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="bg-green-100 p-3 rounded-lg">
            <div className="text-sm font-bold text-green-800">1,247</div>
            <div className="text-xs text-green-600">NFTs Minted Today</div>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg">
            <div className="text-sm font-bold text-blue-800">0.15 ETH</div>
            <div className="text-xs text-blue-600">Floor Price</div>
          </div>
          <div className="bg-purple-100 p-3 rounded-lg">
            <div className="text-sm font-bold text-purple-800">89%</div>
            <div className="text-xs text-purple-600">Mint Rate</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NFTMenuBoard;
