
import React from 'react';
import { 
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { Home, Table, ShoppingCart, MapPin, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { title: 'Inicio', path: '/', icon: Home },
  { title: 'Mesas', path: '/tables', icon: Table },
  { title: 'Delivery', path: '/delivery', icon: MapPin },
  { title: 'Pedidos', path: '/orders', icon: ShoppingCart },
  { title: 'Menú', path: '/menu', icon: Menu },
];

export function Sidebar() {
  const location = useLocation();
  
  return (
    <SidebarComponent>
      <SidebarContent>
        <div className="flex items-center justify-center py-6">
          <h1 className="text-2xl font-bold text-white">San Remo</h1>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-primary">Menú</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={location.pathname === item.path ? "bg-sidebar-accent" : ""}
                  >
                    <Link to={item.path}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComponent>
  );
}
