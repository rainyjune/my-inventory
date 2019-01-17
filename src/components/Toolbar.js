import React from 'react';
import ToolbarButton from '../containers/ToolbarButton';

const Toolbar = () => (
  <div>
    <ToolbarButton type="CREATE">New</ToolbarButton>
    <ToolbarButton type="EDIT">Edit</ToolbarButton>
    <ToolbarButton type="REMOVE">Remove</ToolbarButton>
    <ToolbarButton type="REFRESH">Refresh</ToolbarButton>
  </div>
);

export default Toolbar;