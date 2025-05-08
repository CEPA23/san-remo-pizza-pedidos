
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

interface Order {
  id: string;
  type: 'dine-in' | 'delivery';
  customer: string;
  items: number;
  total: number;
  status: 'pending' | 'preparing' | 'completed' | 'delivered';
  time: string;
}

export function OrdersPage() {
  const { toast } = useToast();

  // Mock data for orders
  const orders: Order[] = [
    {
      id: 'O001',
      type: 'dine-in',
      customer: 'Table 5',
      items: 3,
      total: 45.50,
      status: 'pending',
      time: '15:30'
    },
    {
      id: 'O002',
      type: 'delivery',
      customer: 'Maria Garcia',
      items: 2,
      total: 32.75,
      status: 'preparing',
      time: '15:45'
    },
    {
      id: 'O003',
      type: 'dine-in',
      customer: 'Table 2',
      items: 4,
      total: 68.20,
      status: 'completed',
      time: '16:00'
    },
    {
      id: 'O004',
      type: 'delivery',
      customer: 'Carlos Rodriguez',
      items: 1,
      total: 18.90,
      status: 'delivered',
      time: '16:15'
    },
    {
      id: 'O005',
      type: 'dine-in',
      customer: 'Table 8',
      items: 2,
      total: 27.50,
      status: 'pending',
      time: '16:30'
    },
    {
      id: 'O006',
      type: 'delivery',
      customer: 'Laura Martinez',
      items: 3,
      total: 42.30,
      status: 'preparing',
      time: '16:45'
    },
  ];

  const handleOrderClick = (id: string) => {
    toast({
      title: `Selected Order ${id}`,
      description: "Opening order details",
    });
    // In a real app, we would navigate to the order detail page
  };

  const getStatusBadge = (status: Order['status']) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      preparing: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      delivered: 'bg-purple-100 text-purple-800',
    };
    
    return <Badge className={styles[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  const getOrderTypeBadge = (type: Order['type']) => {
    return (
      <Badge variant="outline" className={type === 'dine-in' ? 'border-pizza-red text-pizza-red' : 'border-pizza-green text-pizza-green'}>
        {type === 'dine-in' ? 'Dine-in' : 'Delivery'}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        <div className="space-x-2">
          <Button variant="outline">Filter</Button>
          <Button>New Order</Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <CardDescription>View and manage all restaurant orders</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleOrderClick(order.id)}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{getOrderTypeBadge(order.type)}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{order.time}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
