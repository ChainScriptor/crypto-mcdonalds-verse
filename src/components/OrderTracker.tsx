
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, CheckCircle, Truck, Package, Utensils } from "lucide-react";

interface OrderTrackerProps {
  currentOrder: any;
}

const OrderTracker = ({ currentOrder }: OrderTrackerProps) => {
  const [orderProgress, setOrderProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const orderSteps = [
    { icon: Package, label: 'Order Received', description: 'Smart contract executed', time: '0:00' },
    { icon: Utensils, label: 'Preparing', description: 'Kitchen has started', time: '2:30' },
    { icon: Clock, label: 'Quality Check', description: 'Blockchain verification', time: '5:00' },
    { icon: CheckCircle, label: 'Ready', description: 'Order complete', time: '7:00' },
  ];

  useEffect(() => {
    if (currentOrder) {
      const interval = setInterval(() => {
        setOrderProgress(prev => {
          const newProgress = prev + 2;
          const newStep = Math.floor(newProgress / 25);
          setCurrentStep(Math.min(newStep, orderSteps.length - 1));
          
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [currentOrder]);

  if (!currentOrder) {
    return (
      <Card className="border-gray-200 bg-gray-50">
        <CardContent className="p-6 text-center">
          <Clock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Active Orders</h3>
          <p className="text-gray-500">Select an item from the menu to start tracking your order</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-700">
          <Package className="w-6 h-6" />
          Smart Contract Order Tracking
          <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            Live Updates
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Order Summary */}
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold">{currentOrder.name}</h4>
            <Badge className="bg-green-600 text-white">
              Order #{currentOrder.nftId}
            </Badge>
          </div>
          <div className="text-sm text-gray-600">
            NFT {currentOrder.nftId} • {currentOrder.rarity} Rarity
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Order Progress</span>
            <span>{Math.round(orderProgress)}%</span>
          </div>
          <Progress value={orderProgress} className="h-3" />
          <div className="text-xs text-gray-500 text-center">
            Estimated completion: {7 - Math.round((orderProgress / 100) * 7)} minutes remaining
          </div>
        </div>

        {/* Step Tracker */}
        <div className="space-y-4">
          {orderSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const isPending = index > currentStep;

            return (
              <div key={index} className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted ? 'bg-green-500 border-green-500 text-white' :
                  isActive ? 'bg-blue-500 border-blue-500 text-white animate-pulse' :
                  'bg-gray-200 border-gray-300 text-gray-500'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className={`font-semibold ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                      {step.label}
                    </h4>
                    {isCompleted && <CheckCircle className="w-4 h-4 text-green-500" />}
                    {isActive && <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />}
                  </div>
                  <p className="text-sm text-gray-600">{step.description}</p>
                  <div className="text-xs text-gray-400">
                    {isCompleted ? '✓ Completed' : isActive ? 'In Progress...' : `ETA: ${step.time}`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Blockchain Details */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <span>⛓️</span>
            Blockchain Transaction Details
          </h4>
          <div className="space-y-1 text-sm text-gray-600">
            <div>Transaction Hash: 0x1a2b3c4d5e6f...</div>
            <div>Block Height: #19,847,392</div>
            <div>Gas Used: 21,000 gwei</div>
            <div>Status: {orderProgress === 100 ? 'Confirmed' : 'Pending'}</div>
          </div>
        </div>

        {/* NFT Minting Status */}
        <div className="bg-purple-100 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🎨</span>
            <span className="font-semibold text-purple-800">NFT Minting Progress</span>
          </div>
          <div className="text-sm text-purple-700">
            {orderProgress < 50 ? 'Preparing metadata...' :
             orderProgress < 75 ? 'Generating artwork...' :
             orderProgress < 100 ? 'Minting to blockchain...' :
             'NFT minted successfully! Check your wallet.'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTracker;
