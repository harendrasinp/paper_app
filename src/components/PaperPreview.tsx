const PaperPreview = ({ paperInfo, sections }) => {

  const formatClassName = (value) => {
    if (!value) return "";

    const match = value.match(/^(\d+)(st|nd|rd|th)?\s*(.*)$/i);
    if (!match) return value;

    const number = match[1];
    const suffix = match[2] || "th";
    const rest = match[3];

    return (
      <>
        {number}
        <sup className="text-[8px] align-super">{suffix}</sup> {rest}
      </>
    );
  };

  return (
    <div className="w-full px-2">

      {/* MAIN CONTAINER (IMPORTANT) */}
      <div className="w-full max-w-[800px] mx-auto">

        <div
          className="print-area bg-paper border border-paper-border rounded-lg p-2 shadow-sm min-h-[600px]"
          style={{ fontFamily: "Cambria, Georgia, serif" }}
        >

          {/* Header */}
          <div className="flex justify-between items-end text-center border-b-2 border-foreground mb-2 gap-2">

            {/* LEFT */}
            <div className="flex flex-col text-[10px] sm:text-[12px]">
              <div className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px]">
                <img src="/logos/logo1.png" alt="Logo" className="w-full h-full object-contain" />
              </div>

              <div className="text-left">
                {paperInfo.date && <p><span className="font-semibold">Date:</span> {paperInfo.date}</p>}
                {paperInfo.time && <p><span className="font-semibold">Time:</span> {paperInfo.time}</p>}
              </div>
            </div>

            {/* CENTER */}
            <div>
              <div className="text-[14px] sm:text-[26px] font-bold">TAPI EDUCATION ACADAMY</div>
              <div className="text-[13px] sm:text-[25px] font-bold">P.P.SAVANI VIDHYAMANDIR</div>

              {paperInfo.examName && (
                <p className="text-[11px] sm:text-[20px] font-semibold">
                  {paperInfo.examName}
                </p>
              )}

              {paperInfo.subject && (
                <p className="text-[10px] sm:text-[18px]">
                  <span className="font-semibold">SUBJECT:</span> {paperInfo.subject}
                </p>
              )}
            </div>

            {/* RIGHT */}
            <div className="text-right text-[10px] sm:text-[12px] flex flex-col items-end">
              <div className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px]">
                <img src="/logos/logo2.png" alt="Logo" className="w-full h-full object-contain" />
              </div>

              <div className="flex flex-col items-start">
                {paperInfo.className && (
                  <p>
                    <span className="font-semibold">Class:</span>{" "}
                    {formatClassName(paperInfo.className)}
                  </p>
                )}

                {paperInfo.totalMarks && (
                  <p>
                    <span className="font-semibold">Total Marks:</span> {paperInfo.totalMarks}
                  </p>
                )}
              </div>
            </div>

          </div>

          {/* Questions */}
          <div className="space-y-4 sm:space-y-5">
            {sections.map((section, sIdx) => (
              <div key={section.id}>

                {/* Section Heading */}
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-[11px] sm:text-[12px]">
                    {section.heading || `Q${sIdx + 1}.`}
                    {section.attemptNote && (
                      <span className="ml-2 font-normal text-[10px] sm:text-sm text-foreground/60">
                        ({section.attemptNote})
                      </span>
                    )}
                  </h3>

                  {section.marks && (
                    <span className="text-[10px] sm:text-sm font-semibold text-foreground/70">
                      [{section.marks}]
                    </span>
                  )}
                </div>

                {/* Questions */}
                <div className="space-y-2 sm:space-y-3 pl-3 sm:pl-4">
                  {section.questions.map((q, qIdx) => (
                    <div key={q.id}>

                      {q.text && (
                        <p className="text-[11px] sm:text-sm text-foreground/90">
                          <span className="font-semibold">{qIdx + 1}.</span> {q.text}
                        </p>
                      )}

                      {q.options.length > 0 && q.options.some((o) => o) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pl-3 sm:pl-5 mt-1">
                          {q.options.map((opt, oIdx) => (
                            opt && (
                              <p key={oIdx} className="text-[11px] sm:text-sm text-foreground/80">
                                {String.fromCharCode(65 + oIdx)}. {opt}
                              </p>
                            )
                          ))}
                        </div>
                      )}

                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>

          {sections.length === 0 && (
            <div className="flex items-center justify-center h-40 text-muted-foreground text-sm italic">
              Add sections and questions to see the preview
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default PaperPreview;