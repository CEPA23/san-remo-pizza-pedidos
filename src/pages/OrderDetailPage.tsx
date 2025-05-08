
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { MapPin, User, Phone } from 'lucide-react';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export function OrderDetailPage() {
  const { id } = useParams();
  const { toast } = useToast();
  
  // Datos de muestra para el pedido
  const orderType = id?.startsWith('D') ? 'delivery' : 'dine-in';
  const orderStatus = 'preparing'; // pending, preparing, completed, delivered
  const customer = orderType === 'delivery' 
    ? { name: 'María García', phone: '+34 655 123 456', address: 'Calle Principal 123, Centro' }
    : { table: 5 };
  const createdAt = '2023-05-08 15:30';
  
  // Productos del pedido
  const items: OrderItem[] = [
    { id: 1, name: 'Pizza Margarita', price: 12.90, quantity: 1 },
    { id: 2, name: 'Pizza Pepperoni', price: 14.50, quantity: 2 },
    { id: 3, name: 'Agua Mineral', price: 2.50, quantity: 3 },
  ];

  const handleChangeStatus = (status: string) => {
    toast({
      title: `Estado Actualizado`,
      description: `El pedido ahora está: ${status}`,
    });
  };

  const handlePrintBill = () => {
    toast({
      title: "Imprimiendo Factura",
      description: "La factura se está enviando a la impresora",
    });
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      preparing: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      delivered: 'bg-purple-100 text-purple-800',
    };
    
    const labels: Record<string, string> = {
      pending: 'Pendiente',
      preparing: 'En preparación',
      completed: 'Completado',
      delivered: 'Entregado',
    };
    
    return <Badge className={styles[status]}>{labels[status]}</Badge>;
  };

  const getOrderTypeBadge = (type: string) => {
    return (
      <Badge variant="outline" className={type === 'dine-in' ? 'border-pizza-red text-pizza-red' : 'border-pizza-green text-pizza-green'}>
        {type === 'dine-in' ? 'En local' : 'Delivery'}
      </Badge>
    );
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Pedido {id}</h2>
        <div className="flex items-center space-x-4">
          {getOrderTypeBadge(orderType)}
          {getStatusBadge(orderStatus)}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Detalles del Pedido</CardTitle>
              <CardDescription>Fecha: {createdAt}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Precio Unitario</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell className="text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-6 flex justify-end">
                <div className="w-1/3 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>IVA (21%):</span>
                    <span>${(calculateTotal() * 0.21).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total:</span>
                    <span>${(calculateTotal() * 1.21).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información del Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              {orderType === 'delivery' ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{(customer as any).name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>{(customer as any).phone}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 mt-1" />
                    <span>{(customer as any).address}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Mesa:</span>
                    <span>{(customer as any).table}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Cambiar Estado:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button size="sm" onClick={() => handleChangeStatus('Pendiente')}>Pendiente</Button>
                    <Button size="sm" onClick={() => handleChangeStatus('En Preparación')}>Preparando</Button>
                    <Button size="sm" onClick={() => handleChangeStatus('Completado')}>Completado</Button>
                    {orderType === 'delivery' && (
                      <Button size="sm" onClick={() => handleChangeStatus('Entregado')}>Entregado</Button>
                    )}
                  </div>
                </div>
                <Button className="w-full" onClick={handlePrintBill}>
                  Imprimir Factura
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
