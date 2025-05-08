
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Plus, Trash2 } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export function TableDetailPage() {
  const { id } = useParams();
  const { toast } = useToast();
  const [status, setStatus] = useState<'available' | 'occupied' | 'reserved'>('occupied');
  const [customers, setCustomers] = useState(4);

  // Estado para los productos en el pedido
  const [orderItems, setOrderItems] = useState<MenuItem[]>([
    { id: 1, name: 'Pizza Margarita', category: 'Pizzas', price: 12.90, quantity: 1 },
    { id: 2, name: 'Pizza Pepperoni', category: 'Pizzas', price: 14.50, quantity: 2 },
    { id: 3, name: 'Agua Mineral', category: 'Bebidas', price: 2.50, quantity: 3 },
  ]);

  const handleAddItem = () => {
    toast({
      title: "Añadir Producto",
      description: "Abriendo catálogo de productos",
    });
  };

  const handleRemoveItem = (itemId: number) => {
    setOrderItems(orderItems.filter(item => item.id !== itemId));
    toast({
      title: "Producto Eliminado",
      description: "El producto ha sido eliminado del pedido",
    });
  };

  const handleChangeQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      setOrderItems(orderItems.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const handleCompleteOrder = () => {
    toast({
      title: "Pedido Completado",
      description: "El pedido ha sido enviado a cocina",
    });
  };

  const handleCancelOrder = () => {
    toast({
      title: "Pedido Cancelado",
      description: "El pedido ha sido cancelado",
    });
  };

  const getStatusBadge = () => {
    const styles = {
      available: 'bg-green-100 text-green-800',
      occupied: 'bg-red-100 text-red-800',
      reserved: 'bg-yellow-100 text-yellow-800',
    };
    
    const labels = {
      available: 'Disponible',
      occupied: 'Ocupada',
      reserved: 'Reservada',
    };
    
    return <Badge className={styles[status]}>{labels[status]}</Badge>;
  };

  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Mesa {id}</h2>
        <div className="flex items-center space-x-4">
          {getStatusBadge()}
          <span className="text-sm text-gray-500">{customers} comensales</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Pedido Actual</CardTitle>
                <CardDescription>Productos ordenados en esta mesa</CardDescription>
              </div>
              <Button onClick={handleAddItem} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Añadir Producto
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Precio Unitario</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.category}</p>
                        </div>
                      </TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7 w-7 p-0"
                            onClick={() => handleChangeQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span>{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7 w-7 p-0"
                            onClick={() => handleChangeQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {orderItems.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        No hay productos en este pedido
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-lg">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="pt-4 space-y-2">
                  <Button className="w-full" onClick={handleCompleteOrder}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Completar Pedido
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleCancelOrder}>
                    Cancelar Pedido
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
