
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crown, Star, Trophy, Users, Zap, Gift } from "lucide-react";

interface LoyaltyWallProps {
  userPoints: number;
}

const LoyaltyWall = ({ userPoints }: LoyaltyWallProps) => {
  const topCustomers = [
    {
      id: 1,
      name: 'CryptoKing.eth',
      avatar: '👑',
      points: 15420,
      tier: 'Diamond',
      nftCount: 247,
      badges: ['Early Adopter', 'Whale', 'Collector']
    },
    {
      id: 2,
      name: 'BigMacLover',
      avatar: '🍔',
      points: 12890,
      tier: 'Diamond',
      nftCount: 156,
      badges: ['Foodie', 'Regular', 'NFT Master']
    },
    {
      id: 3,
      name: 'FriesForLife',
      avatar: '🍟',
      points: 9560,
      tier: 'Gold',
      nftCount: 89,
      badges: ['Dedicated', 'Collector']
    },
    {
      id: 4,
      name: 'ShakeMaster',
      avatar: '🥤',
      points: 7234,
      tier: 'Gold',
      nftCount: 67,
      badges: ['Sweet Tooth', 'Regular']
    },
    {
      id: 5,
      name: 'McTokenHodler',
      avatar: '💎',
      points: 6891,
      tier: 'Gold',
      nftCount: 45,
      badges: ['Investor', 'Early Bird']
    },
    {
      id: 6,
      name: 'BurgerDAO',
      avatar: '🏛️',
      points: 5678,
      tier: 'Silver',
      nftCount: 34,
      badges: ['Community', 'DAO Member']
    }
  ];

  const membershipTiers = [
    { name: 'Bronze', min: 0, max: 499, color: 'bg-amber-600', icon: '🥉', perks: ['Basic NFTs', '1x Points'] },
    { name: 'Silver', min: 500, max: 999, color: 'bg-gray-400', icon: '🥈', perks: ['Rare NFTs', '1.5x Points', 'Early Access'] },
    { name: 'Gold', min: 1000, max: 4999, color: 'bg-yellow-500', icon: '👑', perks: ['Epic NFTs', '2x Points', 'Secret Menu', 'VIP Support'] },
    { name: 'Diamond', min: 5000, max: Infinity, color: 'bg-blue-500', icon: '💎', perks: ['Legendary NFTs', '3x Points', 'All Access', 'Personal Curator'] }
  ];

  const getUserTier = (points: number) => {
    return membershipTiers.find(tier => points >= tier.min && points <= tier.max) || membershipTiers[0];
  };

  const currentTier = getUserTier(userPoints);
  const nextTier = membershipTiers.find(tier => tier.min > userPoints);

  return (
    <div className="space-y-6">
      {/* User Status Card */}
      <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-700">
            <Trophy className="w-6 h-6" />
            Your NFT Loyalty Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 rounded-full ${currentTier.color} flex items-center justify-center text-white text-2xl shadow-lg`}>
              {currentTier.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{currentTier.name} Member</h3>
              <p className="text-gray-600">{userPoints.toLocaleString()} $McTokens</p>
              {nextTier && (
                <p className="text-sm text-gray-500">
                  {nextTier.min - userPoints} points to {nextTier.name}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {currentTier.perks.map((perk, index) => (
              <div key={index} className="flex items-center gap-2 bg-white p-2 rounded-lg">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">{perk}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <Users className="w-6 h-6" />
            NFT Loyalty Leaderboard
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              Top Members
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topCustomers.map((customer, index) => {
              const tier = getUserTier(customer.points);
              return (
                <div key={customer.id} className="flex items-center gap-4 p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
                  {/* Rank */}
                  <div className="text-2xl font-bold text-gray-400 w-8">
                    #{index + 1}
                  </div>

                  {/* Avatar */}
                  <div className={`w-12 h-12 rounded-full ${tier.color} flex items-center justify-center text-white text-xl shadow-lg`}>
                    {customer.avatar}
                  </div>

                  {/* Customer Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-gray-800">{customer.name}</h4>
                      <Badge className={`${tier.color} text-white text-xs`}>
                        {customer.tier}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      {customer.points.toLocaleString()} points • {customer.nftCount} NFTs
                    </div>
                    <div className="flex gap-1 mt-1">
                      {customer.badges.slice(0, 2).map((badge, badgeIndex) => (
                        <Badge key={badgeIndex} variant="outline" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                      {customer.badges.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{customer.badges.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Special Indicators */}
                  {index === 0 && <Crown className="w-6 h-6 text-yellow-500" />}
                  {index === 1 && <Trophy className="w-6 h-6 text-gray-400" />}
                  {index === 2 && <Trophy className="w-6 h-6 text-amber-600" />}
                </div>
              );
            })}
          </div>

          {/* Current User Position */}
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg border-2 border-blue-200">
            <div className="flex items-center gap-4">
              <div className="text-lg font-bold text-blue-600">#47</div>
              <div className={`w-10 h-10 rounded-full ${currentTier.color} flex items-center justify-center text-white text-lg`}>
                👤
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800">Your Position</h4>
                <div className="text-sm text-gray-600">
                  {userPoints.toLocaleString()} points • Keep going!
                </div>
              </div>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Zap className="w-4 h-4 mr-1" />
                Boost Points
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Membership Tiers */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-6 h-6" />
            Membership Tiers & Benefits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {membershipTiers.map((tier) => (
              <Card key={tier.name} className={`border-2 ${userPoints >= tier.min && userPoints <= tier.max ? 'border-yellow-400 shadow-lg' : 'border-gray-200'}`}>
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 rounded-full ${tier.color} flex items-center justify-center text-white text-xl mx-auto mb-3`}>
                    {tier.icon}
                  </div>
                  <h4 className="font-bold mb-2">{tier.name}</h4>
                  <div className="text-sm text-gray-600 mb-3">
                    {tier.min === 0 ? '0' : tier.min.toLocaleString()} - {tier.max === Infinity ? '∞' : tier.max.toLocaleString()} points
                  </div>
                  <div className="space-y-1">
                    {tier.perks.map((perk, index) => (
                      <div key={index} className="text-xs bg-gray-100 p-1 rounded">
                        {perk}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoyaltyWall;
