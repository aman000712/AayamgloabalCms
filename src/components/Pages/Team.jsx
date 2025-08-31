import React, { useState, useEffect } from "react";
import TeamTable from "../page component/TeamTable";
import AddTeamMember from "../page component/Team/AddTeamMember";
import EditTeamMember from "../page component/Team/EditTeamMember";
import DeleteTeamMember from "../page component/Team/DeleteTeamMember";

const Team = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    // Load from localStorage
    useEffect(() => {
        const stored = localStorage.getItem("teamMembers");
        if (stored) setTeamMembers(JSON.parse(stored));
    }, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem("teamMembers", JSON.stringify(teamMembers));
    }, [teamMembers]);

    // Add member
    const handleAddMember = (member) => {
        const id = teamMembers.length > 0 ? Math.max(...teamMembers.map(m => m.id)) + 1 : 1;
        setTeamMembers([...teamMembers, { ...member, id }]);
        setIsAddModalOpen(false);
    };

    // Edit member
    const handleEditMember = (updatedMember) => {
        setTeamMembers(teamMembers.map(m => (m.id === updatedMember.id ? updatedMember : m)));
        setIsEditModalOpen(false);
        setSelectedMember(null);
    };

    // Delete member
    const handleDeleteMember = (id) => {
        setTeamMembers(teamMembers.filter(m => m.id !== id));
        setIsDeleteModalOpen(false);
        setSelectedMember(null);
    };

    const openEditModal = (member) => {
        setSelectedMember(member);
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (member) => {
        setSelectedMember(member);
        setIsDeleteModalOpen(true);
    };

    return (
        <div className="pt-20 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl pr-2 font-bold text-gray-800">Team Members</h1>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-[rgb(191,23,23)] text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center transition"
                    >
                        Add Team Member
                    </button>
                </div>


                <TeamTable
                    teamMembers={teamMembers}
                    onEdit={openEditModal}
                    onDelete={openDeleteModal}
                />


                {isAddModalOpen && (
                    <AddTeamMember
                        onClose={() => setIsAddModalOpen(false)}
                        onSave={handleAddMember}
                    />
                )}


                {isEditModalOpen && selectedMember && (
                    <EditTeamMember
                        member={selectedMember}
                        onClose={() => {
                            setIsEditModalOpen(false);
                            setSelectedMember(null);
                        }}
                        onSave={handleEditMember}
                    />
                )}


                {isDeleteModalOpen && selectedMember && (
                    <DeleteTeamMember
                        member={selectedMember}
                        onClose={() => {
                            setIsDeleteModalOpen(false);
                            setSelectedMember(null);
                        }}
                        onConfirm={handleDeleteMember}
                    />
                )}
            </div>
        </div>
    );
};

export default Team;
