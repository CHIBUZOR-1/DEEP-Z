import React from 'react'

const TabNav = ({ tabs, activeTab, onTabClick }) => {
  return (
    <div className="border-b grid grid-cols-2 w-full border-gray-200">
        { 
            tabs.map((tab, index) => ( 
                <button key={index} className={`px-4 py-2 -mb-px font-semibold text-slate-700 ${activeTab === tab ? 'border-b-2 border-facebookDark-400' : ''}`} onClick={() => onTabClick(tab)} > {tab} </button> 
                )
            )
        }
    </div>
  )
}

export default TabNav