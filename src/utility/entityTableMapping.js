import KleureTable from '../components/tables/KleureTable'
import KultivarsTable from '../components/tables/KultivarsTable'
import BokseTable from '../components/tables/BokseTable'
import FaktureTable from '../components/tables/FaktureTable'
import LoadsTable from '../components/tables/LoadsTable'
import MarkteTable from '../components/tables/MarkteTable'
import PaletteTable from '../components/tables/PaletteTable'
import PlekkeTable from '../components/tables/PlekkeTable'
import ProdusenteTable from '../components/tables/ProdusenteTable'
import PryseTable from '../components/tables/PryseTable'
import RoetesTable from '../components/tables/RoetesTable'
import StacksTable from '../components/tables/StacksTable'
import TipesTable from '../components/tables/TipesTable'
import TransaksiesTable from '../components/tables/TransaksiesTable'
import UitlaaieTable from '../components/tables/UitlaaieTable'
import VerkopesTable from '../components/tables/VerkopesTable'
import VerpakkingsTable from '../components/tables/VerpakkingsTable'
import VervoerdersTable from '../components/tables/VervoerdersTable'
import VragteTable from '../components/tables/VragteTable'
import WekeTable from '../components/tables/WekeTable'

export const entityTableMapping = {
    kleure: KleureTable,
    kultivars: KultivarsTable,
    bokse: BokseTable,
    fakture: FaktureTable,
    loads: LoadsTable,
    markte: MarkteTable,
    palette: PaletteTable,
    plekke: PlekkeTable,
    produsente: ProdusenteTable,
    pryse: PryseTable,
    roetes: RoetesTable,
    stacks: StacksTable,
    tipes: TipesTable,
    transaksies: TransaksiesTable,
    uitlaaie: UitlaaieTable,
    verkopes: VerkopesTable,
    verpakkings: VerpakkingsTable,
    vervoerders: VervoerdersTable,
    vragte: VragteTable,
    weke: WekeTable,
    //... other entity mappings
  };