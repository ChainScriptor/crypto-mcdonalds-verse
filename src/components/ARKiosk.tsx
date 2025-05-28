
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, QrCode, Eye, RotateCcw, Maximize, Share2, Coins } from "lucide-react";

const ARKiosk = () => {
  const [activeExperience, setActiveExperience] = useState('bigmac');
  const [isScanning, setIsScanning] = useState(false);

  const experiences = [
    {
      id: 'bigmac',
      name: 'Big Mac 3D',
      description: 'Layer-by-layer assembly visualization',
      icon: '🍔',
      layers: ['Bottom Bun', 'Beef Patty', 'Special Sauce', 'Lettuce', 'Cheese', 'Middle Bun', 'Beef Patty', 'Onions', 'Pickles', 'Top Bun']
    },
    {
      id: 'fries',
      name: 'Golden Fries Process',
      description: 'From potato to perfection',
      icon: '🍟',
      layers: ['Fresh Potato', 'Cutting', 'Blanching', 'Freezing', 'Frying', 'Seasoning']
    },
    {
      id: 'shake',
      name: 'Shake Creation',
      description: 'Swirling vanilla perfection',
      icon: '🥤',
      layers: ['Ice Cream Base', 'Milk Addition', 'Blending', 'Flavor Mixing', 'Whipped Topping']
    }
  ];

  const currentExperience = experiences.find(exp => exp.id === activeExperience);

  const handleScanQR = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 2000);
  };

  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-700">
          <Camera className="w-6 h-6" />
          AR Visualization Kiosk
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            3D Interactive
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* QR Scanner Interface */}
        <div className="bg-black p-6 rounded-lg text-center relative overflow-hidden">
          <div className="text-white mb-4">
            <QrCode className="w-12 h-12 mx-auto mb-2" />
            <h3 className="text-lg font-bold">Scan to Experience AR</h3>
            <p className="text-sm opacity-75">Point your device at the QR code below</p>
          </div>
          
          {/* QR Code Visualization */}
          <div className="bg-white p-4 rounded-lg inline-block">
            <div className="w-32 h-32 bg-black relative">
              {/* Simulated QR Code Pattern */}
              <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-px">
                {Array.from({length: 64}).map((_, i) => (
                  <div 
                    key={i} 
                    className={`${Math.random() > 0.5 ? 'bg-black' : 'bg-white'} transition-colors duration-1000`} 
                  />
                ))}
              </div>
            </div>
          </div>

          <Button 
            onClick={handleScanQR}
            className="mt-4 bg-purple-600 hover:bg-purple-700"
            disabled={isScanning}
          >
            {isScanning ? 'Scanning...' : 'Simulate AR Experience'}
          </Button>

          {/* Scanning Effect */}
          {isScanning && (
            <div className="absolute inset-0 bg-purple-600 bg-opacity-50 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p>Loading AR Experience...</p>
              </div>
            </div>
          )}
        </div>

        {/* Hero Character Figure - Extra Large */}
        <div className="text-center py-12 bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl">
          <img 
            src="/lovable-uploads/b110fda6-f471-4a32-8038-a28c9b61a674.png" 
            alt="McDonald's Web3 Hero" 
            className="w-80 h-96 mx-auto object-contain mb-6"
            style={{
              filter: 'drop-shadow(6px 12px 20px rgba(0, 0, 0, 0.4))'
            }}
          />
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-gray-800">Your Web3 McDonald's Hero Guide</h3>
            <div className="flex items-center justify-center gap-3">
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-lg px-4 py-2">
                <Coins className="w-5 h-5 mr-2" />
                Powered by $SUINION
              </Badge>
            </div>
            <p className="text-gray-600 text-lg">Ready to guide you through the AR experience</p>
          </div>
        </div>

        {/* Experience Selection */}
        <div>
          <h4 className="font-semibold mb-3">Choose Your AR Experience</h4>
          <div className="grid grid-cols-3 gap-2">
            {experiences.map((exp) => (
              <Button
                key={exp.id}
                variant={activeExperience === exp.id ? "default" : "outline"}
                className={`p-3 h-auto ${activeExperience === exp.id ? 'bg-purple-600 text-white' : ''}`}
                onClick={() => setActiveExperience(exp.id)}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">{exp.icon}</div>
                  <div className="text-xs font-semibold">{exp.name}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* 3D Visualization Preview */}
        {currentExperience && (
          <div className="bg-gradient-to-br from-blue-900 to-purple-900 p-6 rounded-lg text-white">
            <div className="text-center mb-4">
              <div className="text-6xl mb-2 animate-bounce">{currentExperience.icon}</div>
              <h3 className="text-xl font-bold">{currentExperience.name}</h3>
              <p className="text-sm opacity-75">{currentExperience.description}</p>
            </div>

            {/* Layer Breakdown */}
            <div className="space-y-2">
              <h4 className="font-semibold">3D Layer Breakdown:</h4>
              {currentExperience.layers.map((layer, index) => (
                <div key={index} className="flex items-center gap-3 bg-white bg-opacity-10 p-2 rounded">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                    {index + 1}
                  </div>
                  <span className="text-sm">{layer}</span>
                </div>
              ))}
            </div>

            {/* AR Controls */}
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline" className="flex-1 text-black">
                <RotateCcw className="w-4 h-4 mr-1" />
                Rotate
              </Button>
              <Button size="sm" variant="outline" className="flex-1 text-black">
                <Maximize className="w-4 h-4 mr-1" />
                Zoom
              </Button>
              <Button size="sm" variant="outline" className="flex-1 text-black">
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        )}

        {/* Blockchain Integration Info */}
        <div className="bg-green-100 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-800">On-Chain Recipe Verification</span>
          </div>
          <p className="text-sm text-green-700">
            All recipes and ingredients are verified on the blockchain. Scan the QR code to view the complete supply chain and preparation process in augmented reality.
          </p>
          <div className="mt-2 text-xs text-green-600">
            ⛓️ Recipe Hash: 0x1a2b3c4d... • Verified ✓
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ARKiosk;
