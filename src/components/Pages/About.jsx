import React, { useState, useEffect } from "react";
import { ContainerAbout } from "../page component/About/ContainerAbout";
import { GetToKnowUs } from "../page component/About/GetToKnowUs";
import { PrincipleMessage } from "../page component/About/PrincipleMessage";
import { Milestone } from "../page component/About/MileStone";
import { Programs } from "../page component/About/Programs";
import { Team } from "../page component/About/Team";

const localStorageKey = "school-cms-about-data";
const accentColor = "rgb(191,23,23)";

const initialData = {
  banner: { title: "", description: "", imageUrl: "" },
  vision: { title: "", description: "", imageUrl: "" },
  getToKnowUs: { subtitle: "", title: "", description: "", imageUrls: [] },
  principleMessage: {
    subtitle: "",
    title: "",
    introText: "",
    principalImageUrl: "",
    message: "",
    principalName: "",
    principalDesignation: "",
  },
  milestone: {
    sectionTitle: "",
    heading: "",
    description: "",
    milestones: [
      { title: "", number: "" },
      { title: "", number: "" },
      { title: "", number: "" },
      { title: "", number: "" },
    ],
  },
  programs: {
    programTitle: "",
    programSubtitle: "",
    description: "",
    programImageUrl: "",
  },
  team: [],
};

function About() {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem(localStorageKey);
    return savedData ? JSON.parse(savedData) : initialData;
  });

  const [activeSection, setActiveSection] = useState("dashboard");
  const [editingTeamMember, setEditingTeamMember] = useState(null);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  }, [data]);

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleUpdateSection = async (section, newData) => {
    if (newData.bannerImage instanceof File) {
      newData.imageUrl = await fileToBase64(newData.bannerImage);
      delete newData.bannerImage;
    }
    setData((prev) => ({ ...prev, [section]: newData }));
    setActiveSection("dashboard");
  };

  const handleAddTeamMember = async (memberData) => {
    let finalMember = { ...memberData, id: Date.now() };
    if (memberData.imageFile instanceof File) {
      finalMember.imageUrl = await fileToBase64(memberData.imageFile);
      delete finalMember.imageFile;
    }
    setData((prev) => ({ ...prev, team: [...prev.team, finalMember] }));
    setActiveSection("dashboard");
  };

  const handleEditTeamMember = async (memberData) => {
    let updatedMember = { ...memberData, id: editingTeamMember.id };
    if (memberData.imageFile instanceof File) {
      updatedMember.imageUrl = await fileToBase64(memberData.imageFile);
      delete updatedMember.imageFile;
    }
    setData((prev) => ({
      ...prev,
      team: prev.team.map((member) =>
        member.id === editingTeamMember.id ? updatedMember : member
      ),
    }));
    setEditingTeamMember(null);
    setActiveSection("dashboard");
  };

  const handleDeleteTeamMember = (id) => {
    setData((prev) => ({
      ...prev,
      team: prev.team.filter((member) => member.id !== id),
    }));
  };

  const handleEditSection = (section) => setActiveSection(`edit-${section}`);

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <AboutDashboard
            data={data}
            onEditSection={handleEditSection}
            onEditTeamMember={(member) => {
              setEditingTeamMember(member);
              setActiveSection("edit-team");
            }}
            onDeleteTeamMember={handleDeleteTeamMember}
          />
        );
      case "edit-banner":
        return (
          <ContainerAbout
            sectionName="Banner Section"
            initialData={data.banner}
            onSubmit={(values) => handleUpdateSection("banner", values)}
            onCancel={() => setActiveSection("dashboard")}
          />
        );
      case "edit-vision":
        return (
          <ContainerAbout
            sectionName="Vision Section"
            initialData={data.vision}
            onSubmit={(values) => handleUpdateSection("vision", values)}
            onCancel={() => setActiveSection("dashboard")}
          />
        );
      case "edit-getToKnowUs":
        return (
          <GetToKnowUs
            initialData={data.getToKnowUs}
            onSubmit={(values) => handleUpdateSection("getToKnowUs", values)}
            onCancel={() => setActiveSection("dashboard")}
          />
        );
      case "edit-principleMessage":
        return (
          <PrincipleMessage
            initialData={data.principleMessage}
            onSubmit={(values) =>
              handleUpdateSection("principleMessage", values)
            }
            onCancel={() => setActiveSection("dashboard")}
          />
        );
      case "edit-milestone":
        return (
          <Milestone
            initialData={data.milestone}
            onSubmit={(values) => handleUpdateSection("milestone", values)}
            onCancel={() => setActiveSection("dashboard")}
          />
        );
      case "edit-programs":
        return (
          <Programs
            initialData={data.programs}
            onSubmit={(values) => handleUpdateSection("programs", values)}
            onCancel={() => setActiveSection("dashboard")}
          />
        );
      case "edit-team":
        return (
          <Team
            initialData={editingTeamMember}
            onSubmit={
              editingTeamMember ? handleEditTeamMember : handleAddTeamMember
            }
            onCancel={() => setActiveSection("dashboard")}
          />
        );
      default:
        return (
          <AboutDashboard
            data={data}
            onEditSection={handleEditSection}
            onEditTeamMember={(member) => {
              setEditingTeamMember(member);
              setActiveSection("edit-team");
            }}
            onDeleteTeamMember={handleDeleteTeamMember}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {activeSection === "dashboard" && (
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-2xl font-bold text-gray-900">
                About Page CMS
              </h1>
              <button
                onClick={() => setActiveSection("edit-team")}
                className="px-4 py-2 rounded-md text-white font-medium shadow-md"
                style={{ backgroundColor: accentColor }}
              >
                Add Team Member
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto pt-24 px-4 sm:px-6 lg:px-8">
        {renderSection()}
      </div>
    </div>
  );
}

const AboutDashboard = ({
  data,
  onEditSection,
  onEditTeamMember,
  onDeleteTeamMember,
}) => {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="border-4 border-dashed border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">About Page Content</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Banner Section",
              section: "banner",
              content: data.banner,
              imageKey: "imageUrl",
            },
            {
              title: "Vision Section",
              section: "vision",
              content: data.vision,
              imageKey: "imageUrl",
            },
            {
              title: "Get to Know Us",
              section: "getToKnowUs",
              content: data.getToKnowUs,
              imageKey: "imageUrls",
            },
            {
              title: "Principal's Message",
              section: "principleMessage",
              content: data.principleMessage,
              imageKey: "principalImageUrl",
            },
            {
              title: "Milestones",
              section: "milestone",
              content: data.milestone,
            },
            {
              title: "Programs",
              section: "programs",
              content: data.programs,
              imageKey: "programImageUrl",
            },
          ].map((item, idx) => (
            <DashboardCard
              key={idx}
              title={item.title}
              onEdit={() => onEditSection(item.section)}
              hasData={
                item.content.title ||
                item.content.sectionTitle ||
                item.content.principalName
              }
            >
              {item.content[item.imageKey] && (
                <img
                  src={
                    Array.isArray(item.content[item.imageKey])
                      ? item.content[item.imageKey][0]
                      : item.content[item.imageKey]
                  }
                  alt={item.title}
                  className="h-40 w-full object-cover rounded-md mb-2"
                />
              )}
              <h3 className="font-medium">
                {item.content.title ||
                  item.content.sectionTitle ||
                  item.content.principalName}
              </h3>
              <p className="text-sm text-gray-500 truncate">
                {item.content.description || item.content.message}
              </p>
            </DashboardCard>
          ))}
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Team Members</h3>
          </div>
          {data.team.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No team members added yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.team.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-lg shadow-sm border p-4"
                >
                  {member.imageUrl && (
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="h-32 w-32 object-cover rounded-full mx-auto mb-3"
                    />
                  )}
                  <h4 className="font-medium text-center">{member.name}</h4>
                  <p className="text-sm text-gray-600 text-center">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {member.description}
                  </p>
                  <div className="mt-3 flex justify-center space-x-2">
                    <button
                      onClick={() => onEditTeamMember(member)}
                      className="text-[rgb(191,23,23)] hover:text-red-800 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteTeamMember(member.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, children, onEdit, hasData }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium">{title}</h3>
        <button
          onClick={onEdit}
          className="text-[rgb(191,23,23)] hover:text-red-700 text-sm"
        >
          {hasData ? "Edit" : "Add Content"}
        </button>
      </div>
      {hasData ? (
        children
      ) : (
        <div className="text-gray-400 text-sm italic">No content added yet</div>
      )}
    </div>
  );
};

export default About;
