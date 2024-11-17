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
import VragteForm from "../components/forms/VragteForm";
import PaletteForm from "../components/forms/PaletteForm";

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
  vragte: VragteForm,
  palette: PaletteForm,
};

export default entityFormMapping;
