/**
 * TACOSTADA TAMPICO — Datos comerciales y menú
 * Propuesta comercial desarrollada por NEXORA
 * 
 * NOTA DE VERACIDAD DE DATOS:
 * - Precios y productos verificados vía plataformas públicas de delivery (DiDi Food / Rappi Tampico).
 * - Sucursales y teléfonos extraídos de los canales públicos oficiales (@tacostadatampico).
 * - Las imágenes fotográficas son de referencia gastronómica de alta fidelidad para la demo.
 */

export const RESTAURANT_INFO = {
  name: "Tacostada",
  slogan: "El antojo no se discute",
  tagline: "Lo mejor del taco, la tostada, la burger y la papa asada en Tampico y Ciudad Madero.",
  social: {
    instagram: "https://www.instagram.com/tacostadatampico/",
    facebook: "https://www.facebook.com/Tacostadatampico/",
    instagramHandle: "@tacostadatampico"
  },
  branches: [
    {
      id: "sexta-avenida",
      name: "Sucursal Sexta Avenida (Tampico)",
      tag: "Matriz Tampico",
      address: "Río Pánuco y Andador 1 #217, Col. Emilio Portes Gil / Sexta Avenida, Tampico, Tamps., C.P. 89316",
      phone: "833 293 1012",
      phoneRaw: "528332931012",
      hours: "Lunes a Domingo · 3:00 PM – 12:00 AM (Horario comercial habitual)",
      hoursNote: "Horario verificado en anuncios públicos de temporada.",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Rio+Panuco+y+Andador+1+217+Emilio+Portes+Gil+Tampico",
      delivery: {
        didi: "https://web.didiglobal.com/mx/food/tampico-tam/tacostada/5764607748218816287/",
        rappi: "https://www.rappi.com.mx/restaurantes/1930050055-tacostada-belice",
        ubereats: "https://www.ubereats.com/mx/store/tacostada/jMKzQZkUWM2yq7tQkf-WCg"
      }
    },
    {
      id: "unidad-nacional",
      name: "Sucursal Unidad Nacional (Cd. Madero)",
      tag: "Nueva Sucursal",
      address: "Calle Oaxaca #101-B, Col. Unidad Nacional, Ciudad Madero, Tamps.",
      phone: "833 160 0865",
      phoneRaw: "528331600865",
      hours: "Lunes a Domingo · 3:00 PM – 12:00 AM",
      hoursNote: "Sujeto a confirmación directa con el restaurante.",
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Oaxaca+101-B+Unidad+Nacional+Ciudad+Madero",
      delivery: {
        didi: "https://web.didiglobal.com/mx/food/tampico-tam/tacostada-suc-unidad-nacional-madero/5764614663757893422/",
        rappi: "https://www.rappi.com.mx/restaurantes/1930459193-tacostada-tampico-calle-oaxaca-b-un",
        ubereats: null // Pendiente de confirmar URL directa de esta sucursal
      }
    }
  ],
  deliveryPlatforms: [
    {
      name: "DiDi Food",
      badge: "Disponible",
      color: "#ff7700",
      description: "Menú completo con promociones activas en Tampico y Madero."
    },
    {
      name: "Rappi",
      badge: "Disponible",
      color: "#ff441f",
      description: "Servicio a domicilio directo con cobertura metropolitana."
    },
    {
      name: "Uber Eats",
      badge: "Disponible",
      color: "#06c167",
      description: "Pide tus favoritos por la app de Uber en zona conurbada."
    }
  ]
};

export const MENU_CATEGORIES = [
  { id: "todos", label: "Todo el menú", icon: "utensils" },
  { id: "favoritos", label: "Favoritos ⭐", icon: "star" },
  { id: "tacos", label: "Tacos y Tostadas", icon: "taco" },
  { id: "burgers", label: "Hamburguesas Mamalonas", icon: "burger" },
  { id: "papas", label: "Papas Asadas", icon: "potato" },
  { id: "gringas-tortas", label: "Gringas y Tortas", icon: "sandwich" },
  { id: "hotdogs", label: "Hot Dogs", icon: "hotdog" },
  { id: "combos", label: "Combos y Paquetes", icon: "package" },
  { id: "bebidas", label: "Bebidas", icon: "drink" }
];

export const MENU_ITEMS = [
  // --- FAVORITOS DESTACADOS ---
  {
    id: "hamburguesa-mamalona",
    name: "Hamburguesa La Mamalona",
    category: "burgers",
    price: 175.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "Carne de sirloin jugosa, queso amarillo, cheddar, doble queso asadero, doble salchichón, doble tocino, jamón, lechuga, tomate, cebollitas asadas y aderezo especial de la casa estilo Tacostada. Incluye papas fritas.",
    isFavorite: true,
    badge: "Insignia de la Casa",
    image: {
      src: "assets/img/ref-hamburguesa-800.jpg",
      srcset: "assets/img/ref-hamburguesa-480.jpg 480w, assets/img/ref-hamburguesa-800.jpg 800w",
      alt: "Hamburguesa La Mamalona con carne sirloin, doble tocino, quesos fundidos y papas",
      isReference: true
    }
  },
  {
    id: "tacos-pastor-orden",
    name: "Orden de 10 Tacos de Pastor (+ 1/2 L de Agua Gratis)",
    category: "combos",
    price: 210.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "10 tacos de carne al pastor marinada con piña, cilantro y cebolla, acompañados con medio litro de agua fresca de sabor de la casa.",
    isFavorite: true,
    badge: "Combo Más Vendido",
    image: {
      src: "assets/img/ref-tacos-pastor-800.jpg",
      srcset: "assets/img/ref-tacos-pastor-480.jpg 480w, assets/img/ref-tacos-pastor-800.jpg 800w, assets/img/ref-tacos-pastor-1376.jpg 1376w",
      alt: "Tacos al pastor mexicanos con piña caramelizada, cebolla, cilantro y salsas",
      isReference: true
    }
  },
  {
    id: "mega-papa-pastor",
    name: "Mega Papa con Pastor",
    category: "papas",
    price: 190.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "Medio kilo de papa horneada estilo Tacostada con abundante carne al pastor, queso cheddar derretido, queso asadero gratinado, crema ácida, 2 tostaditas crujientes, salsa verde y roja.",
    isFavorite: true,
    badge: "Especialidad",
    image: {
      src: "assets/img/ref-papa-asada-800.jpg",
      srcset: "assets/img/ref-papa-asada-480.jpg 480w, assets/img/ref-papa-asada-800.jpg 800w",
      alt: "Papa asada rellena de carne al pastor y fajita con quesos gratinados y crema",
      isReference: true
    }
  },

  // --- TACOS Y TOSTADAS ---
  {
    id: "taco-estilo-valles",
    name: "Taco Estilo Valles",
    category: "tacos",
    price: 80.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "Rico taco estilo Valles preparado en tortilla grande con bistec de res al estilo de la Tacostada, cebollita cocida, cilantro fresco, rebanadas de aguacate y guarnición de papas fritas.",
    isFavorite: false,
    badge: "Estilo Huasteco"
  },
  {
    id: "taco-individual",
    name: "Taco Individual (Pastor o Fajita)",
    category: "tacos",
    price: 17.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "Taco tradicional en tortilla de maíz con carne al pastor sazonada o fajita de res, con cilantro, cebolla y salsas artesanales.",
    isFavorite: false
  },
  {
    id: "taco-fajita-papas",
    name: "Taco de Fajita con Papas",
    category: "tacos",
    price: 40.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "Taco en maíz o harina con exquisita fajita de res suave y jugosa, acompañado con porción de papas a la francesa.",
    isFavorite: false
  },
  {
    id: "tacos-fajita-guacamole",
    name: "Tacos de Fajita c/ Guacamole y Papas",
    category: "tacos",
    price: 55.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "Taco de maíz con carne de fajita de res, guacamole fresco al estilo de la Tacostada, cilantro y cebolla con papas fritas.",
    isFavorite: false
  },
  {
    id: "tostada-individual",
    name: "Tostada Preparada (Pastor, Fajita o Mixta)",
    category: "tacos",
    price: 45.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "Crujiente tostada de maíz untada con guacamole de la casa, coronada con la carne de tu elección, crema y salsa.",
    isFavorite: false,
    badge: "Clásico Tacostada"
  },
  {
    id: "alambre-orden",
    name: "Alambre Especial (Para 2 Personas)",
    category: "tacos",
    price: 250.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "Arrachera, tocino crujiente, jamón, cebollitas asadas, pimiento verde y queso fundido. Incluye 20 tortillas calientes, salsas, cebolla, cilantro y limones.",
    isFavorite: false,
    badge: "Para Compartir"
  },
  {
    id: "nachos-pastor",
    name: "Nachos con Pastor",
    category: "tacos",
    price: 250.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "Generosa porción de totopos crujientes bañados en queso cheddar caliente, carne al pastor doradita y rodajas de chile jalapeño.",
    isFavorite: false
  },

  // --- HAMBURGUESAS ---
  {
    id: "burger-la-hulk",
    name: "Hamburguesa La Hulk",
    category: "burgers",
    price: 165.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "Pan clásico, carne de sirloin de res jugosa, queso amarillo, queso asadero, tocino, jamón, lechuga, guacamole abundante al estilo Tacostada, tomate y cebolla. Con 100g de papas.",
    isFavorite: false,
    badge: "Con Guacamole"
  },
  {
    id: "burger-la-diabla",
    name: "La Diabla Burger 🔥😈",
    category: "burgers",
    price: 160.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "Jugosa carne de sirloin, doble tocino, queso amarillo, queso Monterrey Jack derretido, cebollitas asadas, tomate, lechuga y salsa Diabla picosita al estilo Tacostada. Con papas fritas.",
    isFavorite: false,
    badge: "Para Valientes"
  },
  {
    id: "burger-buchona",
    name: "Hamburguesa Buchona",
    category: "burgers",
    price: 160.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "Carne sirloin, queso amarillo, cheddar, queso asadero gratinado, tocino, jamón, salchichón asado, cebollitas y aderezo especial Tacostada con papas.",
    isFavorite: false
  },
  {
    id: "burger-pastor",
    name: "Hamburguesa de Pastor 🔥",
    category: "burgers",
    price: 160.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "Carne sirloin de res combinada con carne al pastor de la casa, queso cheddar, tocino, mayonesa, queso asadero y aderezo especial.",
    isFavorite: false
  },
  {
    id: "burger-hawaiana",
    name: "Hamburguesa Hawaiana",
    category: "burgers",
    price: 160.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "Pan clásico, carne sirloin de res, piña asada caramelizada, queso asadero derretido, lechuga, tomate y cebolla con papas fritas.",
    isFavorite: false
  },
  {
    id: "burger-clasica",
    name: "Hamburguesa Clásica con Papas",
    category: "burgers",
    price: 150.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "Carne jugosa de sirloin de res, queso amarillo, tocino, lechuga, tomate, cebolla y porción de papas a la francesa.",
    isFavorite: false
  },

  // --- PAPAS ASADAS ---
  {
    id: "papa-de-pastor",
    name: "Papa Asada de Pastor",
    category: "papas",
    price: 150.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "Papa horneada al estilo Tacostada con carne al pastor, queso cheddar fundido, queso asadero y crema ácida. Incluye 4 tostaditas crujientes.",
    isFavorite: false
  },
  {
    id: "papa-mixta",
    name: "Papa Asada Mixta",
    category: "papas",
    price: 160.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "Deliciosa papa horneada rellena de carne al pastor y fajita de res, doble queso (cheddar y asadero), crema, 2 tostadas y salsas de la casa.",
    isFavorite: false
  },
  {
    id: "papa-fajita",
    name: "Papa Asada de Fajita",
    category: "papas",
    price: 170.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "Papa horneada suave rellena con abundante carne de fajita de res sazonada, queso cheddar y asadero gratinado, crema fresca y tostaditas.",
    isFavorite: false
  },
  {
    id: "papas-francesa-orden",
    name: "Papas a la Francesa Preparadas",
    category: "papas",
    price: 70.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "Orden de papas fritas doraditas y crujientes, sazonadas con aderezo especial al estilo de la Tacostada.",
    isFavorite: false
  },

  // --- GRINGAS Y TORTAS ---
  {
    id: "gringa-pastor",
    name: "Gringa al Pastor con Papas Fritas",
    category: "gringas-tortas",
    price: 120.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "Tortilla de harina con rica carne de pastor con piña, queso fundido, cilantro, cebolla y aguacate. Acompañada con porción de papas fritas.",
    isFavorite: false,
    badge: "Popular"
  },
  {
    id: "gringa-mixta",
    name: "Gringa Mixta con Papas Fritas",
    category: "gringas-tortas",
    price: 130.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "Fajita de res y carne al pastor combinadas con queso derretido, cilantro, cebolla y aguacate en tortilla de harina con papas.",
    isFavorite: false
  },
  {
    id: "gringa-fajita",
    name: "Gringa de Fajita con Papas Fritas",
    category: "gringas-tortas",
    price: 140.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "Fajita de res suave con abundante queso fundido, aguacate, cilantro y cebolla, con guarnición de papas a la francesa.",
    isFavorite: false
  },
  {
    id: "torta-favorita",
    name: "Torta Especial (Pastor, Mixta o Fajita)",
    category: "gringas-tortas",
    price: 105.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "Pan telera dorado con la carne de tu elección, aguacate, lechuga, tomate, mayonesa y queso derretido. Incluye papas fritas.",
    isFavorite: false
  },
  {
    id: "torta-pastor-hawaiana",
    name: "Torta Pastor Hawaiana",
    category: "gringas-tortas",
    price: 85.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "Carne al pastor con piña asada caramelizada, queso fundido, crema y salsas en pan dorado.",
    isFavorite: false
  },

  // --- HOT DOGS ---
  {
    id: "hotdog-embarazado",
    name: "Hot Dog Embarazado con Papas (Estilo Sinaloa)",
    category: "hotdogs",
    price: 90.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "Hot dog con salchicha envuelta en tocino, relleno especial al estilo Sinaloa, mayonesa, cátsup, tomate y cebolla. Incluye papas fritas.",
    isFavorite: false,
    badge: "Estilo Sinaloa"
  },
  {
    id: "hotdog-el-presumido",
    name: "Hot Dog El Presumido con Papas",
    category: "hotdogs",
    price: 90.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "Salchicha para asar, tocino crujiente, cebollitas asadas, cátsup, mayonesa y el toque especial de la Tacostada con papas.",
    isFavorite: false
  },
  {
    id: "hotdog-clasico",
    name: "Hot Dog Clásico con Papas",
    category: "hotdogs",
    price: 80.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "Hot dog tradicional con salchicha, tocino, tomate, cebolla, aderezos y porción de papas a la francesa.",
    isFavorite: false
  },

  // --- COMBOS Y PAQUETES ---
  {
    id: "combo-mamalona-papa",
    name: "Combo Mamalona + Papa de Fajita",
    category: "combos",
    price: 300.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "1 Hamburguesa La Mamalona completa con todos los quesos y carnes + 1 Papa Asada de Fajita con queso y crema.",
    isFavorite: false,
    badge: "Combo Pareja"
  },
  {
    id: "combo-mamalon-burger-hotdog",
    name: "Combo Mamalón: Hamburguesa + Hot Dog Embarazado",
    category: "combos",
    price: 265.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "1 Hamburguesa La Mamalona con papas + 1 Hot Dog Embarazado estilo Sinaloa con papas.",
    isFavorite: false
  },
  {
    id: "combo-iron-man",
    name: "Combo Iron Man",
    category: "combos",
    price: 150.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "Hamburguesa clásica con carne jugosa, papas a la francesa y refresco incluido.",
    isFavorite: false
  },
  {
    id: "combo-loco",
    name: "Combo Loco",
    category: "combos",
    price: 205.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "5 Tacos al pastor con verdura y salsas + 1 Torta al pastor + 1/2 Litro de agua fresca de sabor.",
    isFavorite: false
  },

  // --- BEBIDAS ---
  {
    id: "agua-fresca-1l",
    name: "Agua Fresca Natural de 1 Litro",
    category: "bebidas",
    price: 60.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "Ricas aguas frescas preparadas al momento. Sabores disponibles: Horchata artesanal, Jamaica concentrada o Pepino con limón refrescante.",
    isFavorite: false,
    badge: "De Litro"
  },
  {
    id: "agua-fresca-medio",
    name: "Agua Fresca de Sabor (1/2 Litro)",
    category: "bebidas",
    price: 40.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "Medio litro de agua natural de horchata o jamaica.",
    isFavorite: false
  },
  {
    id: "refresco-600ml",
    name: "Refresco Embotellado 600 ml",
    category: "bebidas",
    price: 38.00,
    priceVerified: true,
    priceNote: "Precio confirmado en DiDi Food",
    description: "Coca-Cola clásica o Coca-Cola Light en presentación de 600 ml bien fría.",
    isFavorite: false
  }
];
