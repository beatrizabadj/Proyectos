import React from 'react'
import SidebarMenu from '../components/SidebarMenu';
import ToggleSwitch from '../components/ToggleSwitch';
function ToReadPage() {
  return (
    <main>
      <SidebarMenu/>
      <ToggleSwitch/>
      <h1>Books yet to read!</h1>
    </main>
  )
}

export default ToReadPage