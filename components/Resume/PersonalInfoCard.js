import React from "react";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const PersonalInfoCard = ({ student }) => {
  if (!student) return null;
  const resume = student?.resume;

  const handlePrint = () => {
    const resumeContent = document.getElementById("resume-content").innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = resumeContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // To re-render app after print
  };

  return (
    <div className="bg-white rounded-lg p-6 max-w-4xl mx-auto">
      {/* Personal Information */}
      <section className="mb-4">
        <h2 className="text-5xl font-bold text-gray-800 text-center pb-2">
          {student.firstname + " " + student.lastname || "Not specified"}
        </h2>
        <div className="flex justify-center gap-2">
          <p className="font-medium">
            +91 {student.contact || "Not specified"}
          </p>{" "}
          |<p className="font-medium">{student.email || "Not specified"}</p> |
          <p className="font-medium">{student.city || "Not specified"}</p>
        </div>
      </section>

      {/* Education */}
      {resume.educations && resume.educations.length > 0 && (
        <section className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
            Education
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-1 px-4 text-left font-semibold text-gray-700">
                    Degree
                  </th>
                  <th className="py-1 px-4 text-left font-semibold text-gray-700">
                    Stream
                  </th>
                  <th className="py-1 px-4 text-left font-semibold text-gray-700">
                    Institution
                  </th>
                  <th className="py-1 px-4 text-left font-semibold text-gray-700">
                    Duration
                  </th>
                  <th className="py-1 px-4 text-left font-semibold text-gray-700">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {resume.educations.map((edu, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4">
                      <div className="font-medium text-gray-800">
                        {edu.degree || "Not specified"}
                      </div>
                    </td>
                    <td className="py-2 px-4">
                      {edu.stream && (
                        <div className="text-sm text-gray-600">
                          {edu.stream}
                        </div>
                      )}
                    </td>
                    <td className="py-2 px-4">
                      <div className="font-medium text-gray-800 flex">
                        {edu.institute + ", " + edu.location || "Not specified"}
                      </div>
                    </td>
                    <td className="py-2 px-4">
                      <div className="text-gray-700">
                        {months[edu.startMonth] || ""} {edu.startYear || ""} -{" "}
                        {edu.endYear
                          ? `${months[edu.endMonth] || ""} ${edu.endYear}`
                          : "Present"}
                      </div>
                    </td>
                    <td className="py-2 px-4">
                      {edu.score ? (
                        <>
                          <div className="text-gray-700">
                            {edu.score} {edu.scoreType == "CGPA" ? "cgpa" : "%"}
                          </div>
                        </>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Experience */}
      {resume.experiences && resume.experiences.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
            Work Experience
          </h2>
          {resume.experiences.map((exp, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">
                {exp.position || "Position not specified"}
              </h3>
              <p className="text-gray-600">
                {exp.company || "Company not specified"}
              </p>
              <p className="text-gray-500 text-sm">
                {exp.startDate} - {exp.endDate || "Present"} |{" "}
                {exp.location || ""}
              </p>
              {exp.description && (
                <ul className="mt-2 list-disc pl-5">
                  {exp.descriptions?.split("\n").map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {resume.skills && resume.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {resume.projects && resume.projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
            Projects
          </h2>
          {resume.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">
                {project.name || "Project name not specified"}
              </h3>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  {project.url}
                </a>
              )}
              {project.description && (
                <ul className="mt-2 list-disc pl-5">
                  {project.description.split("\n").map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {resume.certifications && resume.certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
            Certifications
          </h2>
          {resume.certifications.map((cert, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">
                {cert.name || "Certification name not specified"}
              </h3>
              <p className="text-gray-600">{cert.issuingOrganization || ""}</p>
              <p className="text-gray-500 text-sm">
                {cert.issueDate}{" "}
                {cert.expirationDate && `- ${cert.expirationDate}`}
              </p>
              {cert.credentialId && (
                <p className="text-gray-500 text-sm">
                  Credential ID: {cert.credentialId}
                </p>
              )}
              {cert.url && (
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Credential
                </a>
              )}
            </div>
          ))}
        </section>
      )}

      <button
        onClick={handlePrint}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md print:hidden"
      >
        Print Resume
      </button>
    </div>
  );
};

export default PersonalInfoCard;
