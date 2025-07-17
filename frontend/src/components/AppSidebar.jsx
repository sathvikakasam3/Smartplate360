//src/components/AppSidebar.jsx
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Utensils,
  Camera,
  ChefHat,
  Heart,
  Dumbbell,
  User
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Home", url: "/home", icon: Home },
  { title: "Eat Smart", url: "/eat-smart", icon: Utensils },
  { title: "Calorie Estimator", url: "/calorie-estimator", icon: Camera },
  { title: "Leftover Buddy", url: "/leftover-buddy", icon: ChefHat },
  { title: "FlavorMatch", url: "/flavor-match", icon: Heart },
  { title: "Workouts", url: "/workouts", icon: Dumbbell },
  { title: "Profile", url: "/profile", icon: User },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === "collapsed";

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent>
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Utensils className="w-5 h-5 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="font-bold text-lg text-primary">SmartPlate</h1>
                <p className="text-xs text-muted-foreground">360°</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`transition-all duration-200 ${isActive(item.url)
                        ? "bg-primary/10 text-primary border-r-2 border-primary"
                        : "hover:bg-accent/50"
                      }`}
                  >
                    <NavLink to={item.url} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
