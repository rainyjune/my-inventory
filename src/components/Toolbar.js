import React from 'react';
import ToolbarButton from './ToolbarButton';

const Toolbar = () => (
  <div>
    <ToolbarButton type="CREATE">New</ToolbarButton>
    <ToolbarButton type="EDIT">Edit</ToolbarButton>
    <ToolbarButton type="REMOVE">Remove</ToolbarButton>
  </div>
);

export default Toolbar;