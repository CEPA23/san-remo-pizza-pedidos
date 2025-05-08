
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DeliveryOrdersList } from '@/components/DeliveryOrdersList';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

export function DeliveryPage() {
  const { toast } = useToast();

  const handleOrderSelect = (id: string) => {
    toast({
      title: `Selected Order ${id}`,
      description: "Opening order details",
    });
    // In a real app, we would navigate to the order detail page
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Delivery Orders</h2>
        <div className="space-x-2">
          <Button variant="outline">Filter</Button>
          <Button>New Order</Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Active Deliveries</CardTitle>
          <CardDescription>Track and manage delivery orders</CardDescription>
        </CardHeader>
        <CardContent>
          <DeliveryOrdersList onOrderSelect={handleOrderSelect} />
        </CardContent>
      </Card>
    </div>
  );
}
