export const MENUITEMS = [
  {
    menutitle: "General",
    menucontent: "Dashboards,Widgets",
    Items: [

         { path: '/dashboard', icon: "icofont-home", id:'dashboard',title: "Dashboard", type: "link" },
         {
          title: "Orders",
          icon: "icofont-chart-histogram",
          type: "sub",
          badgetxt: "New",
          active: false,
          children: [
            { path: '/onsite_orders', type: "link", title: "Onsite Orders", id: 'onsite' },
            { path: '/online_orders', type: "link", title: "Online Order", id:'online' },
          ],
        },
         { path: '/products', icon: "icofont-question-square",id:'products', title: "Products", type: "link" },
         { path: '/categories', icon: "icofont-ui-note",id:'categories', title: "Categories", type: "link" },
         
    ],
  },
    {
    menutitle: "SETTINGS",
    menucontent: "Ready to use Apps",
    Items: [
      { path: '/profile', icon: "icofont-user-alt-3", id:'profile', title: "Profile", type: "link" },
      { path: '/change_password', icon: "icofont-ui-password",id:'change_password', title: "Change Password", type: "link" },
      { path: `${process.env.PUBLIC_URL}/`, icon: "icofont-logout",id:'logout', title: "Logout", type: "link" },
    
    ],
  },


];
