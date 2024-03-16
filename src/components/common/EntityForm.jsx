import React from 'react';
import entityFormMapping from '../../utility/entityFormMapping'; // Adjust the path as necessary

const EntityForm = ({ entity, onSubmit }) => {
    console.log('3 in entity form mapper, entity:', entity);
  const SpecificForm = entityFormMapping[entity];

  if (!SpecificForm) {
    return <div>No form available for this entity.</div>;
  }

  return <SpecificForm onSubmit={onSubmit} />;
};

export default EntityForm;

