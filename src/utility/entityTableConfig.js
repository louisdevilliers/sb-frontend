// entityTableConfig.js

export const kleureTableConfig = {
  columns: [
    { id: 'createdAt', label: 'Added' },
    { id: 'id', label: 'ID' },
    { id: 'kode', label: 'Kode' },
    { id: 'naam', label: 'Naam' },
    { id: 'updatedAt', label: 'Updated' },
  ],
  // ... other configurations like initial sorting state
};

export const bokseTableConfig = {
  columns: [
    { id: 'createdAt', label: 'Added' },
    { id: 'id', label: 'ID' },
    { id: 'kode', label: 'Kode' },
    { id: 'naam', label: 'Naam' },
    { id: 'grootte', label: 'Grootte' },
    { id: 'brand', label: 'Brand' },
    { id: 'updatedAt', label: 'Updated' },
  ],
  
};

export const faktureTableConfig = {
  columns: [
    { id: 'createdAt', label: 'Added' },
    { id: 'id', label: 'ID' },
    { id: 'datum', label: 'datum' },
    { id: 'nommer', label: 'nommer' },
    { id: 'tipeId', label: 'Tipe' },
    { id: 'updatedAt', label: 'Updated' },
  ],
  
};

export const loadsTableConfig = {
  columns: [
    { id: 'createdAt', label: 'Added' },
    { id: 'id', label: 'ID' },
    { id: 'roeteId', label: 'Roete' },
    { id: 'uitlaaiId', label: 'Uitlaai' },
    { id: 'paletId', label: 'Palet' },
    { id: 'updatedAt', label: 'Updated' },
  ],
  
};

export const markteTableConfig = {
  columns: [
    { id: 'createdAt', label: 'Added' },
    { id: 'id', label: 'ID' },
    { id: 'naam', label: 'Naam' },
    { id: 'updatedAt', label: 'Updated' },
  ],
  
};

export const paletteTableConfig = {
  columns: [
    { id: 'createdAt', label: 'Added' },
    { id: 'id', label: 'ID' },
    { id: 'datum', label: 'Datum' },
    { id: 'nommer', label: 'Nommer' },
    { id: 'uitlaai', label: 'Uitlaai' },
    { id: 'updatedAt', label: 'Updated' },
  ],
  
};

export const plekkeTableConfig = {
  columns: [
    { id: 'createdAt', label: 'Added' },
    { id: 'id', label: 'ID' },
    { id: 'naam', label: 'Naam' },
    { id: 'updatedAt', label: 'Updated' },
  ],
  
};

export const produsenteTableConfig = {
  columns: [
    { id: 'createdAt', label: 'Added' },
    { id: 'id', label: 'ID' },
    { id: 'naam', label: 'Naam' },
    { id: 'kode', label: 'Kode' },
    { id: 'updatedAt', label: 'Updated' },
  ],
  
};

export const pryseTableConfig = {
  columns: [
    { id: 'createdAt', label: 'Added' },
    { id: 'id', label: 'ID' },
    { id: 'weekId', label: 'Week' },
    { id: 'kultivarId', label: 'Kultivar' },
    { id: 'prys', label: 'Prys' },
    { id: 'updatedAt', label: 'Updated' },
  ],
};

export const roetesTableConfig = {
  columns: [
    { id: 'createdAt', label: 'Added' },
    { id: 'id', label: 'ID' },
    { id: 'plekId', label: 'Plek' },
    { id: 'markId', label: 'Mark' },
    { id: 'updatedAt', label: 'Updated' },
  ],
};

export const stacksTableConfig = {
  columns: [
    { id: 'createdAt', label: 'Added' },
    { id: 'id', label: 'ID' },
    { id: 'nbokse', label: '# Bokse' },
    { id: 'vragId', label: 'Vrag' },
    { id: 'paletId', label: 'Palet' },
    { id: 'updatedAt', label: 'Updated' },
  ],
  
};

export const tipesTableConfig = {
  columns: [
    { id: 'createdAt', label: 'Added' },
    { id: 'id', label: 'ID' },
    { id: 'tipe', label: 'Tipe' },
    { id: 'updatedAt', label: 'Updated' },
  ],
  
};

export const transaksiesTableConfig = {
  columns: [
    { id: 'createdAt', label: 'Added' },
    { id: 'id', label: 'ID' },
    { id: 'nbokse', label: '# Bokse' },
    { id: 'stackId', label: 'Stack' },
    { id: 'faktuurId', label: 'Faktuur' },
    { id: 'updatedAt', label: 'Updated' },
  ],
  
};

export const uitlaaieTableConfig = {
  columns: [
    { id: 'createdAt', label: 'Added' },
    { id: 'id', label: 'ID' },
    { id: 'datum', label: 'Datum' },
    { id: 'vervoerderId', label: 'Vervoerder' },
    { id: 'updatedAt', label: 'Updated' },
  ],
  
};

export const verkopesTableConfig = {
  columns: [
    { id: 'createdAt', label: 'Added' },
    { id: 'id', label: 'ID' },
    { id: 'qty', label: 'Quantity' },
    { id: 'faktuurId', label: 'Faktuur' },
    { id: 'verpakkingId', label: 'Verpakking' },
    { id: 'produsentId', label: 'Produsent' },
    { id: 'updatedAt', label: 'Updated' },
  ],
  
};

export const verpakkingsTableConfig = {
  columns: [
    { id: 'createdAt', label: 'Added' },
    { id: 'id', label: 'ID' },
    { id: 'prys', label: 'Prys' },
    { id: 'naam', label: 'Naam' },
    { id: 'updatedAt', label: 'Updated' },
  ],
  
};

export const vervoerdersTableConfig = {
  columns: [
    { id: 'createdAt', label: 'Added' },
    { id: 'id', label: 'ID' },
    { id: 'naam', label: 'Naam' },
    { id: 'updatedAt', label: 'Updated' },
  ],
  
};

export const vragteTableConfig = {
  columns: [
    { id: 'createdAt', label: 'Added' },
    { id: 'id', label: 'ID' },
    { id: 'qty', label: 'Quantity' },
    { id: 'isConsumed', label: 'isConsumed' },
    { id: 'faktuurId', label: 'Faktuur' },
    { id: 'kultivarId', label: 'Kultivar' },
    { id: 'produsentId', label: 'Produsent' },
    { id: 'prysId', label: 'Prys' },
    { id: 'boksId', label: 'Boks' },
    { id: 'updatedAt', label: 'Updated' },
  ],
  
};

export const wekeTableConfig = {
  columns: [
    { id: 'createdAt', label: 'Added' },
    { id: 'id', label: 'ID' },
    { id: 'nommer', label: 'nommer' },
    { id: 'letter', label: 'letter' },
    { id: 'updatedAt', label: 'Updated' },
  ],
  
};

export const kultivarsTableConfig = {
  columns: [
    { id: 'createdAt', label: 'Added' },
    { id: 'id', label: 'ID' },
    { id: 'kode', label: 'Kode' },
    { id: 'naam', label: 'Naam' },
    { id: 'kleurId', label: 'Kleur' },
    { id: 'updatedAt', label: 'Updated' },
  ],
  
};



// Add configs for other entities
