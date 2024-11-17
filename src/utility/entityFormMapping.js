import KleureForm from "../components/forms/KleureForm";
import KultivarsForm from "../components/forms/KultivarsForm";
import BokseForm from "../components/forms/BokseForm";
import MarkteForm from "../components/forms/MarkteForm";
import PlekkeForm from "../components/forms/PlekkeForm";
import ProdusenteForm from "../components/forms/ProdusenteForm";
import TipesForm from "../components/forms/TipesForm";
import VerpakkingsForm from "../components/forms/VerpakkingsForm";
import VervoerdersForm from "../components/forms/VervoerdersForm";
import WekeForm from "../components/forms/WekeForm";
import PryseForm from "../components/forms/PryseForm";
import VragteForm from "../components/forms/VragteForm";
import PaletteForm from "../components/forms/PaletteForm";
import RoetesForm from "../components/forms/RoetesForm";
import VerkopesForm from "../components/forms/VerkopesForm";
import TransaksiesForm from "../components/forms/TransaksiesForm";

const entityFormMapping = {
  kleure: KleureForm,
  kultivars: KultivarsForm,
  bokse: BokseForm,
  markte: MarkteForm,
  plekke: PlekkeForm,
  produsente: ProdusenteForm,
  tipes: TipesForm,
  verpakkings: VerpakkingsForm,
  vervoerders: VervoerdersForm,
  weke: WekeForm,
  pryse: PryseForm,
  vragte: VragteForm,
  palette: PaletteForm,
  roetes: RoetesForm,
  verkopes: VerkopesForm,
  transaksies: TransaksiesForm,
};

export default entityFormMapping;
