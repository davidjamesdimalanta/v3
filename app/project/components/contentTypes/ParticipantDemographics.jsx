export default function ParticipantDemographics() {
  const interviewParticipants = [
    { label: "IBS (Irritable Bowel Syndrome)", count: 4 },
    { label: "Wheelchair user", count: 2 },
    { label: "Dependant in stroller", count: 2 },
    { label: "Sensitive stomach (urgent needs)", count: 1 },
    { label: "Adult dependant in wheelchair", count: 1 },
    { label: "UTI-related needs", count: 1 },
  ];

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Interviews Section */}
      <div className="flex flex-col gap-2">
        <h3 className="text-h6 text-400">Interview Participants</h3>
        <p className="text-p opacity-60">
          10 participants, ages 23–51 years
        </p>
      </div>

      {/* Participant Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-small">
        {interviewParticipants.map((participant, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="bd px-3 py-1 rounded-full text-button text-400">
              {participant.count}
            </span>
            <span className="text-small opacity-60 flex-1">
              {participant.label}
            </span>
          </div>
        ))}
      </div>

      {/* Survey Section */}
      <div className="flex flex-col gap-2 pt-3">
        <h3 className="text-h6 text-400">Survey Respondents</h3>
        <p className="text-p opacity-60">
          56 respondents, ages 18–54 years
        </p>
      </div>
    </div>
  );
}
