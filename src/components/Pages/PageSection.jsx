// PageSection/PageSection.jsx
import React, { useState } from 'react';
import Admission from '../page component/PageSection/Admission';
import Eligiability from '../page component/PageSection/Eligiability';
import Event from '../page component/PageSection/Event';
import Gallery from '../page component/PageSection/Gallery';
import HowToApply from '../page component/PageSection/HowToApply';
import Notice from '../page component/PageSection/Notice';
import Scholarship from '../page component/PageSection/Scholarship';


const PageSection = () => {
    const [activeSection, setActiveSection] = useState(null);
    const [viewMode, setViewMode] = useState('table');

    const renderSection = () => {
        if (!activeSection) {
            return (
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="text-6xl mb-4">📋</div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Page Sections Management</h2>
                        <p className="text-gray-500">Select a section from the sidebar to view or edit content</p>
                    </div>
                </div>
            );
        }

        const sectionProps = { viewMode, setViewMode };

        switch (activeSection) {
            case 'admission': return <Admission {...sectionProps} />;
            case 'eligiability': return <Eligiability {...sectionProps} />;
            case 'event': return <Event {...sectionProps} />;
            case 'gallery': return <Gallery {...sectionProps} />;
            case 'howtoapply': return <HowToApply {...sectionProps} />;
            case 'notice': return <Notice {...sectionProps} />;
            case 'scholarship': return <Scholarship {...sectionProps} />;
            default: return <Admission {...sectionProps} />;
        }
    };

    const getButtonClass = (sectionName) => {
        return `w-full text-left py-3 px-4 rounded-lg transition-all mb-2 flex items-center ${activeSection === sectionName
            ? 'bg-red-700 text-white shadow-md font-medium'
            : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`;
    };

    const getIcon = (sectionName) => {
        switch (sectionName) {
            case 'admission': return '📝';
            case 'eligiability': return '✅';
            case 'event': return '📅';
            case 'gallery': return '🖼️';
            case 'howtoapply': return '🔍';
            case 'notice': return '📢';
            case 'scholarship': return '🎓';
            default: return '📄';
        }
    };

    const handleSectionClick = (section) => {
        setActiveSection(section);
        setViewMode('table');
    };

    return (
        <div className="pt-20 flex flex-col h-full bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm py-5 px-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Page Sections Management</h1>
                        <p className="text-gray-600 mt-1">Edit and manage your website page sections</p>
                    </div>
                    {activeSection && (
                        <div className="flex space-x-3">
                            <button
                                onClick={() => setViewMode('table')}
                                className={`px-4 py-2 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            >
                                View Content
                            </button>
                            <button
                                onClick={() => setViewMode('form')}
                                className={`px-4 py-2 rounded-lg transition-colors ${viewMode === 'form' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            >
                                Edit Content
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                <div className="w-64 bg-white border-r border-gray-200 p-5 flex flex-col">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                            <span className="bg-red-100 text-red-700 p-2 rounded-lg mr-2">📋</span>
                            Page Sections
                        </h2>
                        <div className="space-y-2">
                            {['admission', 'eligiability', 'event', 'gallery', 'howtoapply', 'notice', 'scholarship'].map((section) => (
                                <button
                                    key={section}
                                    className={getButtonClass(section)}
                                    onClick={() => handleSectionClick(section)}
                                >
                                    <span className="text-lg mr-3">{getIcon(section)}</span>
                                    <span className="capitalize">{section === 'eligiability' ? 'Eligibility' : section.replace(/([A-Z])/g, ' $1')}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-auto p-6 bg-gray-50">
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 min-h-full">
                        {activeSection && (
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                    <span className="bg-red-100 text-red-700 p-2 rounded-lg mr-3">
                                        {getIcon(activeSection)}
                                    </span>
                                    {activeSection === 'eligiability' ? 'Eligibility' :
                                        activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace(/([A-Z])/g, ' $1')}
                                </h2>
                            </div>
                        )}
                        {renderSection()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageSection;