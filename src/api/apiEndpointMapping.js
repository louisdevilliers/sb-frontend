const apiEndpointMapping = {
  bokse: {
    create: "/api/boks", // Create a new boks
    show: "/api/boks", // Fetch all bokse (for tables)
    list: "/api/boks/list", // Fetch bokse for dropdown
  },
  fakture: {
    create: "/api/faktuur",
    show: "/api/faktuur",
    list: "/api/faktuur/list",
  },
  kleure: {
    create: "/api/kleur",
    show: "/api/kleur",
    list: "/api/kleur/list",
  },
  kultivars: {
    create: "/api/kultivar",
    show: "/api/kultivar",
    list: "/api/kultivar/list",
  },
  loads: {
    create: "/api/loads",
    show: "/api/loads",
    list: "/api/loads/list",
  },
  markte: {
    create: "/api/mark",
    show: "/api/mark",
    list: "/api/mark/list",
  },
  palette: {
    create: "/api/palet",
    show: "/api/palet",
    list: "/api/palet/list",
  },
  plekke: {
    create: "/api/plek",
    show: "/api/plek",
    list: "/api/plek/list",
  },
  produsente: {
    create: "/api/produsent",
    show: "/api/produsent",
    list: "/api/produsent/list",
  },
  pryse: {
    create: "/api/prys",
    show: "/api/prys",
    list: "/api/prys/list",
  },
  roetes: {
    create: "/api/roete",
    show: "/api/roete",
    list: "/api/roete/list",
  },
  stapels: {
    create: "/api/stack",
    show: "/api/stack",
    list: "/api/stack/list",
  },
  tipes: {
    create: "/api/tipe",
    show: "/api/tipe",
    list: "/api/tipe/list",
  },
  transaksies: {
    create: "/api/transaksie",
    show: "/api/transaksie",
    list: "/api/transaksie/list",
  },
  uitlaaie: {
    create: "/api/uitlaai",
    show: "/api/uitlaai",
    list: "/api/uitlaai/list",
  },
  verkope: {
    create: "/api/verkope",
    show: "/api/verkope",
    list: "/api/verkope/list",
  },
  verpakkings: {
    create: "/api/verpakking",
    show: "/api/verpakking",
    list: "/api/verpakking/list",
  },
  vervoerders: {
    create: "/api/vervoerder",
    show: "/api/vervoerder",
    list: "/api/vervoerder/list",
  },
  vragte: {
    create: "/api/vrag",
    show: "/api/vrag",
    list: "/api/vrag/list",
  },
  weke: {
    create: "/api/week",
    show: "/api/week",
    list: "/api/week/list",
  },
};

export default apiEndpointMapping;
