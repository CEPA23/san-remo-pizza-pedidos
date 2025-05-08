
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'out-of-stock';
}

export function MenuPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  // Datos de muestra para productos
  const products: Product[] = [
    { id: 1, name: 'Pizza Margarita', category: 'Pizzas', price: 12.90, stock: 15, status: 'active' },
    { id: 2, name: 'Pizza Pepperoni', category: 'Pizzas', price: 14.50, stock: 12, status: 'active' },
    { id: 3, name: 'Pizza Cuatro Quesos', category: 'Pizzas', price: 13.90, stock: 8, status: 'active' },
    { id: 4, name: 'Pizza Vegetariana', category: 'Pizzas', price: 13.50, stock: 10, status: 'active' },
    { id: 5, name: 'Pizza Hawaiana', category: 'Pizzas', price: 14.90, stock: 0, status: 'out-of-stock' },
    { id: 6, name: 'Lasaña', category: 'Pastas', price: 11.50, stock: 7, status: 'active' },
    { id: 7, name: 'Espagueti Carbonara', category: 'Pastas', price: 10.90, stock: 9, status: 'active' },
    { id: 8, name: 'Agua Mineral', category: 'Bebidas', price: 2.50, stock: 25, status: 'active' },
    { id: 9, name: 'Refresco Cola', category: 'Bebidas', price: 2.90, stock: 20, status: 'active' },
    { id: 10, name: 'Cerveza', category: 'Bebidas', price: 3.50, stock: 18, status: 'active' },
  ];

  const handleAddProduct = () => {
    toast({
      title: "Añadir Producto",
      description: "Abriendo formulario para añadir nuevo producto",
    });
  };

  const handleEditProduct = (id: number) => {
    toast({
      title: "Editar Producto",
      description: `Editando producto ${id}`,
    });
  };

  const handleDeleteProduct = (id: number) => {
    toast({
      title: "Eliminar Producto",
      description: `Producto ${id} eliminado`,
    });
  };

  const filteredProducts = searchTerm
    ? products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  const getStatusBadge = (status: Product['status']) => {
    return status === 'active' 
      ? <Badge className="bg-green-100 text-green-800">Disponible</Badge>
      : <Badge className="bg-red-100 text-red-800">Sin stock</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Menú</h2>
        <Button onClick={handleAddProduct}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Producto
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Catálogo de Productos</CardTitle>
          <CardDescription>Gestiona el menú y precios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar productos..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{getStatusBadge(product.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditProduct(product.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No se encontraron productos
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
