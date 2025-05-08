
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/StatCard';
import { TableGrid } from '@/components/TableGrid';
import { DeliveryOrdersList } from '@/components/DeliveryOrdersList';
import { useToast } from '@/hooks/use-toast';
import { Table, ShoppingCart, MapPin } from 'lucide-react';

export function Dashboard() {
  const { toast } = useToast();

  const handleTableSelect = (id: number) => {
    toast({
      title: `Selected Table ${id}`,
      description: "Opening table details",
    });
    // In a real app, we would navigate to the table detail page
  };

  const handleOrderSelect = (id: string) => {
    toast({
      title: `Selected Order ${id}`,
      description: "Opening order details",
    });
    // In a real app, we would navigate to the order detail page
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard 
          title="Available Tables" 
          value="6" 
          icon={<Table className="h-4 w-4" />}
          description="Out of 12 tables" 
        />
        <StatCard 
          title="Active Orders" 
          value="8" 
          icon={<ShoppingCart className="h-4 w-4" />}
          description="3 dine-in, 5 delivery" 
        />
        <StatCard 
          title="Pending Deliveries" 
          value="3" 
          icon={<MapPin className="h-4 w-4" />}
          description="Est. delivery time: 30 min" 
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tables Overview</CardTitle>
            <CardDescription>Manage restaurant tables and dine-in orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] overflow-auto pr-2">
              <TableGrid onTableSelect={handleTableSelect} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delivery Orders</CardTitle>
            <CardDescription>Track and manage delivery orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] overflow-auto pr-2">
              <DeliveryOrdersList onOrderSelect={handleOrderSelect} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
